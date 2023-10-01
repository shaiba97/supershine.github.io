import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/services/admin/admin.service';

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.scss']
})
export class AdminContactComponent {

  contact!: any

  items = new FormGroup({
    contact: new FormControl(''),
  })

  id: any = ''
  errors: any
  item: any = {}
  data: any

  constructor(private admin: AdminService, private activatedRoute: ActivatedRoute, private router: Router ){}



  ngOnInit(){
    this.id = this.activatedRoute.snapshot.params['_id']
    this.getItems()
  }


  getItems(){
    this.admin.getAdmin(this.id).subscribe((data: any) => {
      this.item = data
    })
  }

  updateItems(){

    const contact = document.querySelector("#contact")

    if (this.items.controls.contact.value === '') {
      this.contact = this.item.contact
    }else if(this.contact !== this.item.contact){
      this.contact = this.items.controls.contact.value
    }

    const items = {
      'contact': this.contact,
    }





    this.admin.updateContact(this.id, items).subscribe((res: any) => {

      this.data = res
      if (res.modifiedCount > 0) {
        this.router.navigateByUrl(`/admin/${this.id}/account/${this.id}`)
      }


      if(this.data !== undefined ) {
        this.errors = res

        if(typeof this.errors !== "object") {
          for(let error of this.errors){
            if (error.path) {
             if(error.path === 'all') {
               contact!.classList.add("is-invalid")
             }
             if(error.path === contact!.id) contact!.classList.add("is-invalid")
            }
           }
        }
      }else{
        this.data.length = 0
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


