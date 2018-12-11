import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  errorMessage: string;
  user: any;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile =>
      {this.user = profile.user},
     error => {this.errorMessage = <any>error,
     console.log('inside profile page ' + this.user)});
  }

}
