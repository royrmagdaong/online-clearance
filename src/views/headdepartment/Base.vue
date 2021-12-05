<template>
  <div class="container py-4" style="position: relative;">
    <div class="row" style="margin-top: 60px;">
      <div class="col-12 col-md-3 card shadow-sm sidenav p-0 d-none d-md-block" style="max-height: 455px; min-height: 455px;">
        <div style="width:120px;height:120px;;border-radius:50%;position:relative;" class="mx-auto mt-4 d-block">
          <img @click="openChangePicModal" id="prof-pic" :src="`${endpoints.viewDeptProfilePic}/${get(department, 'profile_pic.filename')}`" />
          <div id="prof-pic-icon">
            <b-icon icon="camera" style="width:40px;height:40px;" rounded></b-icon>
          </div>
        </div>
        <div class="text-center mt-4">
          <div class="p-3 student-info" @click="routeTo('dashboard')" :class="{'active-tab': activeTab === 'dashboard'}">Dashboard</div>
          <div class="p-3 faculty" @click="routeTo('student-request')" :class="{'active-tab': activeTab === 'student-request'}">Student Request</div>
          <div class="p-3 request-form" @click="routeTo('approved')" :class="{'active-tab':activeTab === 'approved'}">Approved</div>
          <div class="p-3 request-form" @click="routeTo('requirements')" :class="{'active-tab':activeTab === 'requirements'}">Requirements</div>
          <div class="p-3 print" @click="printModal = true">Print</div>
        </div>
      </div>
      <div class="col-12 col-md-9">
        <router-view></router-view>
      </div>
    </div>

    <!-- change pic modal -->
    <b-modal title="Change Profile Picture" hide-footer hide-header-close no-close-on-backdrop :visible="changePicModal">
      <div style="width:180px;height:180px;overflow:hidden;border-radius:50%;" class="mx-auto d-block my-4">
        <img @click="changePicModal = true" id="prof-pic-change" :src="profilePicture" alt="change picture" />
      </div>
      <form @submit.prevent="" enctype="multipart/form-data">
        <input type="file" name="profilepicture"  class="mt-3 mx-auto" accept="image/png, image/jpeg" @change="onChange"/>
        <div style="font-size:12px;">*png, and jpg only</div>
      </form>
      <div class="d-flex justify-content-end mt-4">
        <b-button variant="warning" class="mr-2" @click.prevent="close">Close</b-button>
        <b-button variant="success" class="mr-2" @click.prevent="changePic">Save</b-button>
      </div>
    </b-modal>

    <!-- print modal -->
    <b-modal title="Print" hide-footer hide-header-close no-close-on-backdrop :visible="printModal">
      <form class="my-2 mx-4">
        <div class="form-group mb-2 row no-gutters">
          <div class="col-6 pr-1">
            <label>Semester</label>
            <b-form-select v-model="selectedSemester" :options="semesterOpt"></b-form-select>
          </div>
          <div class="col-6 pl-1">
            <label>Academic Year</label>
            <b-form-select v-model="selectedAcadYear" :options="academicyearOpt"></b-form-select>
          </div>
        </div>
        <div class="d-flex justify-content-end mt-4">
          <b-button variant="warning" class="mr-2" @click.prevent="printModal = false">Cancel</b-button>
          <b-button type="submit" variant="success" @click.prevent="print">Print</b-button>
        </div>
      </form>
    </b-modal>

  </div>
</template>

<script>
import {get} from 'lodash'
import endpoints from '../../endpoints'
import {toast} from '../../mixins/toast'
import { jsPDF } from "jspdf";
import 'jspdf-autotable'

export default {
    mixins: [toast],
    data:()=>({
        get,
        endpoints,
        activeTab: '',
        changePicModal: false,
        profilePictureUpload: '',
        profilePicture: '',
        selectedSemester: '',
        selectedAcadYear: '',
        semesterOpt: ['1st','2nd'],
        academicyearOpt: [],
        printModal: false,
        doc: ''
    }),
    computed:{
      department(){
        return this.$store.getters['departmentDashboard/getDepartment']
      },
      approvedStudents(){
        return this.$store.getters['departmentBase/getApprovedStudents']
      },
      academic_year(){
        return this.$store.getters['core/getAcadYear']
      }
    },
    mounted(){
      this.activeTab = this.$route.path.substring(17)
      this.getDepartment()
      this.getAcadYear()

      // initialized jspdf plugin
      this.centerTextAPI(jsPDF.API)

      // watch for call from other component
      this.$root.$on('openChangePicModal',()=>{
        this.openChangePicModal()
      })
    },
    methods:{
      routeTo(route){
        if(!this.$route.path.includes(route)){
            this.$router.push(route)
            this.activeTab = route
        }
      },
      getAcadYear(){
        this.$store.dispatch('core/getAvailableAcademicYear').then(res=>{
          if(res.response){
            this.academicyearOpt = this.academic_year
          }
        })
      },
      getDepartment(){
        this.$store.dispatch('departmentDashboard/getDepartment')
      },
      getApprovedStudents(){
        this.$store.dispatch('departmentBase/getApprovedStudentsByDeptForPrint',{
          semester: this.selectedSemester,
          academic_year: this.selectedAcadYear
        }).then(res=>{
          if(res.response){
            console.log(res.data)
            this.openPDF(res.data)
          }
        })
      },
      close(){
        this.changePicModal = false
      },
      changePic(){
        const formData = new FormData()
        formData.append('profilepicture',this.profilePictureUpload)
        if(this.profilePictureUpload){
          this.$store.dispatch('departmentBase/changeProfilePictureDept', {
            formData
          }).then(res=>{
            if(res.response){
              this.changePicModal = false
              this.getDepartment()
              this.makeToast(this, false, 'Saved', res.message, 4000, 'success')
            }else{
              this.makeToast(this, false, 'Save failed', res.message, 4000, 'warning')
            }
          }).catch(error=>{
            this.makeToast(this, false, 'Save failed', error.message, 4000, 'danger')
          })
        }else{
          this.makeToast(this, false, 'Save Failed', 'Please Choose an image', 4000, 'warning')
        }
      },
      openChangePicModal(){
        this.profilePicture = `${this.endpoints.viewStudentProfilePic}/${get(this.department, 'profile_pic.filename')}`
        this.changePicModal = true
      },
      onChange(event) {
        this.profilePictureUpload = event.target.files[0]
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          reader.onload =  (e) => {
            this.profilePicture = e.target.result
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      },
      centerTextAPI(API){
        API.myText = function(txt, options, x, y) {
            options = options ||{};
            /* Use the options align property to specify desired text alignment
            * Param x will be ignored if desired text alignment is 'center'.
            * Usage of options can easily extend the function to apply different text 
            * styles and sizes 
            */
            if( options.align == "center" ){
                // Get current font size
                var fontSize = this.internal.getFontSize();

                // Get page width
                var pageWidth = this.internal.pageSize.width;

                // Get the actual text's width
                /* You multiply the unit width of your string by your font size and divide
                * by the internal scale factor. The division is necessary
                * for the case where you use units other than 'pt' in the constructor
                * of jsPDF.
                */
                var txtWidth = this.getStringUnitWidth(txt)*fontSize/this.internal.scaleFactor;

                // Calculate text's x coordinate
                x = ( pageWidth - txtWidth ) / 2;
            }

            // Draw text at x,y
            this.text(txt,x,y);
        }
      },
      openPDF(clearance){
        if(clearance){
          this.doc = new jsPDF()
          this.doc.setProperties({
              title: `${get(this.department, 'in_charge')}-${this.selectedSemester}-semester-${this.selectedAcadYear}`,
              subject: 'Approved Students',
              author: 'Pateros Technological College',
              keywords: 'generated, javascript, web 2.0, ajax',
              creator: 'Pateros Technological College'
          });

          let content = []
          let font = 'Helvetica'
          let ptcInfoY = 18
          let studentInfoY = 45
          let departmentName = get(this.department, 'department_name')
          let clearanceSemester = this.selectedSemester
          let academicYear = this.selectedAcadYear

          this.doc.setFontSize(14)
          this.doc.setFont(font,'bold')
          this.doc.myText("PATEROS TECHNOLOGICAL COLLEGE",{align: "center"},14,ptcInfoY);
          this.doc.setFontSize(11)
          this.doc.myText("COLLEGE ST. STO. ROSARIO-KANLURAN, PATEROS M.M",{align: "center"},14,ptcInfoY+6);
          this.doc.setFontSize(16)
          this.doc.myText("APPROVED STUDENTS",{align: "center"},14,ptcInfoY+14);

          this.doc.setFontSize(12)
          this.doc.setFont(font,'bold')
          this.doc.text("Department: ", 14, studentInfoY);
          this.doc.setFontSize(12)
          this.doc.setFont(font,'normal')
          this.doc.text(departmentName, 42, studentInfoY);

          this.doc.setFontSize(12)
          this.doc.setFont(font,'bold')
          this.doc.text("Semester: ", 14, studentInfoY+7);
          this.doc.setFontSize(12)
          this.doc.setFont(font,'normal')
          this.doc.text(clearanceSemester, 42, studentInfoY+7);

          this.doc.setFontSize(12)
          this.doc.setFont(font,'bold')
          this.doc.text("Academic Year: ", 72, studentInfoY+7);
          this.doc.setFontSize(12)
          this.doc.setFont(font,'normal')
          this.doc.text(academicYear, 113, studentInfoY+7);
          
          for(let i=0;i<clearance.length;i++){
            content.push([
              `${get(clearance[i],'student.first_name')} ${get(clearance[0],'student.last_name')}`,
              get(clearance[i],'course'),
              get(clearance[i],'section'),
              get(clearance[i],'year_level')
            ])
          }
          
          this.doc.autoTable({
            theme: 'grid',
            startY: 58,
            margins: {bottom: 30},
            bodyStyles: {
              cellPadding: 4,
              fontSize: 11,
            },
            headStyles:{
              textColor: [0,0,0],
              fontSize: 12,
              fontStyle: 'normal',
              cellPadding: 4,
              fillColor: [255, 255, 255],
              minCellHeight: 14,
              valign: 'middle',
            },
            columnStyles: { 
              0: { valign: 'middle', fillColor: [255, 255, 255] },
              1: { valign: 'middle', fillColor: [255, 255, 255] },
              2: { valign: 'middle', fillColor: [255, 255, 255] },
            },
            head: [
              [
                {content:'Student', styles:{lineWidth:0.2,fontStyle: 'bold'}},
                {content:'Course', styles:{lineWidth:0.2,fontStyle: 'bold'}},
                {content:'Section', styles:{lineWidth:0.2,fontStyle: 'bold'}},
                {content:'Year Level', styles:{lineWidth:0.2,fontStyle: 'bold'}},
              ]
            ],
            body: content,
          })

          this.doc.autoPrint({variant: 'non-conform'});
          this.doc.output('dataurlnewwindow');
        }
      },
      print(){
        this.getApprovedStudents()
      }
    }
}
</script>

<style scoped>
.sidenav{
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 84px;
}
.faculty {
  border-top: 1px solid rgb(224, 224, 224);
  border-bottom: 1px solid rgb(224, 224, 224);
}
.student-info {
  border-top: 1px solid rgb(224, 224, 224);
}
.print, .request-form {
  border-bottom: 1px solid rgb(224, 224, 224);
}
.faculty:hover, .student-info:hover, .print:hover, .request-form:hover{
  background-color: rgb(86, 182, 107);
  color: white;
  cursor: pointer;
}
.active-tab{
  background-color: rgb(86, 182, 107);
  color: white;
  cursor: pointer;
}
#prof-pic-icon{
  position: absolute;
  height: 40px;
  width: 100%;
  top: 42px;
  color: #007bff;
  z-index: -2;
  display: flex;
  align-items: center;
  justify-content: center;
}
#prof-pic{
  background-color: #eee !important;
  height: 120px;
  width: 120px;
  border-radius: 60px;
}
#prof-pic:hover{
  opacity: 0.4;
  cursor: pointer;
}
#prof-pic-change{
  width:180px;
  height:180px;
  border-radius: 90px;
}
</style>