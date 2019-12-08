import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class RestManagerService {
  constructor(private http: HttpClient) {}

  public post(ruta: string, body: any) {
    return this.http.post(ruta, body);
  }
}
