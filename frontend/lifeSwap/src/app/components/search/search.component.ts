import { Component } from '@angular/core';
import {get_icons} from "../../models/get_icons";
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-search',
  imports: [
    FaIconComponent
  ],
  standalone: true,
  templateUrl: './search.component.html'
})
export class SearchComponent {

    protected readonly general_icons = get_icons;
}
