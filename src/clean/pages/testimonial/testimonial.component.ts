import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent {

  item: any = {}
  id: any = ''

  constructor(private config: ConfigService, private activatedRoute: ActivatedRoute){}

  ngOnInit(){
    this.id = this.activatedRoute.snapshot.params['_id']
    this.getItems()
  }

  getItems(){
    this.config.getTestimonial(this.id).subscribe((data: any) =>{
      this.item = data
    })
  }

}
