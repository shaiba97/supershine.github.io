import { Component } from '@angular/core';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent {
  items!: any[]

  searchText!: any

  first_name!: any
  last_name!: any
  contact!: any
  position!: any

  constructor(private configRequest: ConfigService){}

  ngOnInit(){
    this.getItems()
  }

  getItems(){
    this.configRequest.getMembers().subscribe((data: any)=>{
      this.items = data
    })
  }

  deleteRequest(id: any){
    this.configRequest.deleteMember(id).subscribe((res: any)=>{
      this.getItems()
    })
  }

  searchMethod(event: any){
    this.items.map( item => {
      if(event.key !== ''){
        if(item.first_name.match(event.key) || item.last_name.match(event.key) || item.contact.match(event.key) || item.position.match(event.key)){
          const searched = `
          <td>${item.first_name}</td>
          <td>${item.last_name}</td>
          <td>${item.contact}</td>
          <td>${item.position}</td>
          `
          console.log(searched);

        }
      }
    })
  }


}
