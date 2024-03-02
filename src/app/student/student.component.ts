import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { StudentSelectors } from "./store/student.selectors";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { StudentActions } from "./store/student.actions";

@Component({
  selector: "app-student",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, JsonPipe],
  template: `
    <h1>Students</h1>
    {{ students$ | async | json }}
  `,
  styles: [``],
})
export class StudentComponent implements OnInit {
  studentStore = inject(Store);

  students$ = this.studentStore.select(StudentSelectors.selectStudents);
  loading$ = this.studentStore.select(StudentSelectors.selectStudentLoading);
  error$ = this.studentStore.select(StudentSelectors.selectStudentError);

  ngOnInit() {
    this.studentStore.dispatch(StudentActions.loadStudents());
  }
}
