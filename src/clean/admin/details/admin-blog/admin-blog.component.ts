import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent {


  items = new FormGroup({
    title: <any> new FormControl(''),
    blog: <any> new FormControl(''),
  })

  title: any = ''
  blog: any = ''

  image: any
  imageUrl: any
  errors!: any[]
  data!: any
  id: any = ''
  item: any = {}

    constructor(private config: ConfigService, private activatedRoute: ActivatedRoute){}

    ngOnInit(){
      this.id = this.activatedRoute.snapshot.params['_id']
      this.getItems()
    }

    getItems(){
      this.config.getBlog(this.id).subscribe((data: any) => {
        this.item = data
      })
    }

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

      if(this.items.controls.title.untouched || !this.items.controls.title.dirty){
        this.title = this.item.title
      }else if(this.items.controls.title.value !== this.item.title){
        this.title = this.items.controls.title.value
      }

      if(this.items.controls.blog.untouched || !this.items.controls.blog.dirty){
        this.blog = this.item.blog
      }else if(this.items.controls.blog.value !== this.item.blog){
        this.blog = this.items.controls.blog.value
      }


      const formData = new FormData()
      formData.append('title', this.title)
      formData.append('blog', this.blog)
      formData.append('image', this.image)



      this.config.updateBlog(this.id, formData).subscribe((res: any) => {

        this.data = res
        if (res.modifiedCount > 0) {
          return
        }



        if(this.data !== undefined) {
          this.errors = res
          console.log(this.errors);

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
          this.getItems()
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
