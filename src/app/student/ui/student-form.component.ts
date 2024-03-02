import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
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
      (ngSubmit)="onPost($event)"
      style="display: flex;gap:10px;align-items:center;margin-bottom:25px"
    >
      <input type="hidden" formControlName="id" />
      <label for="name">Name:</label>
      <input type="text" pInputText formControlName="name" />
      <label for="email">Email:</label>
      <input type="email" pInputText formControlName="email" />

      <p-button
        type="submit"
        icon="pi pi-save"
        label="Save"
        [disabled]="studentForm.invalid"
      ></p-button>

      <p-button
        type="button"
        icon="pi pi-refresh"
        label="Reset"
        severity="secondary"
        (onClick)="onReset()"
      ></p-button>
    </form>
  `,
  styles: [``],
})
export class StudentFormComponent {
  @Input() set setFormData(student: StudentModel | null) {
    if (student) this.studentForm.patchValue(student);
  }
  @Output() submit = new EventEmitter<StudentModel>();
  @Output() reset = new EventEmitter();

  fb = inject(FormBuilder);
  studentForm: FormGroup = this.fb.group({
    id: [""],
    name: ["", Validators.required],
    email: ["", [Validators.email, Validators.required]],
  });

  onPost(event: Event) {
    event.stopPropagation();
    var student: StudentModel = Object.assign(this.studentForm.value);
    this.submit.emit(student);
    this.studentForm.reset();
  }

  onReset() {
    this.studentForm.reset();
    this.reset.emit();
  }
}
