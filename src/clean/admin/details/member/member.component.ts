import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent {
  item: any = {}

  items = new FormGroup({
    first_name: <any> new FormControl(''),
    last_name: <any> new FormControl(''),
    contact: <any> new FormControl(''),
    position: <any> new FormControl(''),
    comment: <any> new FormControl(''),
  })

  first_name: any
  last_name: any
  contact: any
  position: any
  comment: any

  image: any
  imageUrl: any
  errors: any[] = []
  data!: any
  id: any = ''


    constructor(private config: ConfigService, private activatedRoute: ActivatedRoute){}

    ngOnInit(){
      this.id = this.activatedRoute.snapshot.params['_id']
      this.getItem()
    }

    onChangeImage(event: any){
      this.image = event.target.files[0]
      const reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };

      console.log(this.image);
      const formData = new FormData()
      formData.append('image', this.image)
    }

    getItem(){
    this.config.getMember(this.id).subscribe((data: any)=>{
      this.item = data;
    })
    }


    postRequest(){
      const image = document.querySelector("#image")
      const first_name = document.querySelector("#first_name");
      const last_name = document.querySelector("#last_name");
      const contact = document.querySelector("#contact");
      const position = document.querySelector("#position");
      const comment = document.querySelector("#comment");

      if(this.items.controls.first_name.untouched || !this.items.controls.first_name.dirty){
        this.first_name = this.item.first_name;
      }else if(this.items.controls.first_name.value !== this.item.first_name){
        this.first_name = this.items.controls.first_name.value
      }
      if(this.items.controls.last_name.untouched || !this.items.controls.last_name.dirty){
        this.last_name = this.item.last_name;
      }else if(this.items.controls.last_name.value !== this.item.last_name ){
        this.last_name = this.items.controls.last_name.value
      }
      if(this.items.controls.contact.untouched || !this.items.controls.contact.dirty){
        this.contact = this.item.contact
      }else if(this.items.controls.contact.value !== this.item.contact){
        this.contact = this.items.controls.contact.value
      }
      if(this.items.controls.position.untouched || !this.items.controls.position.dirty){
        this.position = this.item.position;
      }else if(this.items.controls.position.value !== this.item.position ){
        this.position = this.items.controls.position.value
      }
      if(this.items.controls.comment.untouched || !this.items.controls.comment.dirty){
        this.comment = this.item.comment;
      }else if(this.items.controls.comment.value !== this.item.comment ){
        this.comment = this.items.controls.comment.value
      }

      const formData = new FormData()
      formData.append('first_name', this.first_name)
      formData.append('last_name', this.last_name)
      formData.append('contact', this.contact)
      formData.append('position', this.position)
      formData.append('comment', this.comment)
      formData.append('image', this.image)


      this.config.updateMember(this.id, formData).subscribe((res: any) => {

        this.data = res
        if(this.data !== 'undefined'){

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
