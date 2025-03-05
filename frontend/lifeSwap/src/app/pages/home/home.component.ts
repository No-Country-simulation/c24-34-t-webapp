import { Component, Input } from '@angular/core';
import {Activity, Routine} from '../../models/routine';
import { BtnDisplayList } from '../../components/btn-display-list/btn-display-list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { get_icons } from '../../models/get_icons';
import { Router, RouterLink } from '@angular/router';
import { FilterComponent } from '../../components/filter/filter.component';
import {RequestStatus} from '../../models/request-status.model';
import {Dialog} from '@angular/cdk/dialog';
import {ModelMessagesComponent} from '../../components/model-messages/model-messages.component';
import {FormErrorMessageComponent} from '../../components/form-error-message/form-error-message.component';
import {Color_btn} from '../../models/color_btn';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-home',
  imports: [
    BtnDisplayList,
    FontAwesomeModule,
    TitleCasePipe,
    CdkAccordionModule,
    CommonModule,
    FilterComponent,
    FormErrorMessageComponent,
    RouterLink,
  ],
  standalone: true,
  templateUrl: './home.component.html',
})
export class HomeComponent {
  //user activities are input when send from the filter.
  @Input() activities: Activity[] = [];
  general_icons = get_icons;
  status: RequestStatus = 'init';
  colorBtn = Color_btn;
  userInformation:User =
    {
      id:'',
      username:'',
      email:'',
      routines: [],
      accessToken:'',
    }
  ;

  constructor(
    private dialog: Dialog,
    private router:Router,
    private authService:AuthService
  ) {}

  ngOnInit() {
    this.getUserInformation();
  }

  getUserInformation() {
    //set status to loading while waiting for the backend response
    this.status='loading';
    //open a dialog with a message about the pending status
    this.openDialog();

    this.authService.verifyToken().subscribe({
      next:(result)=> {
        this.status = 'success';
        this.dialog.closeAll();
        this.userInformation = result;
      },
      error:(err)=> {
        this.dialog.closeAll();
        if (err.status === 404){
          //set status to notFound when a 404 error occurs
          this.status = "notFound"
          //open a dialog with a message about the 404 error
          this.openDialog();
          //navigate to the login component when there is a 404 error
          this.router.navigate(['/login']);
        }
      }
    });

  }
  //open a dialog with a message based on the backend status
  openDialog(){
    this.dialog.open(ModelMessagesComponent, {
      data: {
        status: this.status
      },
      minWidth: '320px',
      backdropClass: 'bg-gray-50/90',
      disableClose: true
    })
  }

  showRoutineActivities(routine:Routine){
    this.activities = routine.activities;
    console.log('activities',routine.activities)
  }
  //activities when the user use the filter
  setActivitiesFiltered(activities: Activity[]) {
    this.activities = activities;
  }
}
