import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ModalConfigurationActivityComponent } from '../modal-configuration-activity/modal-configuration-activity.component';
import { Subcategory } from '../../models/category';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Activity } from '../../models/routine';
import { BtnDisplayList } from '../btn-display-list/btn-display-list';
import { general_icons } from '../../models/icon_sub_categories';

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
  constructor(private dialog: Dialog) {}

  //obtaining these values because they are outside the scope
  @Input() subCategories: Subcategory[] = [];
  @Output() sendActivity = new EventEmitter<Activity>();
  general_icons = general_icons;

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
