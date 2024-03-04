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
import { ConfirmationService, MessageService } from "primeng/api";
import { MessagesModule } from "primeng/messages";
import { ProgressBarModule } from "primeng/progressbar";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { generateGUID } from "../helpers/uuid";

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
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
  template: `
    <h1>Students</h1>
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
    <p-confirmDialog></p-confirmDialog>
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
  confirmationService = inject(ConfirmationService);
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
    // if (window.confirm("Are you sure to delete this item?")) {
    //this.studentStore.dispatch(StudentActions.deleteSdudent(student));
    // }
    this.confirmationService.confirm({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-info-circle",
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.studentStore.dispatch(StudentActions.deleteSdudent(student));
        this.messageService.add({
          severity: "success",
          summary: "Result",
          detail: "Deleted Successfully",
          life: 2000,
        });
      },
      reject: () => {
        // this.messageService.add({
        //   severity: "error",
        //   summary: "Rejected",
        //   detail: "Process incomplete",
        //   life: 3000,
        // });
      },
    });
  }

  onSubmit(student: StudentModel) {
    // console.log(student.id);
    if (student.id?.length > 0) {
      this.studentStore.dispatch(StudentActions.updateStudent({ student }));
    } else {
      student.id = generateGUID();
      this.studentStore.dispatch(StudentActions.addStudent({ student }));
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
