import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";
import { StudentModel } from "./student.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class StudentService {
  private apiUrl = environment.API_BASE_URL + "/students";
  private http = inject(HttpClient);

  addStudent(student: StudentModel): Observable<StudentModel> {
    return this.http.post<StudentModel>(this.apiUrl, student);
  }

  getStudents(): Observable<StudentModel[]> {
    return this.http.get<StudentModel[]>(this.apiUrl);
  }

  getStudent(id: string): Observable<StudentModel> {
    return this.http.get<StudentModel>(`${this.apiUrl}/${id}`);
  }

  deleteStudent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updateStudent(student: StudentModel): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${student.id}`, student);
  }
}
