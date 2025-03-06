import { Component, Input } from '@angular/core';
import { Activity } from '../../models/routine';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FilterComponent } from '../../components/filter/filter.component';
import { RequestStatus } from '../../models/request-status.model';
import { Dialog } from '@angular/cdk/dialog';
import { ModelMessagesComponent } from '../../components/model-messages/model-messages.component';
import { FormErrorMessageComponent } from '../../components/form-error-message/form-error-message.component';
import { Color_btn } from '../../models/color_btn';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { RoutinesListComponent } from '../../components/routines-list/routines-list.component';
import { ActivitiesListComponent } from '../../components/activities-list/activities-list.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FilterComponent,
    FormErrorMessageComponent,
    RouterLink,
    RoutinesListComponent,
    ActivitiesListComponent,
  ],
  standalone: true,
  templateUrl: './home.component.html',
})
export class HomeComponent {
  //user activities are input when send from the filter.
  @Input() activities: Activity[] = [];
  status: RequestStatus = 'init';
  colorBtn = Color_btn;
  isFilter: boolean = false;
  userInformation: User = {
    id: '',
    username: '',
    email: '',
    routines: [],
    accessToken: '',
    assignedRoutine:''
  };

  constructor(
    private dialog: Dialog,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getUserInformation();
  }

  getUserInformation() {
    //set status to loading while waiting for the backend response
    this.status = 'loading';
    //open a dialog with a message about the pending status
    this.openDialog();

    this.authService.verifyToken().subscribe({
      next: (result) => {
        this.status = 'success';
        this.dialog.closeAll();
        this.userInformation = result;
        //identify routine as assigned routine to allow managing the styles
        this.isARoutineAssigned();
      },
      error: (err) => {
        this.dialog.closeAll();
        if (err.status === 404) {
          //set status to notFound when a 404 error occurs
          this.status = 'notFound';
          //open a dialog with a message about the 404 error
          this.openDialog();
          //navigate to the login component when there is a 404 error
          this.router.navigate(['/login']);
        }
      },
    });
  }
  //open a dialog with a message based on the backend status
  openDialog() {
    this.dialog.open(ModelMessagesComponent, {
      data: {
        status: this.status,
      },
      minWidth: '320px',
      backdropClass: 'bg-gray-50/90',
      disableClose: true,
    });
  }
  isARoutineAssigned() {
    if (this.userInformation.assignedRoutine !== '') {
      this.userInformation.routines.forEach(routine => {
        routine.id === this.userInformation.assignedRoutine ?
          routine.isRoutineAssigned = true :
          routine.isRoutineAssigned = false;
      })
    }
  }

  //activities when the user use the filter
  setActivitiesFiltered(activities: Activity[]) {
    this.isFilter = true;
    this.activities = activities;
  }
  //activities when the user select a routine
  setActivities(activities: Activity[]) {
    this.isFilter = false;
    this.activities = activities;
    //get update routines
    this.getUserInformation();
  }
}
