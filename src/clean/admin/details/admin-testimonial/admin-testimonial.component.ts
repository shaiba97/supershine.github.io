import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-admin-testimonial',
  templateUrl: './admin-testimonial.component.html',
  styleUrls: ['./admin-testimonial.component.scss']
})
export class AdminTestimonialComponent {

before: any
beforeUrl: any
after: any
afterUrl: any
errors!: any[]
data!: any
id: any = ''
items!: any

constructor(private config: ConfigService, private activatedRoute: ActivatedRoute){}

  ngOnInit(){
    this.id = this.activatedRoute.snapshot.params['_id']
    this.getItems()
  }

  getItems(){
    this.config.getTestimonial(this.id).subscribe((data: any)=>{
      this.items = data
    })
  }

  beforeImage(event: any){
    this.before = event.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(this.before);
    reader.onload = () => {
      this.beforeUrl = reader.result;
    };


  }

  afterImage(event: any){
    this.after = event.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(this.after);
    reader.onload = () => {
      this.afterUrl = reader.result;
    };

  }


  postRequest(){
    const before = document.querySelector("#before");
    const after = document.querySelector("#after");


    const formData = new FormData()
    formData.append('before', this.before)
    formData.append('after', this.after)
    this.config.updateTestimonial(this.id, formData).subscribe((res: any) => {
      console.log(res);

      this.data = res

      if(this.data !== undefined && typeof this.data !== 'object'){
        this.errors = res
        for(let error of this.errors){
          if (error.path) {
           if(error.path === 'all') {
             before!.classList.add("is-invalid")
             after!.classList.add("is-invalid")
           }
           if(error.path === before!.id) before!.classList.add("is-invalid")
           if(error.path === after!.id) after!.classList.add("is-invalid")
          }
         }
      }

      const toast = document.querySelector<HTMLElement>("#toast");
      toast!.style.display = "block";

      setTimeout(() => {
        toast!.style.display = "none";
      }, 3000);

    })
  }


  delete(event: any){
    const errors = document.querySelector<HTMLElement>("#errors")
    event.target.classList.remove("is-invalid")
    if (errors !== null) {
      errors!.style.display = "none"
    }
  }

}
