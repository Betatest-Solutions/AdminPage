import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule} from "angular2-flash-messages";
import { FlashMessagesService } from "angular2-flash-messages";
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import {ValidateService} from "./services/validate.service";
import {AuthService} from "./services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import  { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { StatModule } from "./shared/modules/stat/stat.module";
import { TimelineComponent } from "./components/dashboard/components";
import { NotificationComponent } from "./components/dashboard/components";
import { ChatComponent } from "./components/dashboard/components";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
} from '@angular/animations';
import { AlertComponent } from './bs-component/components/alert/alert.component';

const appRoutes : Routes = [
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path:'register',component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component:DashboardComponent},
  {path: 'profile', component: ProfileComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    TimelineComponent,
    NotificationComponent,
    ChatComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    FlashMessagesModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbCarouselModule,
    NgbAlertModule,
    StatModule
  ],
  providers: [ValidateService,FlashMessagesService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
