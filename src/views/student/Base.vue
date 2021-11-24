<template>
  <div class="container py-4" style="position: relative;">
    <div class="row" style="margin-top: 60px;">
      <div class="col-12 col-md-3 card shadow-sm sidenav p-0 d-none d-md-block" style="max-height: 341px; min-height: 341px;">
        <img height="120" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuNfh5XEmL28p3fZftINhCjPR1g7V8IDWJ9-H58s0jyp4GMH_nWaRqFrRFu-6CJbaTdK0&usqp=CAU" class="rounded mx-auto mt-4 d-block" alt="prof_pic">
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
      <b-modal title="Print Clearance" hide-footer hide-header-close no-close-on-backdrop :visible="printModal">
        <form class="my-2 mx-4">
          <div class="form-group mb-2 row no-gutters">
            <a href="#" @click="openPDF">Clearance 1</a>
          </div>
          <div class="d-flex justify-content-end mt-4">
            <b-button variant="warning" class="mr-2" @click.prevent="cancel">Cancel</b-button>
            <b-button type="submit" variant="success" class="px-3" @click.prevent="print">Print</b-button>
          </div>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import {io} from 'socket.io-client'
import {get} from 'lodash'
import { jsPDF } from "jspdf";
import 'jspdf-autotable'


export default {
    data:()=>({
        get,
        activeTab: '',
        printModal: false,
        doc: ''
    }),
    mounted(){
      this.activeTab = this.$route.path.substring(17)

      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if(get(userInfo, 'role') === 'student'){
          const socket = io("http://localhost:5000");
          console.log(get(userInfo, 'email'))
          this.$store.dispatch('studentInfo/getStudentInfo', {id: get(userInfo, 'id')}).then(res=>{
            console.log(res)
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
        console.log('cancel')
      },
      print(){
        this.printModal = false
        console.log('print')
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
      openPDF(){
        this.doc = new jsPDF(
          {
            // orientation: 'landscape'
          }
        )

        let content = [
          ['Alice Meli', 'Registrar'],
          ['Josephine Alexa', 'Accounting'],
          ['Peterson Canry', 'Guidance'],
          ['Judith Minoza', 'Student Affairs'],
          ['Lesley Manalac', 'Library'],
          ['James Smith', 'Head Department (BSIT,CCS,CHS)'],
        ]

        let font = 'Helvetica'

        let ptcInfoY = 18

        this.doc.setFontSize(14)
        this.doc.setFont(font,'bold')
        this.doc.myText("PATEROS TECHNOLOGICAL COLLEGE",{align: "center"},14,ptcInfoY);
        this.doc.setFontSize(11)
        this.doc.myText("COLLEGE ST. STO. ROSARIO-KANLURAN, PATEROS M.M",{align: "center"},14,ptcInfoY+6);
        this.doc.setFontSize(16)
        this.doc.myText("STUDENT CLEARANCE",{align: "center"},14,ptcInfoY+14);


        let studentInfoY = 45

        this.doc.setFontSize(12)
        this.doc.setFont(font,'bold')
        this.doc.text("Name: ", 14, studentInfoY);
        this.doc.setFontSize(12)
        this.doc.setFont(font,'normal')
        this.doc.text("John Doe", 42, studentInfoY);

        this.doc.setFontSize(12)
        this.doc.setFont(font,'bold')
        this.doc.text("Course: ", 14, studentInfoY+7);
        this.doc.setFontSize(12)
        this.doc.setFont(font,'normal')
        this.doc.text("BSIT", 42, studentInfoY+7);

        this.doc.setFontSize(12)
        this.doc.setFont(font,'bold')
        this.doc.text("Year/Section: ", 72, studentInfoY+7);
        this.doc.setFontSize(12)
        this.doc.setFont(font,'normal')
        this.doc.text("1B", 113, studentInfoY+7);

        this.doc.setFontSize(12)
        this.doc.setFont(font,'bold')
        this.doc.text("Semester: ", 14, studentInfoY+14);
        this.doc.setFontSize(12)
        this.doc.setFont(font,'normal')
        this.doc.text("1st", 42, studentInfoY+14);

        this.doc.setFontSize(12)
        this.doc.setFont(font,'bold')
        this.doc.text("Academic Year: ", 72, studentInfoY+14);
        this.doc.setFontSize(12)
        this.doc.setFont(font,'normal')
        this.doc.text("2020-2021", 113, studentInfoY+14);
        
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
              var base64Img = 'data:image/jpeg;base64,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'
              this.doc.addImage(base64Img, 'JPEG', data.cell.x + 5, data.cell.y + 2, 38, 15)
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

        this.doc.output('a4.pdf')
        this.doc.autoPrint({variant: 'non-conform'});
        this.doc.output('dataurlnewwindow');
        
        
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
</style>