<template>
  <div class="container py-4" style="position: relative;">
    <div class="row" style="margin-top: 60px;">
      <div class="col-12 col-md-3 card shadow-sm sidenav p-0 d-none d-md-block" style="max-height: 341px; min-height: 341px;">
        <div style="width:120px;height:120px;;border-radius:50%;position:relative;" class="mx-auto mt-4 d-block">
          <img @click="openChangePicModal" id="prof-pic" :src="`${endpoints.viewStudentProfilePic}/${get(studentInfo, 'profile_pic.filename')}`" />
          <div id="prof-pic-icon">
            <b-icon icon="camera" style="width:40px;height:40px;" rounded></b-icon>
          </div>
          
        </div>
        <div class="text-center mt-4">
          <div class="p-3 student-info" @click="routeTo('student-info')" :class="{'active-tab': activeTab === 'student-info'}">Student Info</div>
          <div class="p-3 request-form" @click="routeTo('clearance-form')" :class="{'active-tab':activeTab === 'clearance-form'}">Clearance Form</div>
          <div class="p-3 print" @click="printModal = true">Print</div>
        </div>
      </div>
      <div class="col-12 col-md-9">
        <router-view></router-view>
      </div>

      <!-- modal -->
      <b-modal title="Print" hide-footer hide-header-close no-close-on-backdrop :visible="printModal">
        <form class="my-2 mx-4">
          <div class="form-group">
            <div v-if="clearance.length > 0">Available Clearance</div>
            <div v-else>No clearance available.</div>
            <ul class="pl-3 mt-2" v-for="(clearance,index) in get(clearance, 'data')" :key="index">
              <li>
                <a href="#" @click="openPDF(clearance)">{{ get(clearance, 'semester') }} Semester - School Year {{ get(clearance, 'academic_year') }}</a>
                - <b-icon icon="download" class="download-icon" @click="downloadPDF(clearance)"></b-icon>
              </li>
            </ul>
          </div>
        </form>
        <div class="d-flex justify-content-end mt-4">
          <b-button variant="warning" class="mr-2" @click.prevent="cancel">Close</b-button>
        </div>
      </b-modal>

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
    </div>
  </div>
</template>

<script>
import {toast} from '../../mixins/toast'
import {io} from 'socket.io-client'
import {get} from 'lodash'
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import endpoints from '../../endpoints'

export default {
    name:'studentBase',
    mixins: [toast],
    data:()=>({
      endpoints,
      get,
      activeTab: '',
      printModal: false,
      doc: '',
      count: 0,
      download: false,
      changePicModal: false,
      profilePicture: '',
      profilePictureUpload: '',
    }),
    computed:{
      userInfo(){
        return this.$store.getters['auth/getUserInfo']
      },
      studentInfo(){
        return this.$store.getters['studentInfo/getStudentInfo']
      },
      clearance(){
        return this.$store.getters['studentBase/getClearance']
      }
    },
    mounted(){
      this.activeTab = this.$route.path.substring(17)

      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if(get(userInfo, 'role') === 'student'){
          const socket = io("http://localhost:5000");
          // console.log(get(userInfo, 'email'))
          this.$store.dispatch('studentInfo/getStudentInfo', {id: get(userInfo, 'id')}).then(res=>{
            // console.log(res)
              if(res.response){
                  socket.on(get(userInfo, 'email'), (message) => {
                      console.log(message);
                      this.$store.dispatch('studentClearanceForm/getClearanceForms',{student: get(res, 'data._id')})
                  });
              }
          })
      }

      // initialized jspdf plugin
      this.centerTextAPI(jsPDF.API)

      // get student info
      this.getStudentInfo()

      // watch for call from other component
      this.$root.$on('openPrintModal',()=>{
        this.printModal = true
      })
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
      cancel(){
        this.printModal = false
        this.openPDF()
        console.log('cancel')
      },
      close(){
        this.changePicModal = false
      },
      changePic(){
        const formData = new FormData()
        formData.append('profilepicture',this.profilePictureUpload)
        if(this.profilePictureUpload){
          this.$store.dispatch('studentBase/changeProfilePicture', {
            formData
          }).then(res=>{
            if(res.response){
              this.changePicModal = false
              this.getStudentInfo()
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
        this.profilePicture = `${this.endpoints.viewStudentProfilePic}/${get(this.studentInfo, 'profile_pic.filename')}`
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
      downloadPDF(clearance){
        this.download = true
        this.openPDF(clearance)
      },
      getStudentInfo(){
        this.userId = this.userInfo.id
        this.$store.dispatch('studentInfo/getStudentInfo', {id: this.userId}).then(()=>{
          this.profilePicture = `${this.endpoints.viewStudentProfilePic}/${get(this.studentInfo, 'profile_pic.filename')}`
          this.getCompletedClearance()
        })
      },
      getCompletedClearance(){
        this.$store.dispatch('studentBase/getCompletedClearance',{
          student: get(this.studentInfo, '_id')
        })
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
              title: `${get(clearance, 'student_info[0].last_name')}, ${get(clearance, 'student_info[0].first_name')}-${get(clearance, 'semester')}-semester-${get(clearance, 'academic_year')}`,
              subject: 'Clearance Form',
              author: 'Pateros Technological College',
              keywords: 'generated, javascript, web 2.0, ajax',
              creator: 'Pateros Technological College'
          });
          let dept_approved = []
          let content = []
          let font = 'Helvetica'
          let ptcInfoY = 18
          let studentInfoY = 45
          let studentName = `${get(clearance, 'student_info[0].first_name')} ${get(clearance, 'student_info[0].last_name')}`
          let studentCourse = get(clearance,'course')
          let clearanceSemester = get(clearance,'semester')
          let studentYearSection = `${get(clearance,'year_level').substring(0,1)}${get(clearance,'section')}`
          let studentAcademicYear = get(clearance,'academic_year')

          // let departmentSigned = clearance.departments.filter(department => {
          //   return clearance.departments_approved.find(item=>{
          //     if(item.dept_id === department._id){
          //       dept_approved.push(item)
          //     }
          //     return item.dept_id === department._id
          //   })
          // });

          // departmentSigned.forEach(department => {
          //   content.push([department.in_charge,department.department_name])
          // });

          //
          let departmentSigned = clearance.departments.filter(department => {
            return clearance.departments_approved.find(item=>{
              if(item.dept_id === department._id){
                dept_approved.push(item)
              }
              return item.dept_id === department._id
            })
          });

          departmentSigned.forEach(department => {
            content.push([department.in_charge,department.department_name])
          });

          clearance.departments.forEach(department => {
            let alreadyExists = false
            departmentSigned.find(dept=>{
              if(dept._id === department._id){
                alreadyExists = true
              }
              return dept._id === department._id
            })
            if(!alreadyExists){
              if(!department.department_name.includes('Head')){
                content.push([department.in_charge,department.department_name])
              }else{
                if(department.department_name.includes(clearance.student_info[0].course)){
                  content.push([department.in_charge,department.department_name])
                }
              }
            }
          });

          this.doc.addImage(get(this.clearance,'qr'), 172, 34, 28, 28);

          this.doc.setFontSize(14)
          this.doc.setFont(font,'bold')
          this.doc.myText("PATEROS TECHNOLOGICAL COLLEGE",{align: "center"},14,ptcInfoY);
          this.doc.setFontSize(11)
          this.doc.myText("COLLEGE ST. STO. ROSARIO-KANLURAN, PATEROS M.M",{align: "center"},14,ptcInfoY+6);
          this.doc.setFontSize(16)
          this.doc.myText("STUDENT CLEARANCE",{align: "center"},14,ptcInfoY+14);

          this.doc.setFontSize(12)
          this.doc.setFont(font,'bold')
          this.doc.text("Name: ", 14, studentInfoY);
          this.doc.setFontSize(12)
          this.doc.setFont(font,'normal')
          this.doc.text(studentName, 42, studentInfoY);

          this.doc.setFontSize(12)
          this.doc.setFont(font,'bold')
          this.doc.text("Course: ", 14, studentInfoY+7);
          this.doc.setFontSize(12)
          this.doc.setFont(font,'normal')
          this.doc.text(studentCourse, 42, studentInfoY+7);

          this.doc.setFontSize(12)
          this.doc.setFont(font,'bold')
          this.doc.text("Year/Section: ", 72, studentInfoY+7);
          this.doc.setFontSize(12)
          this.doc.setFont(font,'normal')
          this.doc.text(studentYearSection, 113, studentInfoY+7);

          this.doc.setFontSize(12)
          this.doc.setFont(font,'bold')
          this.doc.text("Semester: ", 14, studentInfoY+14);
          this.doc.setFontSize(12)
          this.doc.setFont(font,'normal')
          this.doc.text(clearanceSemester, 42, studentInfoY+14);

          this.doc.setFontSize(12)
          this.doc.setFont(font,'bold')
          this.doc.text("Academic Year: ", 72, studentInfoY+14);
          this.doc.setFontSize(12)
          this.doc.setFont(font,'normal')
          this.doc.text(studentAcademicYear, 113, studentInfoY+14);
          
          this.doc.autoTable({
            theme: 'grid',
            startY: 65,
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
              0: { valign: 'middle', fillColor: [255, 255, 255], minCellHeight: 18, cellWidth: 53 },
              1: { valign: 'middle', fillColor: [255, 255, 255], minCellHeight: 18, cellWidth: 81 },
              2: { valign: 'middle', fillColor: [255, 255, 255], minCellHeight: 18, cellWidth: 50 },
            },
            didDrawCell: (data) => {
              if (data.section === 'body' && data.column.index === 2) {
                if(dept_approved[this.count]){
                  let base64Img = dept_approved[this.count].signature.img
                  let imgType = dept_approved[this.count].signature.type
                  this.count++
                  this.doc.addImage(base64Img, imgType, data.cell.x + 5, data.cell.y + 2, 38, 15)
                }
              }
            },
            head: [
              [
                {content:'In Charge', styles:{lineWidth:0.2,fontStyle: 'bold'}},
                {content:'Department Name', styles:{lineWidth:0.2,fontStyle: 'bold'}},
                {content:'Signature', styles:{lineWidth:0.2,fontStyle: 'bold'}}
              ]
            ],
            body: content,
          })

          // this.doc.output('a4.pdf')
          if(this.download){
            this.doc.output('save', `${get(clearance, 'student_info[0].last_name')},${get(clearance, 'student_info[0].first_name')}-${get(clearance, 'semester')}-semester-${get(clearance, 'academic_year')}`);
          }else{
            this.doc.autoPrint({variant: 'non-conform'});
            this.doc.output('dataurlnewwindow');
          }

          this.download = false
          this.count = 0
        }
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
.download-icon:hover{
  color: #007bff;
  text-decoration: underline;
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