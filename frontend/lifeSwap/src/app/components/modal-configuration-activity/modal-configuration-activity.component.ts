import { Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  GOAL_PERIOD,
  GOAL_UNITS,
  TIME_RANGE,
} from '../../models/TIME_RANGE_ENUM';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateActivityDTO } from '../../models/routine';
import { Color_btn } from '../../models/color_btn';
import { FormErrorMessageComponent } from '../form-error-message/form-error-message.component';
import {get_icons} from '../../models/get_icons';

@Component({
  selector: 'app-modal-configuration-activity',
  imports: [
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    FormErrorMessageComponent,
  ],
  templateUrl: './modal-configuration-activity.component.html',
  standalone: true,
})
export class ModalConfigurationActivityComponent {
  colorBtn = Color_btn;
  general_icons = get_icons;
  time_ranges: TIME_RANGE[] = [];
  goal_periods: GOAL_PERIOD[] = [];
  goal_unites: GOAL_UNITS[] = [];
  //show the user the current time
  timeNow: string = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  activity: CreateActivityDTO = {
    title: '',
    description: '',
    timeRange: '',
    time: '',
    category: '',
    subcategory: '',
    goal: {
      unit: '',
      period: '',
      value: 0,
    },
  };

  constructor(
    private dialogRef: DialogRef<CreateActivityDTO>,
    @Inject(DIALOG_DATA) public data: { name_subcategory: string }
  ) {}

  ngOnInit() {
    //set values to display in the select inputs
    this.addEnumDynamically(GOAL_UNITS, this.goal_unites);
    this.addEnumDynamically(TIME_RANGE, this.time_ranges);
    this.addEnumDynamically(GOAL_PERIOD, this.goal_periods);
  }

  //useful for dynamically adding/removing enum values
  addEnumDynamically(enumName: any, enumArray: any): void {
    Object.keys(enumName).forEach((key) => {
      enumArray.push(enumName[key as keyof typeof enumName]);
    });
  }

  onSubmit(f: NgForm): void {
    if (f.valid) {
      this.storeActivityValue(f.value);
      /*after saving the activity, the dialog closes to allow the user configure another activity
      and sends the activity configured to be used later for saving the routine*/
      this.dialogRef.close(this.activity);
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  storeActivityValue(value: any): void {
    this.activity = {
      title: value.title,
      description: value.description,
      goal: {
        //lower case because the backend has this restriction
        unit: value.unit.toLowerCase(),
        period: value.period,
        value: value.value,
      },
      timeRange: value.timeRange,
      time: value.time,
      //this value are set in the subcategory component
      category: '',
      subcategory: this.data.name_subcategory,
    };
  }
}
