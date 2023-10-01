import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { ConfigService } from 'src/services/config/config.service';
@Component({
  selector: 'app-new-member',
  templateUrl: './new-member.component.html',
  styleUrls: ['./new-member.component.scss']
})

export class NewMemberComponent {

items = new FormGroup({
  first_name: <any> new FormControl(''),
  last_name: <any> new FormControl(''),
  contact: <any> new FormControl(''),
  position: <any> new FormControl(''),
  comment: <any> new FormControl(''),
})

image: any
imageUrl: any
errors!: any[]
data!: any

  constructor(private config: ConfigService){}

  ngOnInit(){}

  onChangeImage(event: any){
    this.image = event.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(this.image);
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
  }


  postRequest(){
    const image = document.querySelector("#image")
    const first_name = document.querySelector("#first_name");
    const last_name = document.querySelector("#last_name");
    const contact = document.querySelector("#contact");
    const position = document.querySelector("#position");
    const comment = document.querySelector("#comment");


    const formData = new FormData()
    formData.append('first_name', this.items.controls.first_name.value)
    formData.append('last_name', this.items.controls.last_name.value)
    formData.append('contact', this.items.controls.contact.value)
    formData.append('position', this.items.controls.position.value)
    formData.append('comment', this.items.controls.comment.value)
    formData.append('image', this.image)
    this.config.postMember(formData).subscribe((res: any) => {
      this.data = res

      if(!this.data.insertedId){
        this.errors = res
        for(let error of this.errors){
          if (error.path) {
           if(error.path === 'all') {
             first_name!.classList.add("is-invalid")
             last_name!.classList.add("is-invalid")
             contact!.classList.add("is-invalid")
             position!.classList.add("is-invalid")
             comment!.classList.add("is-invalid")
             image!.classList.add("is-invalid")
           }
           if(error.path === first_name!.id) first_name!.classList.add("is-invalid")
           if(error.path === last_name!.id) last_name!.classList.add("is-invalid")
           if(error.path === contact!.id) contact!.classList.add("is-invalid")
           if(error.path === position!.id) position!.classList.add("is-invalid")
           if(error.path === comment!.id) comment!.classList.add("is-invalid")
           if(error.path === image!.id) image!.classList.add("is-invalid")
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
