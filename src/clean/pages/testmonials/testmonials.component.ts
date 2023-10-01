import { Component } from '@angular/core';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-testmonials',
  templateUrl: './testmonials.component.html',
  styleUrls: ['./testmonials.component.scss']
})
export class TestmonialsComponent {


  items: any[] = []

  elements: any

  constructor(private config: ConfigService){}

  ngOnInit(){
    this.getItems()
  }

  getItems(){
    this.config.getTestimonials().subscribe((data: any) =>{
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


  showImage(event: any){
    const backgroud = document.querySelector<HTMLElement>("#backgroud-img")
    const show = document.querySelector<HTMLElement>("#show-img")
    backgroud!.style.display = "block";
    show!.setAttribute( 'src',event.target.src)
    console.log(event.target);
  }

  deletebackgroud(){
    const backgroud = document.querySelector<HTMLElement>("#backgroud-img")
    backgroud!.style.display = "none";
  }

}
