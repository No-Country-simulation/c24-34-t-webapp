import { Component } from '@angular/core';
import { RoutinesService } from '../../services/routines.service';
import { Activity } from '../../models/routine';
import { BtnDisplayList } from '../../components/btn-display-list/btn-display-list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { general_icons } from '../../models/icon_sub_categories';
import { ActivatedRoute } from '@angular/router';

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
  idRoutine:string = '';


  constructor(private routineService: RoutinesService,private route: ActivatedRoute,) {}

  ngOnInit() {
    this.getRoutines();
  }

  getRoutines() {
    this.route.params.subscribe(params => {
      this.idRoutine = params['id'];
    });
    return this.routineService.getRoutinesByUser().subscribe((routine) => {
        if (routine.length > 0) {
          /*TODO esto es para probar el render, la llamada real es getRutinasByUserID*/
          routine.forEach((routine) => {
            if (routine.id === this.idRoutine) {
              this.activities = routine.activities;
            }
          });
        }
      });
    }
  }
