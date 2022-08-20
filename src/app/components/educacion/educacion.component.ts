import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Educacion } from 'interfaces';
import { EducacionService } from 'src/app/service/educacion.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit {
  educacionList: Educacion[] = [];
  isLogged = false;


  educacionForm: FormGroup;

  constructor(
    private educacionS: EducacionService,
    private tokenService: TokenService,
    private fb: FormBuilder
  ) {
    this.educacionForm = this.fb.group({
      id: [''],
      tituloEd: ['', [Validators.required]],
      institucion: ['', [Validators.required]],
      fechaIngreso: ['', [Validators.required]],
      fechaFinal: ['', [Validators.required]],
      descripcionEd: ['', [Validators.required]]
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

  private reloadData() {
    this.educacionS.get().subscribe((data) => {
      this.educacionList = data;
    });
  }

  private clearForm() {
    this.educacionForm.setValue({
      id:'',
      tituloEd:'',
      institucion:'',
      fechaIngreso:'',
      fechaFinal:'',
      descripcionEd:'',
    });
  }

  private loadForm(educacion: Educacion) {
    this.educacionForm.setValue({
      id: educacion.id,
      tituloEd: educacion.tituloEd,
      institucion: educacion.institucion,
      fechaIngreso: educacion.fechaIngreso,
      fechaFinal: educacion.fechaFinal,
      descripcionEd: educacion.descripcionEd
    });
  }

  onSubmit() {
    console.log(this.educacionForm.value);
   let educacion: Educacion = this.educacionForm.value;
   if (this.educacionForm.get('id')?.value == '') {
     this.educacionS.save(educacion).subscribe(
      (nuevaeducacion: Educacion) => {
         this.educacionList.push(nuevaeducacion);
         this.reloadData();
         this.onNew();
       });
   } else {
     this.educacionS.save(educacion).subscribe(
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

  onEdit(index: number) {
    let educacion: Educacion = this.educacionList[index];
    this.loadForm(educacion);
  }
  onDelete(index: number) {
    let educacion: Educacion = this.educacionList[index];
    if (confirm('¿Está seguro que desea borrar la educación?')) {
      this.educacionS.delete(educacion.id).subscribe(() => {
        this.reloadData();
      });
    }
  }
}
