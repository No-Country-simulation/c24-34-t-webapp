import { Component, Input } from '@angular/core';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ModalConfigurationActivityComponent } from '../modal-configuration-activity/modal-configuration-activity.component';
import { Subcategory } from '../../models/category';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Icon_mapping } from '../../models/icon_mapping';
import { Activity, CreateRoutineDTO } from '../../models/routine';
import { RoutinesService } from '../../services/routines.service';

@Component({
  selector: 'app-sub-categories',
  imports: [
    FontAwesomeModule,
    DialogModule,
    ModalConfigurationActivityComponent,
  ],
  templateUrl: './sub-categories.component.html',
  standalone: true,
})
export class SubCategoriesComponent {
  faPlus = faPlus;
  //obtaining these values because they are outside the scope
  @Input() subCategories: Subcategory[] = [];
  @Input() categoryName: string = '';
  routine: CreateRoutineDTO = {
    title: '',
    description: '',
    activities: [],
  };

  constructor(
    private dialog: Dialog,
    private routineService: RoutinesService
  ) {}

  openDialog(name_subcategory: string) {
    const dialogRef = this.dialog.open(ModalConfigurationActivityComponent, {
      minWidth: '320px',
      //disable closing the dialog with the escape key and by clicking outside  of it
      disableClose: true,
    });
    //obtain activity every time the user saves the activity
    dialogRef.closed.subscribe((result) => {
      const typedResult = result as Activity;
      typedResult.category = this.categoryName;
      typedResult.subcategory = name_subcategory;
      this.routine.activities.unshift(typedResult);
    });
  }

  getIcons(name: string): string {
    return Icon_mapping[name];
  }

  saveRoutine(): void {
    //TODO create design to manage title and description routine
    this.routine.title = 'routine title';
    this.routine.description = 'routine description';
    if (this.routine.title != '') {
      this.routineService.create(this.routine).subscribe((routineCreated) => {
      });
    }
  }
}
