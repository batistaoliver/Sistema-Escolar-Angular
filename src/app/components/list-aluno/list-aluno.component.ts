import { Subscription } from 'node_modules/rxjs';
import { Component, OnInit } from '@angular/core';
import { AlunoService } from 'src/app/services/aluno.service';
import { Router } from '@angular/router';


import { Aluno } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-list-aluno',
  templateUrl: './list-aluno.component.html',
  styleUrls: ['./list-aluno.component.css']
})
export class ListAlunoComponent implements OnInit {

  aluno1 = {
    nome: '',
    dataNascimento:''
  };
 
  nomeBusca: string=''
  
  alunos:Aluno[]=[];
  alunosBusca:Aluno[]=[];
  alunoSelecionado: any;
  alunoIdSelecionado:number = 0
  nomealuno: string=''

  valorAtual: string = '';
  private subscriptions= new Subscription()

  constructor(
    private router: Router,
    private alunoService: AlunoService
    ) { }
    get hasalunoIdSelecionado():boolean{
      return this.alunoIdSelecionado === undefined
    }

  ngOnInit(): void {
    this.subscriptions.add(this.alunoService.consultar("").subscribe(alunos=>{
      this.alunos=alunos
    }))
    
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
}

  onKeyUp(evento: KeyboardEvent){
    this.nomeBusca = (<HTMLInputElement>evento.target).value;
  }
  consultar(){
    this.subscriptions.add(this.alunoService.consultar(this.nomeBusca).subscribe(alunos=>{
      this.alunos=alunos
    }))
  };

  onSelect($event:Event){ 
    const target = $event.target as HTMLInputElement; 
    this.alunoIdSelecionado = parseInt(target.value,10);
    this.alunoSelecionado = this.alunos.find(element => element.codigo === this.alunoIdSelecionado);
    this.nomealuno =  this.alunoSelecionado.nome 
  }
  
  excluir(){
    let alunoSelecionado = this.alunos.find(element => element.codigo === this.alunoIdSelecionado); 
    
    this.subscriptions.add(this.alunoService.remover(alunoSelecionado).subscribe(console.log))
  }

}
