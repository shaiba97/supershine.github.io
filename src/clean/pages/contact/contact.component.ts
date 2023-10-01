import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VisitorService } from 'src/services/visitor/visitor.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  items = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    contact: new FormControl(''),
    comment: new FormControl(''),
  })

  errors!: any[]
  data!: any

    constructor(private visitor: VisitorService){}

    ngOnInit(){}


    postRequest(){
      const first_name = document.querySelector("#first_name");
      const last_name = document.querySelector("#last_name");
      const contact = document.querySelector("#contact");
      const comment = document.querySelector("#comment");

      this.visitor.postComment(this.items.value).subscribe((res: any) => {

        this.data = res

        if(!this.data.insertedId){
          this.errors = res
          for(let error of this.errors){
            if (error.path) {
             if(error.path === 'all') {
               first_name!.classList.add("is-invalid")
               last_name!.classList.add("is-invalid")
               contact!.classList.add("is-invalid")
               comment!.classList.add("is-invalid")
             }
             if(error.path === first_name!.id) first_name!.classList.add("is-invalid")
             if(error.path === last_name!.id) last_name!.classList.add("is-invalid")
             if(error.path === contact!.id) contact!.classList.add("is-invalid")
             if(error.path === comment!.id) comment!.classList.add("is-invalid")
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

}
