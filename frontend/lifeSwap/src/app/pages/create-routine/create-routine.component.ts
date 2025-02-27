import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Category, Subcategory } from '../../models/category';
import { SubCategoriesComponent } from '../../components/sub-categories/sub-categories.component';
import { icon_categories } from '../../models/icon_sub_categories';
import { CategoriesService } from '../../services/categories.service';
import { CreateActivityDTO, CreateRoutineDTO } from '../../models/routine';
import { RoutinesService } from '../../services/routines.service';
import { Color_btn } from '../../models/color_btn';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-routine',
  imports: [
    FontAwesomeModule,
    CommonModule,
    SubCategoriesComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './create-routine.component.html',
  standalone: true,
})
export class CreateRoutineComponent implements OnInit {
  icon_categories = icon_categories;
  colorBtn = Color_btn;
  //Default value when the component is rendered
  categoryName: string = 'Sports';
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  routine: CreateRoutineDTO = {
    title: '',
    description: '',
    activities: [],
  };

  constructor(
    private categoriesService: CategoriesService,
    private routineService: RoutinesService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getCategories();
  }
  getCategories(): void {
    this.categoriesService.getAllCategories().subscribe((data) => {
      this.categories = data;
      if (this.categories.length > 0) {
        //set the active category when the component is rendering
        this.categories[0].isActive = true;
        this.addSubCategories(this.categories[0].subcategories);
      }
    });
  }

  addSubCategories(subcategories: Subcategory[]): void {
    this.subcategories.push(...subcategories);
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

  saveRoutine(): void {
    //TODO create design to manage title and description routine
    this.routine.title = 'routine title';
    this.routine.description = 'routine description';
    if (this.routine.title != '') {
      this.routineService
        .create(this.routine)
        .subscribe((routineCreated) => {
          this.router.navigate(['home/',routineCreated.id])
        });
    }
  }

  addActivities(activity: CreateActivityDTO) {
    activity.category = this.categoryName;
    this.routine.activities.unshift(activity);
  }
}
