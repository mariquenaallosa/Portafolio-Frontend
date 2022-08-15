import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Experiencia } from 'interfaces';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {
  experienciaList: Experiencia[] = [];
  isLogged = false;

  experienciaForm: FormGroup;

  constructor(
    private sExperiencia: SExperienciaService,
    private tokenService: TokenService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.experienciaForm = this.fb.group({
      id: [''],
      tituloExp: ['', [Validators.required]],
      empleador: ['', [Validators.required]],
      fechaIngreso: ['', [Validators.required]],
      fechaFinal: ['', [Validators.required]],
      descripcionE: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.reloadData();
  }

  reloadData() {
    this.sExperiencia.ObtenerDatosExperiencia().subscribe((data) => {
      this.experienciaList = data;
    });
  }

  clearForm() {
    this.experienciaForm.setValue({
      id: '',
      tituloExp: '',
      empleador: '',
      fechaIngreso: '',
      fechaFinal: '',
      descripcionE: '',
    });
  }

  loadForm(experiencia: Experiencia) {
    this.experienciaForm.setValue({
      id: experiencia.id,
      tituloExp: experiencia.tituloExp,
      empleador: experiencia.empleador,
      fechaIngreso: experiencia.fechaIngreso,
      fechaFinal: experiencia.fechaFinal,
      descripcionE: experiencia.descripcionE
    });
  }

  onSubmit() {
    let experiencia: Experiencia = this.experienciaForm.value;
    if (this.experienciaForm.get('id')?.value == '') {
      this.sExperiencia
        .saveExperiencia(experiencia)
        .subscribe((nuevaexperiencia: Experiencia) => {
          this.experienciaList.push(nuevaexperiencia);
          this.reloadData();
          window.location.reload();
        });
    } else {
      this.sExperiencia.saveExperiencia(experiencia).subscribe(
        (data) => {
          alert('Experiencia añadida');
          this.router.navigate(['']);
          this.reloadData();
          window.location.reload();
        },
        (err) => {
          alert('Falló');
          this.router.navigate(['']);
        }
      );
    }
  }

  onNewExp() {
    this.clearForm();
  }

  onEditarExperiencia(index: number){
    let experiencia: Experiencia = this.experienciaList[index];
    this.loadForm(experiencia);    
  }
  
  onEliminarExperiencia(index: number){
    let experiencia: Experiencia = this.experienciaList[index];
    if(confirm("¿Está seguro que desea borrar la experiencia?")){
      this.sExperiencia.eliminarDatosExperiencia(experiencia.id).subscribe(()=>{
        this.reloadData();
      });}
    }
}
