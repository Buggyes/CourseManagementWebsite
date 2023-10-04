import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourseService } from './services/course.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'AngularEX4';

  data: any
  editingCourse: boolean = false
  editForm: FormGroup
  courseForm: FormGroup
  courses: any[] = []

  constructor(private service: CourseService, public fb: FormBuilder) {
    this.courseForm = this.fb.group({
      Name: [""],
      Workload: [""],
      Area: [""],
      MonthlyFee: [""]
    })

    this.editForm = this.fb.group({
      Name: [""],
      Workload: [""],
      Area: [""],
      MonthlyFee: [""]
    })
  }

  ngOnInit(): void {
    this.GetAllCourses()
    this.editingCourse = false
  }

  OpenEditForm(data: any){
    this.editingCourse = true
    this.editForm.patchValue(data)
    this.data = data
  }

  SubmitForm(editing: boolean) {
    if (editing) {
      this.service.editCourse(this.data.id, this.editForm.value).subscribe(data => {
        alert('Edited')
        this.GetAllCourses()
      })
      this.editingCourse=false
    }
    else {
      this.service.addCourse(this.courseForm.value).subscribe(data => {
        alert('Added')
        this.GetAllCourses()
      })
    }
  }

  GetAllCourses() {
    this.service.getAllCourses().subscribe(data => {
      this.courses = data
    })
  }

  DeleteCourseById(id: any) {
    this.service.deleteCourse(id).subscribe(data => {
      alert('Course Deleted')
      this.GetAllCourses()
    })
  }
}
