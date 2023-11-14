import { Component, OnInit } from '@angular/core';
import { RoutineService } from "../../services/routine.service";
import { finalize, Observable } from "rxjs";
import { DayI } from "../../shared/interfaces";
import { Router } from "@angular/router";

@Component({
  selector: 'app-days-list',
  templateUrl: './days-list.component.html',
  styleUrls: ['./days-list.component.scss'],
})
export class DaysListComponent {
  $days: Observable<DayI[]>;
  $processing: Observable<boolean>;

  constructor(private routineService: RoutineService, private router: Router) {
    this.$days = routineService.$days;
    this.$processing = routineService.$processing;
  }

  selectDay(day: DayI) {
    this.router.navigate(['exercises', day.id]);
  }
}
