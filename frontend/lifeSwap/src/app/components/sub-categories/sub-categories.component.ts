import { Component, Input } from '@angular/core';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ModalConfigurationActivityComponent } from '../../components/modal-configuration-activity/modal-configuration-activity.component';
import { Subcategory } from '../../../models/category';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Icon_mapping } from '../../../models/icon_mapping';

@Component({
  selector: 'app-sub-categories',
  imports: [FontAwesomeModule, DialogModule],
  templateUrl: './sub-categories.component.html',
  standalone: true,
})
export class SubCategoriesComponent {
  @Input() subCategories: Subcategory[] = [];
  @Input() categoryName: string = '';
  faPlus = faPlus;

  constructor(private dialog: Dialog) {}

  /*openDialog() {
    this.dialog.open(ModalConfigurationActivityComponent, {
      minWidth: '320px',
    });
  }*/
  getIcons(name: string): string {
    return Icon_mapping[name];
  }
}
