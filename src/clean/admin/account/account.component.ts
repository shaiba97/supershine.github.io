import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/services/admin/admin.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  first_name: any
  last_name: any

  items = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
  })

  image!: any
  imageUrl!: any
  id: any = ''

  item: any = {}
  data: any;
  errors: any;

  constructor(private admin: AdminService, private activatedRoute: ActivatedRoute ){}



  ngOnInit(){
    this.id = this.activatedRoute.snapshot.params['_id']
    this.getItems()
  }

  getItems(){
    this.admin.getAdmin(this.id).subscribe((data: any) => {
      this.item = data
    })
  }

  onChangeImage(event: any){
    this.image = event.target.files[0]

    const reader = new FileReader();
    reader.readAsDataURL(this.image);
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
    const formData = new FormData()
    formData.append('image', this.image)
    this.admin.updateImage(this.id, formData).subscribe((data: any)=>{
      this.getItems()
    })
  }


  updateItems(){

    const first_name = document.querySelector("#first_name")
    const last_name = document.querySelector("#last_name");

    if (this.items.controls.first_name.value === '') {
      this.first_name = this.item.first_name
    }else if(this.first_name !== this.item.first_name){
      this.first_name = this.items.controls.first_name.value
    }

    if (this.items.controls.last_name.value === '') {
      this.last_name = this.item.last_name
    }else if(this.last_name !== this.item.last_name){
      this.last_name = this.items.controls.last_name.value
    }

    const items = {
      'first_name': this.first_name,
      'last_name': this.last_name,
    }


    this.admin.updateNames(this.id, items).subscribe((res: any) => {

      this.data = res
      if (res.modifiedCount > 0) {
        return
      }


      if(this.data !== undefined ) {
        this.errors = res

        if(typeof this.errors !== "object") {
          for(let error of this.errors){
            if (error.path) {
             if(error.path === 'all') {
               first_name!.classList.add("is-invalid")
               last_name!.classList.add("is-invalid")
             }
             if(error.path === first_name!.id) first_name!.classList.add("is-invalid")
             if(error.path === last_name!.id) last_name!.classList.add("is-invalid")
            }
           }
        }
      }else{
        this.getItems()
      }
    })
  }

}
