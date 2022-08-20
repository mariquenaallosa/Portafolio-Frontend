import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyecto } from 'interfaces';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectoList: Proyecto[] = [];
  isLogged= false;


  proyectoForm: FormGroup;
  constructor(
    private proyectoService: ProyectosService,
    private tokenService: TokenService,
    private fb: FormBuilder
  ) { 
    this.proyectoForm = this.fb.group({
      id: [''],
      titulo: ['',[Validators.required]],
      descripcion:['', [Validators.required]],
      imgUrl: ['', [Validators.required]],
      repoUrl: ['', [Validators.required]],
      demoUrl: ['', [Validators.required]],

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
    this.proyectoService.get().subscribe((data) => {
      this.proyectoList = data;
    });
  }

  private clearForm() {
    this.proyectoForm.setValue({
      id: '',
      titulo: '',
      descripcion: '',
      imgUrl: '',
      repoUrl: '',
      demoUrl: '',
    });
  }

  private loadForm(proyecto : Proyecto) {
    this.proyectoForm.setValue({
      id: proyecto.id,
      titulo: proyecto.titulo,
      descripcion: proyecto.descripcion,
      imgUrl: proyecto.imgUrl,
      repoUrl: proyecto.repoUrl,
      demoUrl: proyecto.demoUrl,

    })
  }
  onSubmit() {
    console.log(this.proyectoForm.value);
   let proyecto: Proyecto = this.proyectoForm.value;
   if (this.proyectoForm.get('id')?.value == '') {
     this.proyectoService.save(proyecto).subscribe(
      (nuevaproyecto: Proyecto) => {
         this.proyectoList.push(nuevaproyecto);
         this.reloadData();
         this.onNew();
       });
   } else {
     this.proyectoService.save(proyecto).subscribe(
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
  let proyecto: Proyecto = this.proyectoList[index];
  this.loadForm(proyecto);
}
onDelete(index: number) {
  let proyecto: Proyecto = this.proyectoList[index];
  if (confirm('¿Está seguro que desea borrar la educación?')) {
    this.proyectoService.delete(proyecto.id).subscribe(() => {
      this.reloadData();
    });
  }
}


}
