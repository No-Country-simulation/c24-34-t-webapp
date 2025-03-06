import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Category, Subcategory } from '../../models/category';
import { SubCategoriesComponent } from '../../components/sub-categories/sub-categories.component';
import { get_icons } from '../../models/get_icons';
import { CategoriesService } from '../../services/categories.service';
import { CreateActivityDTO, CreateRoutineDTO } from '../../models/routine';
import { RoutinesService } from '../../services/routines.service';
import { Color_btn } from '../../models/color_btn';
import { FormErrorMessageComponent } from '../../components/form-error-message/form-error-message.component';
import { Router } from '@angular/router';
import { RequestStatus } from '../../models/request-status.model';
import { ModelMessagesComponent } from '../../components/model-messages/model-messages.component';
import { Dialog } from '@angular/cdk/dialog';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-routine',
  imports: [
    FontAwesomeModule,
    CommonModule,
    SubCategoriesComponent,
    FormErrorMessageComponent,
    FormsModule,
  ],
  templateUrl: './create-routine.component.html',
  standalone: true,
})
export class CreateRoutineComponent implements OnInit {
  icon_categories = get_icons;
  colorBtn = Color_btn;
  //Default value when the component is rendered
  categoryName: string = 'Sports';
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  status: RequestStatus = 'init';
  routine: CreateRoutineDTO = {
    userId: '',
    title: '',
    description: '',
    activities: [],
  };
  constructor(
    private categoriesService: CategoriesService,
    private routineService: RoutinesService,
    private router: Router,
    private dialog: Dialog
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    //set status to loading while waiting for the backend response
    this.status = 'loading';
    //open a dialog with a message about the pending status
    this.openDialog();

    this.categoriesService.getAllCategories().subscribe({
      next: (result) => {
        if (result.length > 0) {
          this.status = 'success';
          //close the dialog when the backend request is successful
          this.dialog.closeAll();

          this.categories = result;
          //set the active category when the component is rendering
          this.categories[0].isActive = true;
          this.addSubCategories(this.categories[0].subcategories);
        }
      },
      error: (err) => {
        //close the pending dialog when the backend request fails
        this.dialog.closeAll();
        if (err.status === 404) {
          //set status to notFound when a 404 error occurs
          this.status = 'notFound';
          //open a dialog with a message about the 404 error
          this.openDialog();
          //navigate to the login component when there is a 404 error
          this.router.navigate(['/login']);
        }
      },
    });
  }

  addSubCategories(subcategories: Subcategory[]): void {
    this.subcategories.push(...subcategories);
  }

  addActivities(activity: CreateActivityDTO) {
    activity.category = this.categoryName;
    this.routine.activities.unshift(activity);
  }

  storeValues(category: Category): void {
    //clear the array because it must have only the subcategories of the selected category
    this.subcategories = [];

    //allows only one active category
    this.categories.forEach((cat) => {
      cat.isActive === true ? (cat.isActive = false) : cat.isActive;
      if (cat.name === category.name) {
        cat.isActive = true;
        //store category name and the subcategories of the selected category because the rendering happens outside the current scope.
        this.categoryName = category.name;
        this.addSubCategories(category.subcategories);
      }
    });
  }
  onSubmit(f: NgForm) {
    //send the title and description to save the routine
    this.saveRoutine(f.value.titleRoutine, f.value.descriptionRoutine);
  }
  saveRoutine(nameRoutine: string, descriptionRoutine: string): void {
    //set status to loading while waiting for the backend response
    this.status = 'loading';
    this.routine.title = nameRoutine;
    this.routine.description = descriptionRoutine;

    this.routineService.create(this.routine).subscribe({
      next: () => {
        this.status = 'success';
        this.router.navigate(['home/']);
      },
      error: (err) => {
        if (err.status === 404) {
          //set status to notFound when a 404 error occurs
          this.status = 'notFound';
          //open a dialog with a message about the 404 error
          this.openDialog();
          //navigate to the login component when there is a 404 error
          this.router.navigate(['/login']);
        }
      },
    });
  }
  openDialog() {
    this.dialog.open(ModelMessagesComponent, {
      //send status to the Model Messages component
      data: {
        status: this.status,
      },
      minWidth: '320px',
      backdropClass: 'bg-gray-50/90',
      disableClose: true,
    });
  }
}
