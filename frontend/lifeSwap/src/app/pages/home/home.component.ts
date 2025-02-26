import { Component } from '@angular/core';
import { RoutinesService } from '../../services/routines.service';
import { Activity } from '../../models/routine';
import { BtnDisplayList } from '../../components/btn-display-list/btn-display-list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [BtnDisplayList, FontAwesomeModule, TitleCasePipe],
  standalone: true,
  templateUrl: './home.component.html',
})
export class HomeComponent {
  activities: Activity[] = [];
  faAngleDown = faAngleDown;

  constructor(private routineService: RoutinesService) {}

  ngOnInit() {
    this.getRoutines();
  }

  getRoutines() {
    return this.routineService.getRoutinesByUser().subscribe((routine) => {
      if (routine.length > 0) {
        routine.forEach((routine) => {
          /*TODO esto es para probar el render, la llamada real es de
          acuerdo al user*/
          if (routine.id === '13c9c489-99e6-4c75-8099-2b1729f0fdde') {
            this.activities = routine.activities;
          }
        });
      }
    });
  }
}
