import { Injectable } from "@angular/core";
import { HttpClientService } from "./http-client.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private readonly httpClient: HttpClientService) {}

  revokeToken() {
    return this.httpClient.delete(`${environment.apiUrl}/auth/revoke`);
  }
}
