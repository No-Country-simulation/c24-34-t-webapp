import { Component } from '@angular/core';
import { RoutinesService } from '../../services/routines.service';
import { Activity } from '../../models/routine';
import { BtnDisplayList } from '../../components/btn-display-list/btn-display-list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { general_icons } from '../../models/icon_sub_categories';

@Component({
  selector: 'app-home',
  imports: [
    BtnDisplayList,
    FontAwesomeModule,
    TitleCasePipe,
    CdkAccordionModule,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './home.component.html',
})
export class HomeComponent {
  activities: Activity[] = [];
  general_icons = general_icons;

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
          if (routine.id === '42df941f-235b-40eb-9e46-4028fb48e7e0') {
            this.activities = routine.activities;
          }
        });
      }
    });
  }
}
