import {Component, Inject} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {get_icons} from '../../models/get_icons';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {RequestStatus} from '../../models/request-status.model';
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
    @Inject(DIALOG_DATA) public data: { status: RequestStatus,
      customMessage: string},
    private dialogRef:DialogRef) {
  }
  get_icons = get_icons;

 close() {
   this.dialogRef.close()
 }

}
