import { Component } from '@angular/core';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-new-testimonial',
  templateUrl: './new-testimonial.component.html',
  styleUrls: ['./new-testimonial.component.scss']
})
export class NewTestimonialComponent {

before: any
beforeUrl: any
after: any
afterUrl: any
errors!: any[]
data!: any

  constructor(private config: ConfigService){}

  ngOnInit(){}

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
    this.config.postTestimonial(formData).subscribe((res: any) => {
      this.data = res

      if(!this.data.insertedId){
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
