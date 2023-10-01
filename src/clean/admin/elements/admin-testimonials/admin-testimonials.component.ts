import { Component } from '@angular/core';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-admin-testimonials',
  templateUrl: './admin-testimonials.component.html',
  styleUrls: ['./admin-testimonials.component.scss']
})
export class AdminTestimonialsComponent {

  items!: any

  searchText!: any


  constructor(private configRequest: ConfigService){}

  ngOnInit(){
    this.getItems()
  }

  getItems(){
    this.configRequest.getTestimonials().subscribe((data: any)=>{
      this.items = data
    })
  }

  deleteRequest(id: any){
    this.configRequest.deleteTestimonial(id).subscribe((res: any)=>{
      this.getItems()
    })
  }

  searchMethod(event: any){
  }

}
