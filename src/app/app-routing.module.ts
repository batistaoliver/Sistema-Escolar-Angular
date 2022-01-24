import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCursoComponent } from './components/add-curso/add-curso.component';
import { EditCursoComponent } from './components/edit-curso/edit-curso.component';
import { DeleteCursoComponent } from './components/delete-curso/delete-curso.component';
import { ListCursoComponent } from './components/list-curso/list-curso.component';
import { AddAlunoComponent } from './components/add-aluno/add-aluno.component';
import { EditAlunoComponent } from './components/edit-aluno/edit-aluno.component';
import { DeleteAlunoComponent } from './components/delete-aluno/delete-aluno.component';
import { ListAlunoComponent } from './components/list-aluno/list-aluno.component';
import { AddMatriculaComponent } from './components/add-matricula/add-matricula.component';
import { ListMatriculaComponent } from './components/list-matricula/list-matricula.component';



const routes: Routes = [
  // { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'curso', component: ListCursoComponent },
  { path: 'curso/alterar/:id/:nome', component: EditCursoComponent },
  { path: 'curso/incluir', component: AddCursoComponent },
  { path: 'curso/excluir/:id', component: DeleteCursoComponent },

  { path: 'aluno', component: ListAlunoComponent },
  { path: 'aluno/alterar/:id/:nome', component: EditAlunoComponent },
  { path: 'aluno/incluir', component: AddAlunoComponent },
  { path: 'aluno/excluir/:id', component: DeleteAlunoComponent },

  { path: 'matricula', component: ListMatriculaComponent },
  { path: 'matricula/incluir', component: AddMatriculaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
