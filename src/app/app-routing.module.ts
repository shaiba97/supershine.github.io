import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from 'src/clean/admin/account/account.component';
import { AdminContactComponent } from 'src/clean/admin/admin-contact/admin-contact.component';
import { AdminLoginComponent } from 'src/clean/admin/admin-login/admin-login.component';
import { AdminPasswordComponent } from 'src/clean/admin/admin-password/admin-password.component';
import { BookingComponent } from 'src/clean/admin/booking/booking.component';
import { BookingsComponent } from 'src/clean/admin/bookings/bookings.component';
import { DashboardComponent } from 'src/clean/admin/dashboard/dashboard.component';
import { AdminBlogComponent } from 'src/clean/admin/details/admin-blog/admin-blog.component';
import { AdminTestimonialComponent } from 'src/clean/admin/details/admin-testimonial/admin-testimonial.component';
import { CommentComponent } from 'src/clean/admin/details/comment/comment.component';
import { MemberComponent } from 'src/clean/admin/details/member/member.component';
import { ServiceDetailsComponent } from 'src/clean/admin/details/service-details/service-details.component';
import { AdminBlogsComponent } from 'src/clean/admin/elements/admin-blogs/admin-blogs.component';
import { AdminTestimonialsComponent } from 'src/clean/admin/elements/admin-testimonials/admin-testimonials.component';
import { CommentsComponent } from 'src/clean/admin/elements/comments/comments.component';
import { MembersComponent } from 'src/clean/admin/elements/members/members.component';
import { ServicesComponent } from 'src/clean/admin/elements/services/services.component';
import { deActivateGuard } from 'src/clean/admin/gaurds/can-deActivate/de-activate.guard';
import { canActivateGuard } from 'src/clean/admin/gaurds/canActivate/can-activate.guard';
import { GetConfigComponent } from 'src/clean/admin/get-config/get-config.component';
import { MessageComponent } from 'src/clean/admin/message/message.component';
import { NavComponent } from 'src/clean/admin/nav/nav.component';
import { NewBlogComponent } from 'src/clean/admin/upload-config/new-blog/new-blog.component';
import { NewMemberComponent } from 'src/clean/admin/upload-config/new-member/new-member.component';
import { NewServiceComponent } from 'src/clean/admin/upload-config/new-service/new-service.component';
import { NewTestimonialComponent } from 'src/clean/admin/upload-config/new-testimonial/new-testimonial.component';
import { UploadComponent } from 'src/clean/admin/upload/upload.component';
import { AboutComponent } from 'src/clean/pages/about/about.component';
import { BlogComponent } from 'src/clean/pages/blog/blog.component';
import { BlogsComponent } from 'src/clean/pages/blogs/blogs.component';
import { BookComponent } from 'src/clean/pages/book/book.component';
import { ContactComponent } from 'src/clean/pages/contact/contact.component';
import { HomeComponent } from 'src/clean/pages/home/home.component';
import { MainComponent } from 'src/clean/pages/main/main.component';
import { ReviewComponent } from 'src/clean/pages/review/review.component';
import { ServiceComponent } from 'src/clean/pages/service/service.component';
import { TestimonialComponent } from 'src/clean/pages/testimonial/testimonial.component';
import { TestmonialsComponent } from 'src/clean/pages/testmonials/testmonials.component'

const routes: Routes = [

  {path: '', redirectTo: 'clean', pathMatch: 'full'},


  {path: 'clean', component: MainComponent, children:[
    {path: '', redirectTo: 'home', pathMatch: 'full'},

    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'service', component: ServiceComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'blogs', component: BlogsComponent},
    {path: 'book', component: BookComponent},
    {path: 'review', component: ReviewComponent},
    {path: 'testimonials', component: TestmonialsComponent},
    {path: 'blogs/blog/:_id', component: BlogComponent},
    {path: 'testimonials/testimonial/:_id', component: TestimonialComponent},
    {path: '**', redirectTo:'error', pathMatch: 'full'},

  ]},

  {path: 'admin/clean-admin-login', component: AdminLoginComponent},

  {path: 'admin/:_id', component: NavComponent, children:[
    {path: '**', redirectTo:'error', pathMatch: 'full'},
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'bookings', component: BookingsComponent},
    {path: 'booking', component: BookingComponent},
    {path: 'account/:_id', component: AccountComponent},
    {path: 'admin-contact/:_id', component: AdminContactComponent},
    {path: 'admin-password/:_id', component: AdminPasswordComponent},
    {path: 'upload', component: UploadComponent, children:[
      {path: '', redirectTo: 'new-member', pathMatch: 'full'},
      {path: 'new-member', component: NewMemberComponent},
      {path: 'new-service', component: NewServiceComponent},
      {path: 'new-testimonial', component: NewTestimonialComponent},
      {path: 'new-blog', component: NewBlogComponent},
    ]},
    {path: 'get-config', component: GetConfigComponent, children:[
      {path: '', redirectTo: 'members', pathMatch: 'full'},
      {path: 'members', component: MembersComponent},
      {path: 'services', component: ServicesComponent},
      {path: 'testimonials', component: AdminTestimonialsComponent},
      {path: 'blogs', component: AdminBlogsComponent},
      {path: 'comments', component: CommentsComponent},
    ]},

    {path: 'get-config/members/member/:_id', component: MemberComponent},
    {path: 'get-config/comments/comment/:_id', component: CommentComponent},
    {path: 'get-config/services/service/:_id', component: ServiceDetailsComponent},
    {path: 'get-config/testimonials/testimonial/:_id', component: AdminTestimonialComponent},
    {path: 'get-config/blogs/blog/:_id', component: AdminBlogComponent},
    {path: 'bookings/booking/:_id', component: BookingComponent},


  ]},



  {path: 'error', component: MessageComponent},

  {path: '**', redirectTo:'error', pathMatch: 'full'},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
