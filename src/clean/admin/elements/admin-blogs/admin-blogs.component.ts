import { Component } from '@angular/core';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.scss']
})
export class AdminBlogsComponent {

  items!: any[]

  searchText!: any



  constructor(private configRequest: ConfigService){}

  ngOnInit(){
    this.getItems()
  }

  getItems(){
    this.configRequest.getBlogs().subscribe((data: any)=>{
      this.items = data
    })
  }

  deleteRequest(id: any){
    this.configRequest.deleteBlog(id).subscribe((res: any)=>{
      this.getItems()
    })
  }

  searchMethod(event: any){
  }

}
