import { Component } from '@angular/core';
import { CourseService } from '../../Services/course.service';
import { CourseListing } from '../../Models/CourseListing';
import { CommonModule } from '@angular/common'; // Import CommonModule //Allows ngFor to work
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule,RouterLink ],//Remeber once import is declared use to initialize it
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {

  constructor (private courseServiceGate: CourseService, private myRouter: Router) 
  {

  }

  courses: CourseListing[] = [];
  // ngOnInit()
  // {
  //   this.courseServiceGate.GetAllCourses().subscribe(x => {this.courses = x; console.log(x);});
  // }

  ngOnInit()
  {
    this.GetAllCourses();
  }


  GetAllCourses(){

    this.courseServiceGate.GetAllCourses().subscribe(x => {this.courses = x; console.log(x);});
  }

  onDelete(courseId: number) {
    this.courseServiceGate.DeleteCourse(courseId).subscribe(() => {
      // Deletion successful, now refresh the list of courses
      this.GetAllCourses(); // Fetch the updated list of courses
  
      // Navigate to the desired route
      this.myRouter.navigateByUrl("/INF 354 Assignment 1");
      this.onRefresh();
    });

   
  }

     onRefresh(): void{
   window.location.reload();
   }
  
  
}
