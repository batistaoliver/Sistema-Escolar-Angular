import { Subscription } from 'node_modules/rxjs';
import { Component, OnInit } from '@angular/core';
import { MatriculaService } from 'src/app/services/matricula.service';
import { AlunoService } from 'src/app/services/aluno.service';
import { Router } from '@angular/router';
import { Aluno } from 'src/app/services/aluno.service';
import { Matricula} from 'src/app/services/matricula.service';


@Component({
  selector: 'app-list-matricula',
  templateUrl: './list-matricula.component.html',
  styleUrls: ['./list-matricula.component.css']
})
export class ListMatriculaComponent implements OnInit {

  alunos: Aluno[] = [];
  matriculas: Matricula[] = [];
  matriculaSelecionada: any;
  matriculaIdSelecionada: number =0;
  nomeAlunoBusca: string=''
  codigoAlunoBusca: string=''
  matriculaBusca:any

  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private matriculaService: MatriculaService,
    private alunoService: AlunoService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.alunoService.consultar('').subscribe((alunos) => {
        this.alunos = alunos;
      })
    );
    this.subscriptions.add(
      this.matriculaService.consultar('').subscribe((matriculas) => {
        this.matriculas = matriculas;
        console.log(matriculas)
      })
    );
    
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
}

  onKeyUp(evento: KeyboardEvent){
    this.nomeAlunoBusca = (<HTMLInputElement>evento.target).value;
  }
  consultar(){
    this.matriculaBusca = this.matriculas.find(element => element.aluno?.nome === this.nomeAlunoBusca);
    if(this.matriculaBusca){
      this.subscriptions.add(this.matriculaService.consultar(this.matriculaBusca.aluno?.codigo).subscribe(matriculas=>{
        this.matriculas=matriculas
      }))
    }else{
      this.subscriptions.add(
        this.matriculaService.consultar('').subscribe((matriculas) => {
          this.matriculas = matriculas;
          console.log(matriculas)
        })
      );
    }
  };

  onSelect($event:Event){ 
    const target = $event.target as HTMLInputElement; 
    this.matriculaIdSelecionada = parseInt(target.value,10);
    this.matriculaSelecionada = this.matriculas.find(element => element.codigo === this.matriculaIdSelecionada);
    console.log(this.matriculaSelecionada)
  }
  
  excluir(){
    this.subscriptions.add(this.matriculaService.remover(this.matriculaSelecionada).subscribe(console.log))
  }

}
