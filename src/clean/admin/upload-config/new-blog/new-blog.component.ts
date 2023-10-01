import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.scss']
})
export class NewBlogComponent {

  items = new FormGroup({
    title: <any> new FormControl(''),
    blog: <any> new FormControl(''),
  })

  image: any
  imageUrl: any
  errors!: any[]
  data!: any

    constructor(private config: ConfigService){}

    ngOnInit(){}

    onChangeImage(event: any){
      this.image = event.target.files[0]
      const reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    }


    postRequest(){
      const image = document.querySelector("#image")
      const title = document.querySelector("#title");
      const blog = document.querySelector("#blog");


      const formData = new FormData()
      formData.append('title', this.items.controls.title.value)
      formData.append('blog', this.items.controls.blog.value)
      formData.append('image', this.image)
      this.config.postBlog(formData).subscribe((res: any) => {
        console.log(res);

        this.data = res

        if(!this.data.insertedId){
          this.errors = res
          for(let error of this.errors){
            if (error.path) {
             if(error.path === 'all') {
               title!.classList.add("is-invalid")
               blog!.classList.add("is-invalid")
               image!.classList.add("is-invalid")
             }
             if(error.path === title!.id) title!.classList.add("is-invalid")
             if(error.path === blog!.id) blog!.classList.add("is-invalid")
             if(error.path === image!.id) image!.classList.add("is-invalid")
            }
           }
        }else{
          this.items.reset()
        }

      })




    }

    delete(event: any){
      const errors = document.querySelector<HTMLElement>("#errors")
      event.target.classList.remove("is-invalid")
      if (errors !== null) {
        errors!.style.display = "none"
      }
    }

}
