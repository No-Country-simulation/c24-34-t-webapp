import {Component, Inject} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {get_icons} from '../../models/get_icons';
import {DIALOG_DATA} from '@angular/cdk/dialog';
@Component({
  selector: 'app-model-messages',
  imports: [
    FaIconComponent
  ],
  standalone: true,
  templateUrl: './model-messages.component.html'
})
export class ModelMessagesComponent {
  constructor(
    @Inject(DIALOG_DATA) public data: { message: string }) {
  }
  get_icons = get_icons;

}
