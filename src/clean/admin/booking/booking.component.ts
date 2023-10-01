import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VisitorService } from 'src/services/visitor/visitor.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {

  item: any = {}
  id: any =''

  constructor(private visitorRequest: VisitorService, private activatedRoute: ActivatedRoute){}

  ngOnInit(){
    this.id = this.activatedRoute.snapshot.params['_id']
    this.getItem()
  }

  getItem(){
    this.visitorRequest.getBooking(this.id).subscribe((data: any)=>{
      this.item = data
    })
  }

}
