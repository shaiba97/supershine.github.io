import { Component } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {


  constructor(){}

  ngOnInit() {}

  detectLinks(event: any){
    const links = document.querySelectorAll(".config ul li a")
    links.forEach(link=>{link.classList.remove("detect")})
    if(!event.target.classList.contains("detect")){
      event.target.classList.add("detect")
    }
  }
}
