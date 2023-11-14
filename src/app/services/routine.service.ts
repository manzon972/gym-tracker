import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { DayI, ExerciseI, GymProgramResponseI, RoutineI, SetI } from "../shared/interfaces";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {
  private daysSubject = new BehaviorSubject<DayI[]>([]);
  $days = this.daysSubject.asObservable();
  private processingSubject = new BehaviorSubject<boolean>(false);
  $processing = this.processingSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadDays();
  }

  public loadDays() {
    this.http.get<GymProgramResponseI>(`${environment.API_URL}/get-routine`).subscribe((res) => this.daysSubject.next(res.routine.days))
  }

  public completeSet(dayId: string, exercise: ExerciseI, setIndex: Number) {
    this.http.put(`${environment.API_URL}/complete-exercise-set`, {
      dayId,
      exerciseId: exercise.id,
      setIndex
    }).subscribe(() => {
      this.loadDays();
    })
  }
}
