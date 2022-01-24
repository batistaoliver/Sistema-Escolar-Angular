import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-curso',
  templateUrl: './add-curso.component.html',
  styleUrls: ['./add-curso.component.css']
})
export class AddCursoComponent implements OnInit {
  curso = {
    nome: '',
    instrutor: '',
    local: '',
    cargaHoraria:'',
    DataInicio:''
  };
  submitted = false;

  constructor(
    private router: Router,
    private cursoService: CursoService
    ) { }

  ngOnInit(): void {
  }

  incluir(){
    this.cursoService.incluir(this.curso).subscribe(
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
