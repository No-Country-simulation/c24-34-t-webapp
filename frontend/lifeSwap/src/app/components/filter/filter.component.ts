import { Component, EventEmitter, Output } from '@angular/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { get_icons } from '../../models/get_icons';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';
import { Color_btn } from '../../models/color_btn';
import { RoutinesService } from '../../services/routines.service';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ModelMessagesComponent } from '../model-messages/model-messages.component';
import { Activity } from '../../models/routine';
import {SearchComponent} from '../search/search.component';

@Component({
  selector: 'app-filter',
  imports: [
    OverlayModule,
    CdkAccordionModule,
    FontAwesomeModule,
    CommonModule,
    DialogModule,
    ModelMessagesComponent,
    SearchComponent
  ],
  templateUrl: './filter.component.html',
  standalone: true,
})
export class FilterComponent {
  isOpen = false;
  general_icons = get_icons;
  colorBtn = Color_btn;
  loading: boolean = true;
  message: string = 'Looking for a random routine';
  categories: Category[] = [];
  @Output() sendActivitiesFiltered = new EventEmitter<Activity[]>();

  /*change the overlay configuration
to display it at the end of the X-axis. */
  positions: ConnectedPosition[] = [
    {
      //origin is the overlay and overlay is the button
      originX: 'end',
      overlayX: 'end', // the button and overlay are positioned at the end
      originY: 'bottom',
      overlayY: 'top', // show the overlay at the bottom of the buttton
    },
    /*this confuguration shows the overlay on top
    if there isn't space at the botton*/
    {
      originX: 'end',
      overlayX: 'end',
      originY: 'top',
      overlayY: 'bottom',
    },
  ];
  constructor(
    private categoryService: CategoriesService,
    private routineService: RoutinesService,
    private dialog: Dialog
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    return this.categoryService.getAllCategories().subscribe((result) => {
      this.categories = result;
    });
  }

  getRoutineRandom(name: string) {
    //reset values to default
    this.message = 'Looking for a random routine';
    this.loading = true;
    //in case whe the response status is pending show the dialog
    if (this.loading) {
      this.openDialog();
    }
    this.routineService.getRoutineRandomBySubCategory(name).subscribe(
      (routine) => {
        if (routine.id != '') {
          setTimeout(() => {
            this.dialog.closeAll();
          }, 1000);
          //the response status is not pending
          this.loading = false;
          //send activities to home component
          this.sendActivitiesFilteredHandler(routine.activities);
        }
      },
      (error) => {
        //show the dialog with the error message
        this.message = error.error.message;
        setTimeout(() => {
          this.dialog.closeAll();
        }, 2000);
        this.openDialog();
      }
    );
  }
  openDialog() {
    this.dialog.open(ModelMessagesComponent, {
      //send message to the component using the modal
      data: this.message,
      minWidth: '320px',
      backdropClass: 'bg-gray-50/90',
    });
  }
  //send activities to home component
  sendActivitiesFilteredHandler(activities: Activity[]) {
    this.sendActivitiesFiltered.emit(activities);
  }
}
