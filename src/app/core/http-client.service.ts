import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HttpClientService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) {}

  get(
    path: string,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe?: "body";
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: "json";
      withCredentials?: boolean;
    }
  ): Observable<any> {
    return this.http.get<any>(path, options);
  }

  post(path: string, data: object): Observable<any> {
    return this.http.post<any>(path, data);
  }

  put(path: string, data: object): Observable<any> {
    return this.http.put<any>(path, data);
  }

  postProgress(
    path: string,
    data: object,
    options: {
      headers?: HttpHeaders;
      observe: "events";
      reportProgress: true;
    } = {
      observe: "events",
      reportProgress: true
    }
  ) {
    return this.http.post(path, data, options);
  }

  delete(
    path: string,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe?: "body";
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: "json";
      withCredentials?: boolean;
    }
  ): Observable<any> {
    return this.http.delete<any>(path, options);
  }
}
