import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideStore } from "@ngrx/store";
import { provideHttpClient } from "@angular/common/http";
import { provideEffects } from "@ngrx/effects";
import {
  StudentFeatureKey,
  studentReducer,
} from "./student/store/student.reducer";
import { StudentEffets } from "./student/store/student.effects";

const reducers = {
  [StudentFeatureKey]: studentReducer,
};

const effects = [StudentEffets];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(reducers),
    provideHttpClient(),
    provideEffects(effects),
  ],
};
