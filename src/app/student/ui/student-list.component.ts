import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { StudentModel } from "../student.model";

@Component({
  selector: "app-student-list",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableModule, ButtonModule],
  template: `
    <p-table [value]="students" [tableStyle]="{ 'min-width': '50rem' }">
      <ng-template pTemplate="header">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-student>
        <tr>
          <td>{{ student.name }}</td>
          <td>{{ student.email }}</td>
          <td style="display: flex;gap:5px">
            <p-button
              severity="info"
              icon="pi pi-pencil"
              (onClick)="edit.emit(student)"
            ></p-button>
            <p-button
              severity="danger"
              icon="pi pi-trash"
              (onClick)="delete.emit(student)"
            ></p-button>
          </td>
        </tr>
      </ng-template>
    </p-table>
  `,
  styles: [``],
})
export class StudentListComponent {
  @Input({ required: true }) students!: StudentModel[];
  @Output() edit = new EventEmitter<StudentModel>();
  @Output() delete = new EventEmitter<StudentModel>();
}
