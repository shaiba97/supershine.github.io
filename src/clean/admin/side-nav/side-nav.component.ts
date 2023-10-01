import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  id: any = ''

  constructor (private activatedRoute: ActivatedRoute){}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['_id']
  }

  detectLinks(event: any){
    const lis = document.querySelectorAll(".lists li")
    const spans = document.querySelectorAll(".lists li a span")

    spans.forEach(span =>{
      span.classList.remove("detect")
    })

    if(!event.target.classList.contains("detect")){
      event.target.classList.add("detect")
    }
  }


}
