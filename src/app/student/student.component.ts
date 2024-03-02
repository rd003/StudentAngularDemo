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
    <h1>Students</h1>
    <ng-container *ngIf="students$ | async as students">
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

  students$ = this.studentStore.select(StudentSelectors.selectStudents);
  loading$ = this.studentStore.select(StudentSelectors.selectStudentLoading);
  error$ = this.studentStore.select(StudentSelectors.selectStudentError);

  onEdit(student: StudentModel) {
    alert(JSON.stringify(student));
  }

  onDelete(student: StudentModel) {
    alert(JSON.stringify(student));
  }
  ngOnInit() {
    this.studentStore.dispatch(StudentActions.loadStudents());
  }
}
