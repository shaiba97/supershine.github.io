import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppModule } from 'src/app/app.module';
const base = 'config'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  // Member Requests

  postMember(data: any){
    return this.http.post(`${base}/post-member`, data)
  }
  getMember(id: any){
    return this.http.get(`${base}/get-member/${id}`)
  }
  getMembers(){
    return this.http.get(`${base}/get-members`)
  }
  deleteMember(id: any){
    return this.http.delete(`${base}/delete-member/${id}`)
  }
  updateMember(id: any, data: any){
    return this.http.put(`${base}/update-member/${id}`, data)
  }

  updateMemberImage(id: any, data: any){
    return this.http.put(`${base}/update-member-image/${id}`, data)
  }

  // Service Requests
  postService(data: any){
    return this.http.post(`${base}/post-service`, data)
  }
  getService(id: any){
    return this.http.get(`${base}/get-service/${id}`)
  }

  getServices(){
    return this.http.get(`${base}/get-services`)
  }
  deleteService(id: any){
    return this.http.delete(`${base}/delete-service/${id}`)
  }
  updateService(id: any, data: any){
    return this.http.put(`${base}/update-service/${id}`, data)
  }

  // Testimonial Requests
  postTestimonial(data: any){
    return this.http.post(`${base}/post-testimonial`, data)
  }
  getTestimonial(id: any){
    return this.http.get(`${base}/get-testimonial/${id}`)
  }

  getTestimonials(){
    return this.http.get(`${base}/get-testimonials`)
  }
  deleteTestimonial(id: any){
    return this.http.delete(`${base}/delete-testimonial/${id}`)
  }
  updateTestimonial(id: any, data: any){
    return this.http.put(`${base}/update-testimonial/${id}`, data)
  }
  // Blog Requests
  postBlog( data: any){
    return this.http.post(`${base}/post-blog`, data)
  }
  getBlog(id: any){
    return this.http.get(`${base}/get-blog/${id}`)
  }
  getBlogs(){
    return this.http.get(`${base}/get-blogs/`)
  }
  deleteBlog(id: any){
    return this.http.delete(`${base}/delete-blog/${id}`)
  }
  updateBlog(id: any, data: any){
    return this.http.put(`${base}/update-blog/${id}`, data)
  }

}
