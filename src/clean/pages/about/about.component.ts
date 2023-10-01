import { Component } from '@angular/core';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  items: any[] = []

  elements!: any[]

  constructor(private config: ConfigService){}

  ngOnInit(){
    this.getItems()
  }

  getItems(){
    this.config.getMembers().subscribe((data: any)=>{
      this.elements = data
      if (this.elements.length > 3) {
        this.items = this.elements.slice(0,3)
      }
    })
  }

}
