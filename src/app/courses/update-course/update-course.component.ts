import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule,Validators} from '@angular/forms';
import { CourseListing } from '../../Models/CourseListing';
import { CourseService } from '../../Services/course.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-update-course',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css'
})
export class UpdateCourseComponent {

// Form construction
updateForm: FormGroup = new FormGroup({
  courseName: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
  courseDuration: new FormControl("",[Validators.required]),
  courseDescription: new FormControl("", [Validators.required]),
});

//Receieve incoming data extend subscription class
//Parameters!: Subscription; instatiation variation
Parameters: Subscription = new Subscription();
courseId!: number;
course!: CourseListing;



  //create form with deafult contructor form
constructor(private cousreService: CourseService, private myRouter: Router, private initializedRoute: ActivatedRoute)
{

}

ngOnInit(): void {
  // Subscribe to the route parameters to get the courseId
  this.Parameters = this.initializedRoute.params.subscribe(params => {
    // Extract the courseId from the route parameters
    this.courseId = +params['courseId'];
    // Retrieve the course details based on the courseId
    this.retrieveCourse();
  });
}

//clear form before manipluating it
clearForm()
{
  this.updateForm.reset();
}

//fetch dat from database
retrieveCourse()
{
  this.cousreService.GetCourse(this.courseId).subscribe({
      
    next: x => {console.log(x);
    this.clearForm();
    this.course = x;
    this.SetFormValues();
    },
    error : err => {
      console.log(err)
    }
  
  
  });
}
//Response "x" is assigned to course object now that data has to be assigend to the form
SetFormValues()
{
  this.updateForm.controls["courseName"].setValue(this.course.courseName);
  this.updateForm.controls["courseDuration"].setValue(this.course.courseDuration);
  this.updateForm.controls["courseDescription"].setValue(this.course.courseDescription);
}
//collect form data info
onUpdateCourse()
{
  if(this.updateForm.invalid)
  {
    Object.values(this.updateForm.controls).forEach(control =>{
    if(control.invalid){
      control.markAsDirty();
      control.updateValueAndValidity({onlySelf: true})
    }
    });

  }
  else 
  {
     let cousre = new CourseListing();
     cousre.courseId = this.course.courseId;
     cousre.courseName = this.updateForm.controls["courseName"].value;
     cousre.courseDuration = this.updateForm.controls["courseDuration"].value;
     cousre.courseDescription = this.updateForm.controls["courseDescription"].value;
     this.cousreService.UpdateCourse(cousre).subscribe({
      
      next: x => {console.log(x);
        this.clearForm();
      this.myRouter.navigateByUrl("/INF 354 Assignment 1");},
      error : err => {
        console.log(err)
        this.myRouter.navigateByUrl("/INF 354 Assignment 1");
      }   
    });
    
  }
  
}

onCancel()
{
  this.myRouter.navigateByUrl("/INF 354 Assignment 1");
}

}


