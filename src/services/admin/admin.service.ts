import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppModule } from 'src/app/app.module';
const base = 'admin'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAdmin(id: string){
    return this.http.get(`${base}/get-admin/${id}`)
  }

  getAdmins(){
    return this.http.get(`${base}/get-admins`)
  }

  updateNames(id: string, data: any){
    return this.http.put(`${base}/update-names/${id}`, data)
  }

  updateContact(id: string, data: any){
    return this.http.put(`${base}/update-contact/${id}`, data)
  }

  updatePassword(id: string, data: any){
    return this.http.put(`${base}/update-password/${id}`, data)
  }

  updateImage(id: string, data: any){
    return this.http.put(`${base}/update-image/${id}`, data)
  }
}
