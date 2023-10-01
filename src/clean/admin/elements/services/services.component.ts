import { Component } from '@angular/core';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {

  items!: any[]

  searchText!: any


  constructor(private configRequest: ConfigService){}

  ngOnInit(){
    this.getItems()
  }

  getItems(){
    this.configRequest.getServices().subscribe((data: any)=>{
      this.items = data
    })
  }

  deleteRequest(id: any){
    this.configRequest.deleteService(id).subscribe((res: any)=>{
      this.getItems()
    })
  }

  searchMethod(event: any){
  }

}
