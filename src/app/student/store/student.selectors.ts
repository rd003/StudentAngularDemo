import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StudentFeatureKey, StudentState } from "./student.reducer";

export const selectStudentState =
  createFeatureSelector<StudentState>(StudentFeatureKey);

const selectStudents = createSelector(
  selectStudentState,
  (state) => state.students
);

const selectStudentLoading = createSelector(
  selectStudentState,
  (state) => state.loading
);

const selectStudentError = createSelector(
  selectStudentState,
  (state) => state.error
);

export const StudentSelectors = {
  selectStudents,
  selectStudentError,
  selectStudentLoading,
};
