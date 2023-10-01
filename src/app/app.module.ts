import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from 'src/clean/pages/home/home.component';
import { AboutComponent } from 'src/clean/pages/about/about.component';
import { ServiceComponent } from 'src/clean/pages/service/service.component';
import { BlogComponent } from 'src/clean/pages/blog/blog.component';
import { BlogsComponent } from 'src/clean/pages/blogs/blogs.component';
import { BookComponent } from 'src/clean/pages/book/book.component';
import { ContactComponent } from 'src/clean/pages/contact/contact.component';
import { TestmonialsComponent } from 'src/clean/pages/testmonials/testmonials.component';
import { ReviewComponent } from 'src/clean/pages/review/review.component';
import { MainComponent } from 'src/clean/pages/main/main.component';
import { FooterComponent } from 'src/clean/pages/footer/footer.component';
import { BookingComponent } from 'src/clean/admin/booking/booking.component';
import { BookingsComponent } from 'src/clean/admin/bookings/bookings.component';
import { NavComponent } from 'src/clean/admin/nav/nav.component';
import { SideNavComponent } from 'src/clean/admin/side-nav/side-nav.component';
import { DashboardComponent } from 'src/clean/admin/dashboard/dashboard.component';
import { UploadComponent } from 'src/clean/admin/upload/upload.component';
import { GetConfigComponent } from 'src/clean/admin/get-config/get-config.component';
import { MenuNavComponent } from 'src/clean/admin/menu-nav/menu-nav.component';
import { NewMemberComponent } from 'src/clean/admin/upload-config/new-member/new-member.component';
import { NewServiceComponent } from 'src/clean/admin/upload-config/new-service/new-service.component';
import { NewTestimonialComponent } from 'src/clean/admin/upload-config/new-testimonial/new-testimonial.component';
import { NewBlogComponent } from 'src/clean/admin/upload-config/new-blog/new-blog.component';
import { MembersComponent } from 'src/clean/admin/elements/members/members.component';
import { ServicesComponent } from 'src/clean/admin/elements/services/services.component';
import { AdminBlogsComponent } from 'src/clean/admin/elements/admin-blogs/admin-blogs.component';
import { AdminTestimonialsComponent } from 'src/clean/admin/elements/admin-testimonials/admin-testimonials.component';
import { AccountComponent } from 'src/clean/admin/account/account.component';
import { ConfigService } from 'src/services/config/config.service';
import { VisitorService } from 'src/services/visitor/visitor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MemberComponent } from 'src/clean/admin/details/member/member.component';
import { AdminBlogComponent } from 'src/clean/admin/details/admin-blog/admin-blog.component';
import { AdminTestimonialComponent } from 'src/clean/admin/details/admin-testimonial/admin-testimonial.component';
import { AdminService } from 'src/services/admin/admin.service';
import { ServiceDetailsComponent } from 'src/clean/admin/details/service-details/service-details.component';
import { CommentsComponent } from 'src/clean/admin/elements/comments/comments.component';
import { CommentComponent } from 'src/clean/admin/details/comment/comment.component';
import { TestimonialComponent } from 'src/clean/pages/testimonial/testimonial.component';
import { AdminContactComponent } from 'src/clean/admin/admin-contact/admin-contact.component';
import { AdminPasswordComponent } from 'src/clean/admin/admin-password/admin-password.component';
import { AdminLoginComponent } from 'src/clean/admin/admin-login/admin-login.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ServiceComponent,
    BlogComponent,
    BlogsComponent,
    BookComponent,
    ContactComponent,
    TestmonialsComponent,
    ReviewComponent,
    MainComponent,
    FooterComponent,
    TestimonialComponent,

    BookingComponent,
    BookingsComponent,
    NavComponent,
    MenuNavComponent,
    SideNavComponent,
    DashboardComponent,
    UploadComponent,
    GetConfigComponent,

    NewMemberComponent,
    NewServiceComponent,
    NewTestimonialComponent,
    NewBlogComponent,
    MembersComponent,
    ServicesComponent,
    AdminBlogsComponent,
    AdminTestimonialsComponent,
    AccountComponent,
    AdminContactComponent,
    AdminPasswordComponent,
    AdminLoginComponent,

    MemberComponent,
    AdminBlogComponent,
    AdminTestimonialComponent,
    ServiceComponent,
    ServiceDetailsComponent,
    CommentsComponent,
    CommentComponent,

  ],
  imports: [
    // AppModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule, FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: AdminService, useValue: AdminService},
    AdminService,
    ConfigService,
    VisitorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
