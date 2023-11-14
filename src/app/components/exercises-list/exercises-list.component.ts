import { Component, OnInit, inject } from '@angular/core';
import { Observable } from "rxjs";
import { DayI, ExerciseI } from "../../shared/interfaces";
import { RoutineService } from "../../services/routine.service";
import { ActivatedRoute, Router } from "@angular/router";
import { REST_TIME } from "../../shared/constants";

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.scss']
})
export class ExercisesListComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  $days: Observable<DayI[]>;
  $processing: Observable<boolean>;
  exercises: ExerciseI[];
  exercise: ExerciseI | null;
  dayId = this.activatedRoute.snapshot.params['dayId'];
  restTime = REST_TIME;

  constructor(private routineService: RoutineService, private router: Router) {
    this.$days = routineService.$days;
    this.$processing = routineService.$processing;
    this.exercises = [];
    this.exercise = null;
  }

  ngOnInit() {
    this.$days.subscribe(days => {
      this.exercises = days.find(d => d.id === this.dayId)?.exercises || [];
      if (this.exercise?.id) {
        this.exercise = this.exercises.find(e => e.id === this.exercise?.id) || this.exercise
      } else {
        this.exercise = this.exercises[0];
      }
    })
  }

  selectExercise(exercise: ExerciseI) {
    this.exercise = exercise;
  }

  completeSet(exercise: ExerciseI, setIndex: number) {
    this.routineService.completeSet(this.dayId, exercise, setIndex);
    const restTimeInterval = setInterval(() => {
      this.restTime--;
      if (this.restTime === 0) {
        this.restTime = REST_TIME;
        clearInterval(restTimeInterval);
      }
    }, 1000)
  }

  protected readonly REST_TIME = REST_TIME;
}
