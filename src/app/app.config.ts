import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideStore } from "@ngrx/store";
import { provideHttpClient } from "@angular/common/http";
import { provideEffects } from "@ngrx/effects";
import {
  StudentFeatureKey,
  studentReducer,
} from "./student/store/book.reducer";

const reducers = {
  [StudentFeatureKey]: studentReducer,
};

// const effects = [];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(reducers),
    provideHttpClient(),
    // provideEffects(effects),
  ],
};
