import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
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
    this.sExperiencia.get().subscribe((data) => {
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
     console.log(this.experienciaForm.value);
    let experiencia: Experiencia = this.experienciaForm.value;
    if (this.experienciaForm.get('id')?.value == '') {
      this.sExperiencia
        .save(experiencia)
        .subscribe((nuevaexperiencia: Experiencia) => {
          this.experienciaList.push(nuevaexperiencia);
          this.reloadData();
          this.onNew;
        });
    } else {
      this.sExperiencia.save(experiencia).subscribe(
        (data) => {
          this.reloadData();
        },
        (err) => {
          alert('Falló');
        }
      );
    }
  }

  onNew() {
    this.clearForm();
  }

  
onEdit(index: number){
    let experiencia: Experiencia = this.experienciaList[index];
    this.loadForm(experiencia);   
   
  }
       
  
  
  onDelete(index: number){
    let experiencia: Experiencia = this.experienciaList[index];
    if(confirm("¿Está seguro que desea borrar la experiencia?")){
      this.sExperiencia.delete(experiencia.id).subscribe(()=>{
        this.reloadData();
      });}
    }
}
