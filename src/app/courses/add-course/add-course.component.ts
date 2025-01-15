import { Component } from '@angular/core';
import { FormControl,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { CourseService } from '../../Services/course.service';
import { CourseListing } from '../../Models/CourseListing';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';






@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {


// Form construction
addForm: FormGroup = new FormGroup({
  courseName: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
  courseDuration: new FormControl("",[Validators.required]),
  courseDescription: new FormControl("", [Validators.required]),
});


  //create form with deafult contructor form
constructor(private cousreService: CourseService, private myRouter: Router)
{

}

ngOnInit()
{
 this.clearForm();
}
//clear form before manipluating it
clearForm()
{
  this.addForm.reset();
}

//collect form data info
onAddCourse()
{
   //If invalid do not send information to database flag stay on page
  if(this.addForm.invalid)
  {
    Object.values(this.addForm.controls).forEach(control =>{
    if(control.invalid){
      control.markAsDirty();
      control.updateValueAndValidity({onlySelf: true})
    }
    });

  }
  //If valid send information to database
  else 
  {
     let cousre = new CourseListing();
     cousre.courseName = this.addForm.controls["courseName"].value;
     cousre.courseDuration = this.addForm.controls["courseDuration"].value;
     cousre.courseDescription = this.addForm.controls["courseDescription"].value;
     this.cousreService.AddCourse(cousre).subscribe({
      
      next: x => {console.log(x);
        this.clearForm();
      this.myRouter.navigateByUrl("/INF 354 Assignment 1");},
      error : err => {
        console.log(err)
      }
    
    
    });
          //improper coding technique but works   
          this.myRouter.navigateByUrl("/INF 354 Assignment 1");
          
  }
}

onCancel()
{
  this.myRouter.navigateByUrl("/INF 354 Assignment 1");
}

//Suppossed to refresh on load once called
onRefresh(): void{
  location.reload();
}

}

