import { Component } from '@angular/core';
import { get_icons } from '../../models/get_icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-form-error-message',
  imports: [FontAwesomeModule],
  standalone: true,
  templateUrl: './form-error-message.component.html',
})
export class FormErrorMessageComponent {
  get_icons = get_icons;
}
