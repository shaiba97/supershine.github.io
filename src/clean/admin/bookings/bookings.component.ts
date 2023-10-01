import { Component } from '@angular/core';
import { VisitorService } from 'src/services/visitor/visitor.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent {

  items!: any[]

  searchText!: any

  first_name!: any
  last_name!: any
  contact!: any
  position!: any

  constructor(private visitorRequest: VisitorService){}

  ngOnInit(){
    this.getItems()
  }

  getItems(){
    this.visitorRequest.getBookings().subscribe((data: any)=>{
      this.items = data
    })
  }

  deleteRequest(id: any){
    this.visitorRequest.deleteBooking(id).subscribe((res: any)=>{
      this.getItems()
    })
  }

  searchMethod(event: any){
  }

}
