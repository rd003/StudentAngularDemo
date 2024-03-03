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
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { MessagesModule } from "primeng/messages";
import { ProgressBarModule } from "primeng/progressbar";

@Component({
  selector: "app-student",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    StudentListComponent,
    StudentFormComponent,
    NgIf,
    ToastModule,
    MessagesModule,
    ProgressBarModule,
  ],
  providers: [MessageService],
  template: `
    <h1 style="color: red;">Students (generate id automatically)</h1>
    <h2>blank id are getting saved</h2>
    <div
      *ngIf="loading$ | async as loading"
      style="
    margin:20px 0px"
    >
      <p-progressBar
        mode="indeterminate"
        [style]="{ height: '6px' }"
      ></p-progressBar>
    </div>
    <ng-container *ngIf="error$ | async as error">
      <p-messages
        *ngIf="error"
        [(value)]="message"
        [enableService]="false"
        [closable]="true"
        >{{ error }}</p-messages
      >
    </ng-container>
    <p-toast position="bottom-center"></p-toast>
    <app-student-form
      (submit)="onSubmit($event)"
      (reset)="onReset()"
      [setFormData]="studentToUpdate"
    />
    <ng-container *ngIf="students$ | async as students">
      <app-student-list
        *ngIf="students.length > 0; else noData"
        [students]="students"
        (edit)="onEdit($event)"
        (delete)="onDelete($event)"
      />
      <ng-template #noData> No records found </ng-template>
    </ng-container>
  `,
  styles: [``],
})
export class StudentComponent implements OnInit {
  studentStore = inject(Store);
  messageService = inject(MessageService);
  studentToUpdate: StudentModel | null = null;
  students$ = this.studentStore.select(StudentSelectors.selectStudents);
  loading$ = this.studentStore.select(StudentSelectors.selectStudentLoading);
  error$ = this.studentStore.select(StudentSelectors.selectStudentError);

  message = [
    { severity: "error", summary: "Error", detail: "Something went wrong" },
  ];

  onEdit(student: StudentModel) {
    this.studentToUpdate = student;
  }

  onDelete(student: StudentModel) {
    console.log(student);
    if (window.confirm("Are you sure to delete this item?")) {
      // this.studentStore.dispatch(StudentActions.deleteSdudent(student));
    }
  }

  onSubmit(student: StudentModel) {
    // console.log(student.id);
    if (student.id?.length > 0) {
      console.log("update");
      // this.studentStore.dispatch(StudentActions.updateStudent({ student }));
    } else {
      console.log("edit");
      //this.studentStore.dispatch(StudentActions.addStudent({ student }));
    }
    this.studentToUpdate = null;
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Saved successfully",
    });
  }

  onReset() {
    this.studentToUpdate = null;
  }
  ngOnInit() {
    this.studentStore.dispatch(StudentActions.loadStudents());
  }
}
