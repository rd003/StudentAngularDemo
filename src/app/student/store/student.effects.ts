import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { StudentService } from "../student.service";
import { StudentActions } from "./student.actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class StudentEffets {
  studentService = inject(StudentService);
  actions$ = inject(Actions);

  loadStudents = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.loadStudents),
      switchMap((action) =>
        this.studentService.getStudents().pipe(
          map((students) => StudentActions.loadStudentSuccess({ students })),
          catchError((error) => {
            console.log(`Error:${error}`);
            return of(StudentActions.loadStudentFailure({ error }));
          })
        )
      )
    )
  );

  addStudent = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.addStudent),
      switchMap((action) =>
        this.studentService.addStudent(action.student).pipe(
          map((student) => StudentActions.addStudentSuccess({ student })),
          catchError((error) => of(StudentActions.addStudentFailure({ error })))
        )
      )
    )
  );
}
