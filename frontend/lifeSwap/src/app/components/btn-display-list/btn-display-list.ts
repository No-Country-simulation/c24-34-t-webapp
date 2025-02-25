import { Component, Input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Icon_sub_categories } from '../../models/icon_sub_categories';

@Component({
  selector: 'btn-display-list',
  imports: [FaIconComponent],
  templateUrl: './btn-display-list.html',
  standalone: true,
})
export class BtnDisplayList {
  @Input() name: string = '';
  @Input() iconTypeButtonName: any = '';

  getIcons(nameIcon: string): string {
    return Icon_sub_categories[nameIcon];
  }
}
