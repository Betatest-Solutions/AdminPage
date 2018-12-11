import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {

  user: any;
  errorMessage: string;
  public alerts: Array<any> = [];
  public sliders: Array<any> = [];

  constructor(private authService: AuthService, private router: Router) {
    this.sliders.push(
      {
        imagePath: 'assets/images/slider1.jpg',
        label: 'label 1',
        text:
          'Slide 1 Text'
      },
      {
        imagePath: 'assets/images/slider2.jpg',
        label: 'label 2',
        text: 'Slide 2 Text'
      },
      {
        imagePath: 'assets/images/slider3.jpg',
        label: 'label 3',
        text:
          'Slide 3 Text'
      }
    );

    this.alerts.push(
      {
        id: 1,
        type: 'success',
        message: 'Type message here'
      },
      {
        id: 2,
        type: 'warning',
        message: 'Type message here'
      }
    );
  }

  ngOnInit() {
    this.authService.getDashboard().subscribe(dashboard => {
        this.user = dashboard.user;
        // console.log(this.user);
        // if(dashboard.user != undefined){
        //   this.router.navigate(['dashboard']);
        // }
        // else{
        //   this.router.navigate(['Home']);
        // }
    }
        ,error => {this.errorMessage = <any>error}

      );
  }

  public closeAlert(alert: any) {
    const index: any = this.alerts.indexOf(alert);
     this.alerts.splice(index, 1);
  }
}
