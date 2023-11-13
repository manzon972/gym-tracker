import { Component, OnInit } from '@angular/core';
import { RoutineService } from "../../services/routine.service";
import { finalize, Observable } from "rxjs";
import { DayI } from "../../shared/interfaces";

@Component({
  selector: 'app-days-list',
  templateUrl: './days-list.component.html',
  styleUrls: ['./days-list.component.scss']
})
export class DaysListComponent {
  $days: Observable<DayI[]>;
  $processing: Observable<boolean>;

  constructor(private routineService: RoutineService) {
    this.$days = routineService.$days;
    this.$processing = routineService.$processing;
  }
}
