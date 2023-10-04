import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  readonly _url = 'http://localhost:3000/Courses/'

  constructor(private http:HttpClient) { }

  addCourse(data:any):Observable<any>{
    return this.http.post(this._url,data)
  }

  editCourse(id:number, data:any):Observable<any>{
    return this.http.put(this._url+id,data)
  }

  getAllCourses():Observable<any>{
    return this.http.get(this._url)
  }

  deleteCourse(id:any):Observable<any>{
    return this.http.delete(this._url+id)
  }
}
