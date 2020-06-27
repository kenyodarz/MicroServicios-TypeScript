//Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { CursosComponent } from './components/cursos/cursos.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { ExamenesComponent } from './components/examenes/examenes.component';


const routes: Routes = [
  {path: 'cursos', component: CursosComponent},
  {path: 'alumnos', component: AlumnosComponent},
  {path: 'examenes', component: ExamenesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
