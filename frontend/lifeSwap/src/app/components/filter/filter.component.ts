import {Component, EventEmitter, Output} from '@angular/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { get_icons } from '../../models/get_icons';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { CategoriesService } from '../../services/categories.service';
import {Category, Subcategory} from '../../models/category';
import { CommonModule } from '@angular/common';
import { Color_btn } from '../../models/color_btn';
import { RoutinesService } from '../../services/routines.service';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ModelMessagesComponent } from '../model-messages/model-messages.component';
import { Activity } from '../../models/routine';
import {RequestStatus} from '../../models/request-status.model';
import {Router} from '@angular/router';
import {FormsModule, NgModel, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [
    OverlayModule,
    CdkAccordionModule,
    FontAwesomeModule,
    CommonModule,
    DialogModule,
    ModelMessagesComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './filter.component.html',
  standalone: true,
})
export class FilterComponent {
  status:RequestStatus = "init";
  isOpen = false;
  general_icons = get_icons;
  colorBtn = Color_btn;
  categories: Category[] = [];
  subcategoriesFiltered:Subcategory[]=[];
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

  onkeydown(event: KeyboardEvent, keyWord: NgModel) {
    if (event.key === 'Enter') {
      this.getRoutineRandom('','',keyWord.value);
    }
  }

  filterSubcategories(event: KeyboardEvent,subcategoryKey: string, subcategories: Subcategory[]) {
    if(event.key === 'Enter'){
      subcategories.filter(subcategory => {
        subcategory.name.toLowerCase().includes(subcategoryKey.toLowerCase()) &&
        !this.subcategoriesFiltered.includes(subcategory) ?
          this.subcategoriesFiltered.push(subcategory):this.subcategoriesFiltered
      });
    }else {
      this.subcategoriesFiltered = [];
    }
  }

  getRoutineRandom(subCategory: string, category:string, keyWord: string) {
    if (subCategory === '' && category === '' && keyWord === ''){
      this.status = 'notFound';
      this.openDialog('Type a title or description to find a random routine');
    }
    else {
      //set status to loading while waiting for the backend response
      this.status = "loading";
      //open a dialog with a message about the pending status
      this.openDialog();

      this.routineService.getRandomRoutine(subCategory,category,keyWord).subscribe({
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
            this.openDialog('There are not routine to show');
          }
        }
      });
    }
  }

  openDialog(customMessage?:string) {
    this.dialog.open(ModelMessagesComponent, {
      //send status to the Model Messages component
      data: {
        status: this.status,
        customMessage:customMessage,
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
