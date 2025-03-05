import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/User';
import { Activity } from '../../models/routine';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-routines-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './routines-list.component.html',
})
export class RoutinesListComponent {
  @Input() isFilter: boolean = false;
  @Output() activitiesRoutine = new EventEmitter<Activity[]>();
  @Input() userInformation: User = {
    id: '',
    username: '',
    email: '',
    routines: [],
    accessToken: '',
  };

  //send activities to the home component
  sendActivitiesRoutineHandler(activities: Activity[]) {
    this.activitiesRoutine.emit(activities);
  }
}
