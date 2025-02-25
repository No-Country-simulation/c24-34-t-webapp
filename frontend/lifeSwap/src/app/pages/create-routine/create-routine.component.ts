import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Category, Subcategory } from '../../models/category';
import { SubCategoriesComponent } from '../../components/sub-categories/sub-categories.component';
import { icon_categories } from '../../models/icon_sub_categories';
import { CategoriesService } from '../../services/categories.service';
import { BtnDisplayList } from '../../components/btn-display-list/btn-display-list';
import { CreateActivityDTO, CreateRoutineDTO } from '../../models/routine';
import { RoutinesService } from '../../services/routines.service';

@Component({
  selector: 'app-create-routine',
  imports: [
    FontAwesomeModule,
    CommonModule,
    SubCategoriesComponent,
    BtnDisplayList,
  ],
  templateUrl: './create-routine.component.html',
  standalone: true,
})
export class CreateRoutineComponent implements OnInit {
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
    private routineService: RoutinesService
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
  // get tailwind classes for an active or inactive category
  getColorCategory(isActive: boolean = false) {
    return {
      'bg-primary': isActive === true,
      'text-text-bg': isActive === true,

      'bg-secondary': isActive === false,
      'text-primary': isActive === false,
    };
  }

  getIcon(name: string): string {
    return icon_categories[name];
  }

  saveRoutine(): void {
    //TODO create design to manage title and description routine
    this.routine.title = 'routine title';
    this.routine.description = 'routine description';
    if (this.routine.title != '') {
      this.routineService
        .create(this.routine)
        .subscribe((routineCreated) => {});
    }
  }

  addActivities(activity: CreateActivityDTO) {
    activity.category = this.categoryName;
    this.routine.activities.unshift(activity);
  }
}
