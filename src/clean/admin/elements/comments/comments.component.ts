import { Component } from '@angular/core';
import { VisitorService } from 'src/services/visitor/visitor.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {

  items!: any[]

  searchText!: any

  constructor(private visitor: VisitorService){}

  ngOnInit(){
    this.getItems()
  }

  getItems(){
    this.visitor.getComments().subscribe((data: any)=>{
      this.items = data
    })
  }

  deleteRequest(id: any){
    this.visitor.deleteComment(id).subscribe((res: any)=>{
      this.getItems()
    })
  }

  searchMethod(event: any){
  }


}
