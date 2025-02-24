import {Component, Inject} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  GOAL_PERIOD,
  GOAL_UNITS,
  TIME_RANGE,
} from '../../models/TIME_RANGE_ENUM';
import {
  faXmark,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateActivityDTO } from '../../models/routine';

@Component({
  selector: 'app-modal-configuration-activity',
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './modal-configuration-activity.component.html',
  standalone: true,
})
export class ModalConfigurationActivityComponent {
  faXmark = faXmark;
  faCircleExclamation = faCircleExclamation;
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

  constructor(private dialogRef: DialogRef<CreateActivityDTO>,
              @Inject(DIALOG_DATA) public data: {name_subcategory: string}) {}

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
    this.storeActivityValue(f.value);
    /*when saving the activity, the dialog closes to allow the user configure another activity
    and sends the activity configured to be used later for saving the routine*/
    this.dialogRef.close(this.activity);
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
