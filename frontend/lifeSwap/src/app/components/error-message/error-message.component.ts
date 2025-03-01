import { Component } from '@angular/core';
import { get_icons } from '../../models/get_icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-error-message',
  imports: [FontAwesomeModule],
  standalone: true,
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
  general_icons = get_icons;
}
