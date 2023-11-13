import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { DayI, GymProgramResponseI, RoutineI } from "../shared/interfaces";
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

  /*
    public toggleTaskCompletion(taskId: number): void {
      this.processingSubject.next(true);
      const currentTasks = this.tasksSubject.value;
      const taskToComplete = currentTasks.find(t => t.id === taskId);
      if (taskToComplete) {
        taskToComplete.completed = !taskToComplete.completed;
        this.tasksSubject.next(currentTasks);
      }
      setTimeout(() => {
        this.processingSubject.next(false);
      }, 100)
    }*/
}
