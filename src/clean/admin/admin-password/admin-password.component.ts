import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/services/admin/admin.service';

@Component({
  selector: 'app-admin-password',
  templateUrl: './admin-password.component.html',
  styleUrls: ['./admin-password.component.scss']
})
export class AdminPasswordComponent {

  password: any = ''

  items = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
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

    const password = document.querySelector("#password")
    const confirmPassword = document.querySelector("#confirmPassword");

    if (this.items.controls.password.value === '') {
      this.password = this.item.password
    }else if(this.password !== this.item.password){
      this.password = this.items.controls.password.value
    }

    const items = {
      'password': this.password,
      'confirmPassword': this.items.controls.confirmPassword.value,
    }





    this.admin.updatePassword(this.id, items).subscribe((res: any) => {
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
               password!.classList.add("is-invalid")
               confirmPassword!.classList.add("is-invalid")
             }
             if(error.path === password!.id) password!.classList.add("is-invalid")
             if(error.path === confirmPassword!.id) confirmPassword!.classList.add("is-invalid")
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
