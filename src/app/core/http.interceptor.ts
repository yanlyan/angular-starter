import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { Store } from "@ngxs/store";
import { AppStateModel, AppState, SetSessionState } from "../app.state";
import { map, catchError } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { SetUserState } from "./user.state";

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(
    private readonly store: Store,
    private readonly snackbar: MatSnackBar,
    private readonly router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const appState: AppStateModel = this.store.selectSnapshot(AppState);
    const token = appState.session ? appState.session.token : null;
    if (token) {
      let tokenizedRequest = req;
      const headers = new HttpHeaders({
        Authorization: "Bearer " + token,
        ["refresh-token"]: appState.session.refreshToken
      });
      tokenizedRequest = req.clone({
        headers
      });
      return next.handle(tokenizedRequest).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.headers.get("token")) {
              this.store.dispatch(
                new SetSessionState({
                  token: event.headers.get("token"),
                  refreshToken: event.headers.get("refresh-token")
                })
              );
            }
          }
          return event;
        }),
        catchError(error => {
          if (error.error.type === "refresh_token_invalid") {
            this.store.dispatch(new SetSessionState(null));
            this.store.dispatch(new SetUserState(null));
            this.router.navigate(["login"]);
            this.snackbar.open(
              `Terjadi Kesalahan : Waktu session habis`,
              "Tutup"
            );
          } else {
            this.snackbar.open(
              `Terjadi Kesalahan : ${error.error.message}`,
              "Tutup"
            );
          }
          return throwError(error);
        })
      );
    } else {
      return next.handle(req).pipe(
        map((event: HttpEvent<any>) => {
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          this.snackbar.open(
            `Terjadi Kesalahan : ${error.error.message}`,
            null
          );
          return throwError(error);
        })
      );
    }
  }
}
