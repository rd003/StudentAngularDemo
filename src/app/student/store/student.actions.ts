import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { StudentModel } from "../student.model";
import { HttpErrorResponse } from "@angular/common/http";

export const StudentActions = createActionGroup({
  source: "Student",
  events: {
    "Load Students": emptyProps(),
    "Load Student Success": props<{ students: StudentModel[] }>(),
    "Load Student Failure": props<{ error: HttpErrorResponse }>(),
    "Add Student": props<{ student: StudentModel }>,
    "Add Student Success": props<{ student: StudentModel }>,
    "Add Student Failure": props<{ error: HttpErrorResponse }>(),
    "Update Student": props<{ student: StudentModel }>(),
    "Update Student Success": props<{ student: StudentModel }>(),
    "Update Student Failure": props<{ error: HttpErrorResponse }>(),
    "Delete Sdudent": props<{ id: number }>(),
    "Delete Sdudent Success": props<{ id: number }>(),
    "Delete Student Failure": props<{ error: HttpErrorResponse }>(),
  },
});
