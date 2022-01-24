import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno } from './aluno.service';
import { Curso } from './curso.service';

// export interface Curso{
//   nome: string;
//   dataInicio:	Date;

// }

// export interface Aluno{
//   codigo: number;
//   nome: string;
// }
export interface ListaMatriculaCursoItem {
  codigo: number;
  curso: Curso;
  dataMatriculaCurso: Date;
}

export interface Matricula {
  codigo: number;
  aluno: Aluno;
  listaMatriculaCurso: ListaMatriculaCursoItem[];
}

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  constructor(private http: HttpClient) { }

  consultar(codigoAluno: string): Observable<any> {
    return this.http.get(
      'https://cors-anywhere.herokuapp.com/https://stormy-badlands-29216.herokuapp.com/api/matricula/consultar/' +
        codigoAluno
    );
  }

  incluir(matricula: Matricula) {
    return this.http.post(
      'https://cors-anywhere.herokuapp.com/https://stormy-badlands-29216.herokuapp.com/api/matricula/incluir',
      matricula
    );
  }
  remover(matricula: Matricula) {
    return this.http.post(
      'https://cors-anywhere.herokuapp.com/https://stormy-badlands-29216.herokuapp.com/api/matricula/remover',
      matricula
    );
  }
}
