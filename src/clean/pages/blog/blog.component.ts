import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {

  item: any = {}
  id: any = ''

  constructor(private config: ConfigService, private activatedRoute: ActivatedRoute){}

  ngOnInit(){
    this.id = this.activatedRoute.snapshot.params['_id']
    this.getBlogs()
  }

  getBlogs(){
    this.config.getBlog(this.id).subscribe((data: any) =>{
      this.item = data
    })
  }

}
