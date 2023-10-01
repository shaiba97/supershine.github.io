import { Component } from '@angular/core';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent {

  items: any[] = []

  elements: any

  constructor(private config: ConfigService){}

  ngOnInit(){
    this.getItems()
  }

  getItems(){
    this.config.getBlogs().subscribe((data: any) =>{
      this.elements = data
      if (this.elements.length > 6) {
        for (let index = 0; index > 7; index++) {
          const element = this.elements[index];
          this.items = element
        }
      }else{
        this.items = this.elements
      }



    })
  }

}
