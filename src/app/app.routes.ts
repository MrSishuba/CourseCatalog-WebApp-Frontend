import { Routes } from '@angular/router';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { UpdateCourseComponent } from './courses/update-course/update-course.component';


export const routes: Routes = [
{path:'',pathMatch:'full',redirectTo:'INF 354 Assignment 1'},
{path:'INF 354 Assignment 1',component:CourseListComponent},
{path:'update/:courseId',component:UpdateCourseComponent},
{path:'Add Course',component:AddCourseComponent},


];
