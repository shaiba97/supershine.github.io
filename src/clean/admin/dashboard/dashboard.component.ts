import { Component } from '@angular/core';
import { ConfigService } from 'src/services/config/config.service';
import { VisitorService } from 'src/services/visitor/visitor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  members: any[] = []
  comments: any[] = []
  services: any[] = []
  testimonial: any[] = []
  bookings: any[] = []
  blogs: any[] = []

  constructor(
    private config: ConfigService,
    private visitor: VisitorService
  ){}


  ngOnInit() {
    this.getBlog()
    this.getMembers()
    this.getComments()
    this.getServices()
    this.getTestimonial()
    this.getBookings()
  }

  getMembers(){
    this.config.getMembers().subscribe((data: any)=>{
      this.members = data
    })
  }

  getComments(){
    this.visitor.getComments().subscribe((data: any)=>{
      this.comments = data
    })
  }

  getServices(){
    this.config.getServices().subscribe((data: any)=>{
      this.services = data
    })
  }

  getTestimonial(){
    this.config.getTestimonials().subscribe((data: any)=>{
      this.testimonial = data
    })
  }

  getBookings(){
    this.visitor.getBookings().subscribe((data: any)=>{
      this.bookings = data
    })
  }
  getBlog(){
    this.config.getBlogs().subscribe((data: any)=>{
      this.blogs = data
    })
  }



}
