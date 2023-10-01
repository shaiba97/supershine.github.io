import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from 'src/services/admin/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {

  items = new FormGroup({
    contact: new FormControl(''),
    password: new FormControl(''),
  })

  id: any = ''
  errors!: any[]
  success: any = {}
  item: any = []
  alphabet = /^[a-zA-Z]$/
  alphanumeric = /^[a-zA-Z0-9]$/
  numbers = /\d+/g
  email = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

  constructor(private admin: AdminService, private router: Router, private cookiesService: CookieService, private location: Location){}



  ngOnInit(){
    this.getItems()

    this.router.navigateByUrl("/admin/clean-admin-login", { replaceUrl: true })
  }


  getItems(){
    this.admin.getAdmins().subscribe((data: any)=>{
      this.item = data
    })
  }


  locationControl(){
    if (this.location) {
      console.log("Not Working");
    }
  }


  login(){


    const contact = document.querySelector("#contact")
    const password = document.querySelector("#password");

    if(this.items.controls.contact.value === '' && this.items.controls.contact.value === ''){
      contact!.classList.add("is-invalid");
      password!.classList.add("is-invalid");
      this.errors = [{ path: 'all', msg: 'All fields are required', type: 'required' }]
    }else if(this.items.controls.contact.value === ''){
      contact!.classList.add("is-invalid");
      this.errors =  [{ path: 'contact', msg: 'Contact is required!', type: 'required' }]
    }else if(this.items.controls.contact.value!.match(this.email) && this.items.controls.contact.value!.match(this.numbers)){
      contact!.classList.add("is-invalid");
      this.errors =  [{ path: 'contact', msg: 'Contact only email or phone number!', type: 'regex' }]
    }else if(this.items.controls.password.value === ''){
      password!.classList.add("is-invalid");
      this.errors =  [{ path: 'password', msg: 'Password is required!', type: 'required' }]
    }else if(this.items.controls.password.value!.match(this.alphanumeric)){
      password!.classList.add("is-invalid");
      this.errors =  [{ path: 'password', msg: 'Password only alphabet letter and numbers!', type: 'regex' }]
    }else{
      for(let item of this.item){
        if (this.items.controls.contact.value === item.contact && this.items.controls.password.value === item.password) {
          this.cookiesService.set('admin', this.item._id, 12/12/3000)
              if(this.cookiesService.get("admin")){
                this.router.navigateByUrl(`admin/${item._id}`)
              }
        }else{
          contact!.classList.add("is-invalid");
          password!.classList.add("is-invalid");
          this.errors =  [{ path: 'all', msg: 'Entries are invalid!', type: 'invalid' }]
        }
        }
      }

    }


  delete(event: any){
    const errors = document.querySelector<HTMLElement>("#errors")
    event.target.classList.remove("is-invalid")
    if (errors !== null) {
      errors!.style.display = "none"
    }
  }

}

