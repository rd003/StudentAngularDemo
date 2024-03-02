import { HttpErrorResponse } from "@angular/common/http";
import { StudentModel } from "../student.model";
import { createReducer, on } from "@ngrx/store";
import { StudentActions } from "./student.actions";

export const StudentFeatureKey = "student";

export interface StudentState {
  students: StudentModel[];
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialState: StudentState = {
  students: [],
  loading: false,
  error: null,
};

export const studentReducer = createReducer(
  initialState,
  on(StudentActions.loadStudents, (state) => ({ ...state, loading: true })),
  on(StudentActions.loadStudentSuccess, (state, { students }) => ({
    ...state,
    students,
    loading: false,
  })),
  on(StudentActions.loadStudentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(StudentActions.addStudent, (state, { student }) => ({
    ...state,
    loading: true,
  })),
  on(StudentActions.addStudentSuccess, (state, { student }) => ({
    ...state,
    students: [...state.students, student],
    loading: false,
  })),
  on(StudentActions.addStudentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(StudentActions.updateStudent, (state, { student }) => ({
    ...state,
    loading: true,
  })),
  on(StudentActions.updateStudentSuccess, (state, { student }) => ({
    ...state,
    loading: false,
    students: state.students.map((s) => (s.id === student.id ? student : s)),
  })),
  on(StudentActions.updateStudentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(StudentActions.deleteSdudent, (state, { id }) => ({
    ...state,
    loading: true,
  })),
  on(StudentActions.deleteSdudentSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    students: state.students.filter((s) => s.id !== id),
  })),
  on(StudentActions.deleteStudentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
