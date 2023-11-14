import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExercisesListComponent } from "./components/exercises-list/exercises-list.component";
import { DaysListComponent } from "./components/days-list/days-list.component";

const routes: Routes = [
  { path: '', component: DaysListComponent },
  { path: 'exercises/:dayId', component: ExercisesListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
