import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Color_btn} from "../../models/color_btn";
import {get_icons} from "../../models/get_icons";
import {Activity} from '../../models/routine';
import {CommonModule} from '@angular/common';
import { CdkAccordionModule} from '@angular/cdk/accordion';
import {BtnDisplayList} from '../btn-display-list/btn-display-list';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-activities-list',
  imports: [
    CommonModule,
    CdkAccordionModule,
    BtnDisplayList,
    RouterLink,
  ],
  standalone: true,
  templateUrl: './activities-list.component.html'
})
export class ActivitiesListComponent {
    colorBtn = Color_btn;
    general_icons = get_icons;
    @Input() isFilter: boolean = false;
    @Input() activities: Activity[] = [];
    @Output() activitiesEmpty= new EventEmitter<Activity[]>();

  displayUserRoutines() {
    this.activities = [];
    this.sendActivitiesEmptyHandler();
  }
  //send activities to the home component
  sendActivitiesEmptyHandler() {
    this.activitiesEmpty.emit(this.activities);
  }
}
