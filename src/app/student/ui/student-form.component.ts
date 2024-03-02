import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from "@angular/core";
import { StudentModel } from "../student.model";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-student-form",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
  template: `
    <form
      [formGroup]="studentForm"
      (ngSubmit)="onPost()"
      style="display: flex;gap:10px;align-items:center;margin-bottom:25px"
    >
      <input type="hidden" formControlName="id" />
      <label for="name">Name:</label>
      <input type="text" pInputText formControlName="name" />
      <label for="email">Email:</label>
      <input type="email" pInputText formControlName="email" />
      <button
        type="submit"
        pButton
        icon="pi pi-save"
        label="Save"
        class="btn btn-primary"
        [disabled]="studentForm.invalid"
      ></button>
    </form>
  `,
  styles: [``],
})
export class StudentFormComponent {
  @Input() student: StudentModel = { id: "", name: "", email: "" };
  fb = inject(FormBuilder);
  studentForm: FormGroup = this.fb.group({
    id: [""],
    name: ["", Validators.required],
    email: ["", [Validators.email, Validators.required]],
  });

  onPost() {
    alert(JSON.stringify(this.studentForm.value));
  }
}
