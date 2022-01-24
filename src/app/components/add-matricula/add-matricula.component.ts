import { Component, OnInit } from '@angular/core';
import { Curso, CursoService } from 'src/app/services/curso.service';
import { Subscription } from 'rxjs';
import { Aluno, AlunoService } from 'src/app/services/aluno.service';
import { Matricula, MatriculaService } from 'src/app/services/matricula.service';

import {
  FormBuilder,
  AbstractControl,
  Validators,
  FormArray,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-add-matricula',
  templateUrl: './add-matricula.component.html',
  styleUrls: ['./add-matricula.component.css']
})
export class AddMatriculaComponent implements OnInit {
  
  public matriculaForm: any;

  cursos: Curso[]=[];
  alunos: Aluno[]=[];
  private subscriptions = new Subscription();
  nomeBusca: String=''
  codAlunoSelecionado: number=0
  alunoSelecionado:any
  codCursoSelecionado: number=0
  cursoSelecionado:any
  codigoTeste:any;
  
  constructor(
    private alunoService: AlunoService,
    private matriculaService: MatriculaService,
    private formBuilder: FormBuilder,
    private cursoService: CursoService
  ) { 
    this.matriculaForm = formBuilder.group({
      dataInicio:'',
      codigo:'',
      alunoCodigo: '',
      cursos: formBuilder.array([]),
      curso: formBuilder.group({
        codigo: ['', Validators.required],
        dataInicio: ['', Validators.required],
      }),
    });
  }

  get alunoCodigo(): AbstractControl {
    return this.matriculaForm.get('alunoCodigo');
  }

  get codigo(): AbstractControl {
    return this.matriculaForm.get('codigo');
  }
  
  get cursosControl(): FormArray {
    return this.matriculaForm.get('cursos') as FormArray;
  }

  get cursoGrupo(): FormGroup {
    return this.matriculaForm.get('curso') as FormGroup;
  }



  get dataInicio(): FormGroup {
    return this.matriculaForm.get('dataInicio') as FormGroup;
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.alunoService.consultar('').subscribe((alunos) => {
        this.alunos = alunos;
        console.log(this.alunos)
      })
    );
    this.subscriptions.add(
      this.cursoService.consultar('').subscribe((cursos) => {
        this.cursos = cursos;
      })
    );
  }


  onKeyUp(evento: KeyboardEvent){
    this.nomeBusca = (<HTMLInputElement>evento.target).value;
    console.log(this.nomeBusca)
  }

  doSomething(){
    console.log(this.alunoCodigo)
    this.codAlunoSelecionado = parseInt(this.alunoCodigo.value, 10)
    this.alunoSelecionado = this.alunos.find((a) => a.codigo == this.codAlunoSelecionado)
    console.log(this.alunoSelecionado)
    console.log(this.cursos)
  }

  doSomething2(){
    this.codCursoSelecionado = parseInt(this.codigo.value, 10)
    this.cursoSelecionado = this.cursos.find((c) => c.codigo == this.codCursoSelecionado)
    console.log(this.cursoSelecionado)
  }

  incluir(){
      const matricula: Matricula = {
        codigo: parseInt(this.alunoCodigo.value, 10),
        aluno: this.alunoSelecionado,
        listaMatriculaCurso: this.cursosControl.value,
      };
    console.log(matricula)
    this.subscriptions.add(
      this.matriculaService.incluir(matricula).subscribe(async (response) => {
        console.log(response);
        //await this.router.navigate(['/matricula']);
      })
    );
  }
  
  adicionarCurso() {
    const curso = this.cursos.find(
      (c) => c.codigo === parseInt(this.codigo.value, 10)
    );
    const control = this.formBuilder.group({
      curso,
      dataMatriculaCurso: this.dataInicio.value,
      codigo: this.cursosControl.length,
    });
    this.cursosControl.push(control);
    this.cursoGrupo.reset();
  }

  //this.alunos.find(element => element.codigo === this.alunoIdSelecionado);
  excluirCursoTabela(index: number) {
    this.cursosControl.removeAt(index);
  }

}
