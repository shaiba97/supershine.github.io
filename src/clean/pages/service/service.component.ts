import { Component } from '@angular/core';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent {

  items: any[] = []

  elements: any

  constructor(private config: ConfigService){}

  ngOnInit(){
    this.getItems()
  }

  getItems(){
    this.config.getServices().subscribe((data: any) =>{
      this.items = data
    })
  }

}
