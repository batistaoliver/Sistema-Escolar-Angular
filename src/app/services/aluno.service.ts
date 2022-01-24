import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Aluno{
  codigo: number;
  nome: string;
  dataNascimento:	Date;

}

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private http: HttpClient) { }

  consultar(nome: string): Observable<any>
  {
    return this.http.get("https://cors-anywhere.herokuapp.com/https://stormy-badlands-29216.herokuapp.com/api/aluno/consultar/"+ nome);  
  }

  incluir(aluno:any){
    return this.http.post("https://cors-anywhere.herokuapp.com/https://stormy-badlands-29216.herokuapp.com/api/aluno/incluir", aluno);
  }

  remover(aluno:any){
    return this.http.post("https://cors-anywhere.herokuapp.com/https://stormy-badlands-29216.herokuapp.com/api/aluno/remover", aluno);
  }
 
  alterar(aluno:any)
    {
      return this.http.patch("https://cors-anywhere.herokuapp.com/https://stormy-badlands-29216.herokuapp.com/api/aluno/alterarparcial", aluno); 
    }
}
