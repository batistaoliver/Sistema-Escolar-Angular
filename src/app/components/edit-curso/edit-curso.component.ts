import { Subscription } from 'node_modules/rxjs';
import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';
import {Inject} from '@angular/core';

import { Curso } from 'src/app/services/curso.service';

@Component({
  selector: 'app-edit-curso',
  templateUrl: './edit-curso.component.html',
  styleUrls: ['./edit-curso.component.css']
})
export class EditCursoComponent implements OnInit {

  cursoSelecionado: any;
  cursos:Curso[]=[];
  cursoIdSelecionado:number = 0
  nomeCurso: string =''
  
  submitted = false;

  curso = {
    nome: '',
    instrutor: '',
    local: '',
    cargaHoraria:'',
    DataInicio: ''
  };

  private subscriptions= new Subscription()
  constructor(
    private router: Router,
    private cursoService: CursoService,
    @Inject(ActivatedRoute) private _activatedroute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cursoIdSelecionado = this._activatedroute.snapshot.params['id']
    this.nomeCurso = this._activatedroute.snapshot.params['nome']
    console.log(this.nomeCurso) 

    this.subscriptions.add(this.cursoService.consultar(this.nomeCurso).subscribe(cursos=>{
      if (cursos.length) { 
        this.cursos = cursos
        this.cursoSelecionado = this.cursos.find(element => element.codigo == this.cursoIdSelecionado); 
        this.curso.nome = this.cursoSelecionado.nome
        this.curso.instrutor = this.cursoSelecionado.instrutor
        this.curso.local = this.cursoSelecionado.local
        this.curso.cargaHoraria = this.cursoSelecionado.cargaHoraria
        this.curso.DataInicio= this.cursoSelecionado.dataInicio;
      }
    }))

  }

  alterar(){
     console.log(this.curso)
    this.cursoService.alterar(this.curso).subscribe(
      response => {
        console.log(response); 
      },
      error => {
        console.log(error);
      } 
    );
    this.router.navigate(['/curso']);
  }
    
}
