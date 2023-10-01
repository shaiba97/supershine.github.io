import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigService } from 'src/services/config/config.service';
import { VisitorService } from 'src/services/visitor/visitor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  items = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    contact: new FormControl(''),
    building: new FormControl(''),
    floor: new FormControl(''),
    tower: new FormControl(''),
    landmark: new FormControl(''),
  })

  errors!: any[]
  data!: any

  blogs: any[] = []
  testimonials: any[] = []
  blogElements: any[] = []
  testimonialElements: any[] = []

    constructor(private visitor: VisitorService, private config: ConfigService){}

    ngOnInit(){
      this.getBlogs()
      this.getTestimonials()
    }


    postRequest(){
      const first_name = document.querySelector("#first_name");
      const last_name = document.querySelector("#last_name");
      const contact = document.querySelector("#contact");
      const building = document.querySelector("#building");
      const floor = document.querySelector("#floor");
      const tower = document.querySelector("#tower");
      const landmark = document.querySelector("#landmark");

      this.visitor.postBooking(this.items.value).subscribe((res: any) => {
        console.log(res);

        this.data = res

        if(!this.data.insertedId){
          this.errors = res
          for(let error of this.errors){
            if (error.path) {
             if(error.path === 'all') {
               first_name!.classList.add("is-invalid")
               last_name!.classList.add("is-invalid")
               contact!.classList.add("is-invalid")
               building!.classList.add("is-invalid")
               floor!.classList.add("is-invalid")
               tower!.classList.add("is-invalid")
               landmark!.classList.add("is-invalid")
             }
             if(error.path === first_name!.id) first_name!.classList.add("is-invalid")
             if(error.path === last_name!.id) last_name!.classList.add("is-invalid")
             if(error.path === contact!.id) contact!.classList.add("is-invalid")
             if(error.path === building!.id) building!.classList.add("is-invalid")
             if(error.path === floor!.id) floor!.classList.add("is-invalid")
             if(error.path === tower!.id) tower!.classList.add("is-invalid")
             if(error.path === landmark!.id) landmark!.classList.add("is-invalid")
            }
           }
        }else{
          this.items.reset()
        }

      })




    }

    delete(event: any){
      const errors = document.querySelector<HTMLElement>("#errors")
      event.target.classList.remove("is-invalid")
      if (errors !== null) {
        errors!.style.display = "none"
      }
    }


    getBlogs(){
      this.config.getBlogs().subscribe((data: any)=>{
        this.blogElements = data
        if(this.blogElements.length > 6){
          this.blogs = this.blogElements.slice(0,6)
        }else{
          this.blogs = this.blogElements
        }
      })
    }

    getTestimonials(){
      this.config.getTestimonials().subscribe((data: any)=>{
        this.testimonialElements = data
        if(this.testimonialElements.length > 4){
          this.testimonials = this.testimonialElements.slice(0,4)
        }else{
          this.testimonials = this.testimonialElements
        }
      })
    }

}
