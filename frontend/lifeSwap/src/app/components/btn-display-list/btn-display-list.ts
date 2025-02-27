import { Component, Input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Icon_sub_categories } from '../../models/icon_sub_categories';
import { CommonModule } from '@angular/common';
import { Color_btn } from '../../models/color_btn';

@Component({
  selector: 'btn-display-list',
  imports: [FaIconComponent, CommonModule],
  templateUrl: './btn-display-list.html',
  standalone: true,
})
export class BtnDisplayList {
  @Input() name: string = '';
  @Input() iconTypeButtonName: any = '';
  @Input() color: string = 'default';
  colorBtn = Color_btn;

  getIcons(nameIcon: string): string {
    return Icon_sub_categories[nameIcon];
  }
}
