import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ModalConfigurationActivityComponent } from '../modal-configuration-activity/modal-configuration-activity.component';
import { Subcategory } from '../../models/category';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Activity } from '../../models/routine';
import { BtnDisplayList } from '../btn-display-list/btn-display-list';

@Component({
  selector: 'app-sub-categories',
  imports: [
    FontAwesomeModule,
    DialogModule,
    ModalConfigurationActivityComponent,
    BtnDisplayList,
  ],
  templateUrl: './sub-categories.component.html',
  standalone: true,
})
export class SubCategoriesComponent {
  faPlus = faPlus;
  //obtaining these values because they are outside the scope
  @Input() subCategories: Subcategory[] = [];
  @Output() sendActivity = new EventEmitter<Activity>();

  constructor(private dialog: Dialog) {}

  openDialog(name_subcategory: string) {
    const dialogRef = this.dialog.open(ModalConfigurationActivityComponent, {
      data: { name_subcategory },
      minWidth: '320px',
      //disable closing the dialog with the escape key and by clicking outside  of it
      disableClose: true,
    });
    //obtain activity every time the user saves the activity
    dialogRef.closed.subscribe((result) => {
      const typedResult = result as Activity;
      this.sendActivityHandler(typedResult);
    });
  }
  //send activity to create routine component every time the user saves the activity
  sendActivityHandler(activity: Activity) {
    this.sendActivity.emit(activity);
  }
}
