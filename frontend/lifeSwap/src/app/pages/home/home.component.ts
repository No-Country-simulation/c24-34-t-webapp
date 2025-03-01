import { Component, Input } from '@angular/core';
import { Activity } from '../../models/routine';
import { BtnDisplayList } from '../../components/btn-display-list/btn-display-list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { get_icons } from '../../models/get_icons';
import { ActivatedRoute } from '@angular/router';
import { FilterComponent } from '../../components/filter/filter.component';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-home',
  imports: [
    BtnDisplayList,
    FontAwesomeModule,
    TitleCasePipe,
    CdkAccordionModule,
    CommonModule,
    FilterComponent,
  ],
  standalone: true,
  templateUrl: './home.component.html',
})
export class HomeComponent {
  //TODO esto cambiara cuando guarde en un estado general la info del user
  //user activities are input when send from the filter.
  @Input() activities: Activity[] = [];
  general_icons = get_icons;
  emailUser: string = '';

  constructor(
    private route: ActivatedRoute,
    private user: UsersService,
  ) {}

  ngOnInit() {
    this.getRoutines();
  }

  getRoutines() {
    this.route.params.subscribe((params) => {
      //email from login component
      this.emailUser = params['email'];
    });
    return this.user.gerUserByEmail(this.emailUser).subscribe((userData) => {
      //TODO manejar caso de exito y error
      if (userData.id != '') {
        //Todo por ahora el dise;o solo admite q el usuario tenga una rutina
        userData.routines.forEach(routine =>
        {
          this.activities = routine.activities
        })
      }
    });
  }

  //activities when the user use the filter
  setActivitiesFiltered(activities: Activity[]) {
    this.activities = activities;
  }
}
