import { Subscription } from 'node_modules/rxjs';
import { Component, OnInit } from '@angular/core';
import { AlunoService } from 'src/app/services/aluno.service';
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';
import {Inject} from '@angular/core';
import { Aluno } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-edit-aluno',
  templateUrl: './edit-aluno.component.html',
  styleUrls: ['./edit-aluno.component.css']
})
export class EditAlunoComponent implements OnInit {

  alunoSelecionado: any;
  alunos:Aluno[]=[];
  alunoIdSelecionado:number = 0
  nomealuno: string =''
  
  submitted = false;

  aluno = {
    nome: '',
    dataNascimento: ''
  };

  private subscriptions= new Subscription()
  constructor(
    private router: Router,
    private alunoService: AlunoService,
    @Inject(ActivatedRoute) private _activatedroute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.alunoIdSelecionado = this._activatedroute.snapshot.params['id']
    this.nomealuno = this._activatedroute.snapshot.params['nome']
    console.log(this.nomealuno) 

    this.subscriptions.add(this.alunoService.consultar(this.nomealuno).subscribe(alunos=>{
      if (alunos.length) { 
        this.alunos = alunos
        this.alunoSelecionado = this.alunos.find(element => element.codigo == this.alunoIdSelecionado); 
        this.aluno.nome = this.alunoSelecionado.nome
        this.aluno.dataNascimento= this.alunoSelecionado.dataNascimento;
      }
    }))
  }

  alterar(){
    console.log(this.aluno)
   this.alunoService.alterar(this.aluno).subscribe(
     response => {
       console.log(response); 
     },
     error => {
       console.log(error);
     } 
   );
   this.router.navigate(['/aluno']);
 }
}
