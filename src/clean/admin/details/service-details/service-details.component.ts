import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent {

  items = new FormGroup({
    service: new FormControl(''),
    desc: new FormControl(''),
  })

  errors!: any[]
  data!: any
  id: any = ''
  item: any = {}

  service!: any
  desc!: any

  constructor(private config: ConfigService, private activatedRoute: ActivatedRoute){}

  ngOnInit(){
    this.id = this.activatedRoute.snapshot.params['_id']
    this.getItem()
  }

    getItem(){
      this.config.getService(this.id).subscribe((data: any)=>{
        this.item = data
      })
    }



    postRequest(){
      const service = document.querySelector("#service");
      const desc = document.querySelector("#desc");

      if (this.items.controls.service.value === '') {
        this.service = this.item.service
      }else if(this.items.controls.service.value !== this.item.service){
        this.service = this.items.controls.service.value
      }
      if (this.items.controls.desc.value === '') {
        this.desc = this.item.desc
      }else if (this.items.controls.desc.value !== this.item.desc){
        this.desc = this.items.controls.desc.value
      }

      const items = {
        service: this.service,
        desc: this.desc,
      }


      this.config.updateService(this.id, items).subscribe((res: any) => {

        this.data = res

        if(!this.data === undefined) {
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
          this.getItem()
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
