import { Component, Input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { get_icons } from '../../models/get_icons';
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
  get_icons = get_icons;
}
