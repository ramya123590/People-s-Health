import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApoointmentService } from '../service/apoointment.service';
@Component({
  selector: 'app-datetimepick',
  templateUrl: './datetimepick.component.html',
  styleUrls: ['./datetimepick.component.css']
})
export class DatetimepickComponent implements OnInit {
  istrue:boolean
  dateandtime:FormGroup
  constructor(private router:Router,private sharedService: SharedService,private appointmentservice:ApoointmentService) {
    this.dateandtime = new FormGroup({
      date: new FormControl('', [Validators.required]),
     slot: new FormControl('', [Validators.required])
    });
   }

  ngOnInit() {
    (function() {
      'use strict';
      window.addEventListener('load', function() {
        // Get the forms we want to add validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();
    this.istrue=false;
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("txtDate")[0].setAttribute('min', today);
    var someDate = new Date();
  var numberOfDaysToAdd = 10;
  someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
  document.getElementsByName("txtDate")[0].setAttribute('max', someDate.toISOString().split('T')[0]);
  }
  onSubmit(){
    console.log("hi"+this.sharedService.appointment.date);
    this.appointmentservice.find(this.sharedService.appointment).subscribe(data=>{
      if(data){
        alert("this slot is already booked select some other slot");

    }
    else{
      this.istrue=true;
    }
  })
   
    //this.router.navigate(['payment'])
  }
  savevalue(){
    this.appointmentservice.find(this.sharedService.appointment).subscribe(data=>{
      if(data){
        alert("this slot is already booked select some other slot");

    }
    else{
      console.log(this.sharedService.appointment.date);
      console.log(this.sharedService.appointment.slot);
      console.log(sessionStorage.getItem("LoggedInUser"))
      this.sharedService.appointment.patient_id=sessionStorage.getItem("LoggedInUser")
      this.sharedService.appointment.isfeepaid=false;
  
      console.log(this.sharedService.appointment)
      this.appointmentservice.save(this.sharedService.appointment).subscribe();
      alert("Your booking is confirmed!")
    }
  })

   
  }
  onlinesave(){
    
    this.router.navigate(['payment'])
    
  }

}