import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseListing } from '../Models/CourseListing';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(public http: HttpClient) { }
  endPoint: string = "https://localhost:7266/api/Courses/"
  
  //retrieve course: Read
  GetAllCourses()
  {
    return this.http.get<CourseListing[]>(this.endPoint + "RetrieveAllCourses")
  }

   //retrieve  a single course: Read
   GetCourse(courseId:number)
   {
     return this.http.get<CourseListing>(`${this.endPoint}RetrieveCourse/${courseId}`)
   }
 

////Create a  course: Create
  AddCourse(course: CourseListing)
  {
    return this.http.post<string>(this.endPoint + "addCourse",course)
  }

//Update a  course: Update
  UpdateCourse(course: CourseListing)
  {
    return this.http.post<string>(this.endPoint + "updateCourse",course);
  }

//Delete a  course: Delete

DeleteCourse(courseId: number) {
  return this.http.post<string>(`${this.endPoint}deleteCourse/${courseId}`, null);
}


}
