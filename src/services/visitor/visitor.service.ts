import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppModule } from 'src/app/app.module';
const base = 'visitor'

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  constructor(private http: HttpClient) { }

  // BOOKING REQUESTS
  postBooking(data: any){
    return this.http.post(`${base}/post-booking`, data)
  }
  getBooking(id: any){
    return this.http.get(`${base}/get-booking/${id}`)
  }
  getBookings(){
    return this.http.get(`${base}/get-bookings`)
  }
  deleteBooking(id: any){
    return this.http.delete(`${base}/delete-booking/${id}`)
  }
  updateBooking(id: any, data: any){
    return this.http.put(`${base}/update-booking/${id}`, data)
  }


  // COMMENT REQUEST

  postComment(data: any){
    return this.http.post(`${base}/post-comment`, data)
  }

  getComment(id: any){
    return this.http.get(`${base}/get-comment/${id}`)
  }

  getComments(){
    return this.http.get(`${base}/get-comments`)
  }

  deleteComment(id: any){
    return this.http.delete(`${base}/delete-comment/${id}`)
  }
}
