import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.scss']
})
export class NewServiceComponent {


  items = new FormGroup({
    service: new FormControl(''),
    desc: new FormControl(''),
  })

  errors!: any[]
  data!: any

    constructor(private config: ConfigService){}

    ngOnInit(){}



    postRequest(){
      const service = document.querySelector("#service");
      const desc = document.querySelector("#desc");

      this.config.postService(this.items.value).subscribe((res: any) => {
        this.data = res

        if(!this.data.insertedId){
          this.errors = res
          for(let error of this.errors){
            if (error.path) {
             if(error.path === 'all') {
               service!.classList.add("is-invalid")
               desc!.classList.add("is-invalid")
             }
             if(error.path === service!.id) service!.classList.add("is-invalid")
             if(error.path === desc!.id) desc!.classList.add("is-invalid")
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
