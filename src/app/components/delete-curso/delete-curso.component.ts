import { Subscription } from 'node_modules/rxjs';
import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {Inject} from '@angular/core';

@Component({
  selector: 'app-delete-curso',
  templateUrl: './delete-curso.component.html',
  styleUrls: ['./delete-curso.component.css']
})
export class DeleteCursoComponent implements OnInit {
  id: number=0

  curso = {
    nome: '',
    instrutor: '',
    local: '',
    cargaHoraria:'',
    DataInicio:''
  };

  cursoSelecionado: string=''

  submitted = false;

  private subscriptions= new Subscription()
  constructor(
    private router: Router,
    private cursoService: CursoService,
    @Inject(ActivatedRoute) private _activatedroute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    let cursoId = this._activatedroute.snapshot.params['id']
  }

  excluir(){
    this.subscriptions.add(this.cursoService.remover(this.cursoSelecionado).subscribe(console.log))
  }

  // excluir(){
  //   this.cursoService.excluir(this.curso).subscribe(
  //     response => {
  //       console.log(response); 
  //     },
  //     error => {
  //       console.log(error);
  //     } 
  //   );
  // }

}
