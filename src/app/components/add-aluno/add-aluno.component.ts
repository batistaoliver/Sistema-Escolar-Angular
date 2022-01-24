import { Component, OnInit } from '@angular/core';
import { AlunoService } from 'src/app/services/aluno.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-aluno',
  templateUrl: './add-aluno.component.html',
  styleUrls: ['./add-aluno.component.css']
})
export class AddAlunoComponent implements OnInit {
  aluno = {
    nome: '',
    dataNascimento:''
  };
  submitted = false;

  constructor(
    private router: Router,
    private alunoService: AlunoService
    ) { }

  ngOnInit(): void {
  }

  incluir(){
    this.alunoService.incluir(this.aluno).subscribe(
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
