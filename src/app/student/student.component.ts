import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { StudentSelectors } from "./store/student.selectors";
import { AsyncPipe, NgIf } from "@angular/common";
import { StudentActions } from "./store/student.actions";
import { StudentListComponent } from "./ui/student-list.component";
import { StudentFormComponent } from "./ui/student-form.component";
import { StudentModel } from "./student.model";

@Component({
  selector: "app-student",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, StudentListComponent, StudentFormComponent, NgIf],
  template: `
    <h1 style="color:red">Students (Reset form after save)</h1>
    <ng-container *ngIf="students$ | async as students">
      <app-student-form
        (submit)="onSubmit($event)"
        (reset)="onReset()"
        [setFormData]="studentToUpdate"
      />
      <app-student-list
        [students]="students"
        (edit)="onEdit($event)"
        (delete)="onDelete($event)"
      />
    </ng-container>
  `,
  styles: [``],
})
export class StudentComponent implements OnInit {
  studentStore = inject(Store);
  studentToUpdate: StudentModel | null = null;
  students$ = this.studentStore.select(StudentSelectors.selectStudents);
  loading$ = this.studentStore.select(StudentSelectors.selectStudentLoading);
  error$ = this.studentStore.select(StudentSelectors.selectStudentError);

  onEdit(student: StudentModel) {
    this.studentToUpdate = student;
  }

  onDelete(student: StudentModel) {
    alert(JSON.stringify(student));
  }

  onSubmit(student: StudentModel) {
    // console.log(student);
    alert(JSON.stringify(student));
  }

  onReset() {
    this.studentToUpdate = null;
  }
  ngOnInit() {
    this.studentStore.dispatch(StudentActions.loadStudents());
  }
}
