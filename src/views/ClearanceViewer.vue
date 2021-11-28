<template>
  <div class="container">
    <div class="row">
      <div class="col-12" style="margin-top:120px;"></div>
      <div class="col-12 text-center">
        <a style="font-size: 20px;" href="" @click.prevent="openPDF(get(clearance, 'data[0]'))">Click here if the pdf is not open automatically.</a>
      </div>
    </div>
  </div>
</template>

<script>
import {get} from 'lodash'
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
export default {
  data:()=>({
    get,
    doc: '',
    count: 0
  }),
  computed:{
    clearance(){
      return this.$store.getters['core/getClearance']
    }
  },
  mounted(){
    // initialized jspdf plugin
    this.centerTextAPI(jsPDF.API)

    this.getClearance()
  },
  methods:{
    getClearance(){
      if(this.$route.params.id){
        this.$store.dispatch('core/viewClearance', {clearance_id: this.$route.params.id}).then(res=>{
          console.log(res)
          if(res.response){
            this.openPDF(get(this.clearance, 'data[0]'))
          }
        }).catch(error=>{
          console.log(error.message)
        })
      }else{
        console.log('No parameter')
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
      this.doc = new jsPDF()
      let dept_approved = []
      let content = []
      let font = 'Helvetica'
      let ptcInfoY = 18
      let studentInfoY = 45
      let studentName = `${clearance.student_info[0].first_name} ${clearance.student_info[0].last_name}`
      let studentCourse = clearance.course
      let clearanceSemester = clearance.semester
      let studentYearSection = `${clearance.year_level.substring(0,1)}${clearance.section}`
      let studentAcademicYear = clearance.academic_year

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

      this.doc.output('dataurlnewwindow');
      this.count = 0
    }
  }
}
</script>

<style>

</style>