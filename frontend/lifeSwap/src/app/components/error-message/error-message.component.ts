import { Component } from '@angular/core';
import { general_icons } from '../../models/icon_sub_categories';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-error-message',
  imports: [FontAwesomeModule],
  standalone: true,
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
  general_icons = general_icons;
}
