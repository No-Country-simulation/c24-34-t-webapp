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
import {RequestStatus} from '../../models/request-status.model';
import {Router} from '@angular/router';

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
  status:RequestStatus = "init";
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
    private dialog: Dialog,
    private router:Router
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    //set status to loading while waiting for the backend response
    this.status = "loading";
    //open a dialog with a message about the pending status
    this.openDialog();

    this.categoryService.getAllCategories().subscribe({
      next:(result) => {
        this.status = "success";
        //close the dialog when the backend request is successful
        this.dialog.closeAll();

        this.categories = result;
      },
      error:(err) => {
        //close the pending dialog when the backend request fails
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
    })
  }

  getRoutineRandomBySubcategory(subcategory: string) {
    //set status to loading while waiting for the backend response
    this.status = "loading";
    //open a dialog with a message about the pending status
    this.openDialog();

    this.routineService.getRandomRoutine(subcategory).subscribe({
      next:(routine) => {
        this.status = "success";
        //close the dialog when the backend request is successful
        this.dialog.closeAll();
        //send activities to the home component
        this.sendActivitiesFilteredHandler(routine.activities);
      },
      error: (err) => {
        //close the pending dialog when the backend request fails
        this.dialog.closeAll();

        if (err.status === 404){
          //set status to notFound when a 404 error occurs
          this.status = "notFound";
          //open a dialog with a message about the 404 error
          this.openDialog();
        }
      }
    });
  }

  openDialog() {
    this.dialog.open(ModelMessagesComponent, {
      //send status to the Model Messages component
      data: {
        status: this.status
      },
      minWidth: '320px',
      backdropClass: 'bg-gray-50/90',
    });
  }
  //send activities to the home component
  sendActivitiesFilteredHandler(activities: Activity[]) {
    this.sendActivitiesFiltered.emit(activities);
  }
}
