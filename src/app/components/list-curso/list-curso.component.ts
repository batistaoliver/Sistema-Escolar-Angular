import { Subscription } from 'node_modules/rxjs';
import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';
import { Router } from '@angular/router';


import { Curso } from 'src/app/services/curso.service';

@Component({
  selector: 'app-list-curso',
  templateUrl: './list-curso.component.html',
  styleUrls: ['./list-curso.component.css']
})
export class ListCursoComponent implements OnInit {

  curso1 = {
    nome: '',
    instrutor: '',
    local: '',
    cargaHoraria:'',
    DataInicio:''
  };
 
  nomeBusca: string=''
  
  cursos:Curso[]=[];
  cursosBusca:Curso[]=[];
  cursoSelecionado: any;
  cursoIdSelecionado:number = 0
  nomeCurso: string=''

  valorAtual: string = '';
  private subscriptions= new Subscription()

  constructor(
    private router: Router,
    private cursoService: CursoService
    ) { }
    get hasCursoIdSelecionado():boolean{
      return this.cursoIdSelecionado === undefined
    }

  ngOnInit(): void {
    this.subscriptions.add(this.cursoService.consultar("").subscribe(cursos=>{
      this.cursos=cursos
    }))
    console.log(this.cursos)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
}

  onKeyUp(evento: KeyboardEvent){
    this.nomeBusca = (<HTMLInputElement>evento.target).value;
  }
  consultar(){
    this.subscriptions.add(this.cursoService.consultar(this.nomeBusca).subscribe(cursos=>{
      this.cursos=cursos
    }))
  };

  onSelect($event:Event){ 
    const target = $event.target as HTMLInputElement; 
    this.cursoIdSelecionado = parseInt(target.value,10);
    this.cursoSelecionado = this.cursos.find(element => element.codigo === this.cursoIdSelecionado);
    this.nomeCurso =  this.cursoSelecionado.nome 
  }
  
  excluir(){
    let cursoSelecionado = this.cursos.find(element => element.codigo === this.cursoIdSelecionado); 
    
    this.subscriptions.add(this.cursoService.remover(cursoSelecionado).subscribe(console.log))
  }

}
