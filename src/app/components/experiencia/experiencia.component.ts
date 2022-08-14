import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Educacion } from 'src/app/model/educacion';
import { Experiencia } from 'src/app/model/experiencia';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  experiencia : Experiencia[] = [];
  tituloExp: string = '';
  empleador: string = '';
  fechaIngreso: number = 0;
  fechaFinal: number = 0;
  descripcionE: string = '';


  constructor(private sExperiencia: SExperienciaService, private tokenService: TokenService, private router: Router,private activatedRouter : ActivatedRoute) { }
  

  isLogged = false;

  ngOnInit(): void {
    this.cargarExperiencia();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  onCreate(): void {
    const experiencia = new Experiencia(this.tituloExp, this.empleador, this.fechaIngreso,this.fechaFinal, this.descripcionE);
    this.sExperiencia.save(experiencia).subscribe(
      data=> {
        alert("Experiencia añadida");
        this.router.navigate(['']);
        window.location.reload();
      }, err=> {
        alert("Falló");
        this.router.navigate(['']);
      }
    );
  }



  cargarExperiencia(): void {
    this.sExperiencia.lista().subscribe(resp => { this.experiencia = resp; })
  }

  delete(id?: number){
    if(id != undefined){
      this.sExperiencia.delete(id).subscribe(
        {next: data => { this.cargarExperiencia();
        }, 
        error : err => {
        alert("No se pudo borrar la experiencia");
      } 
    });
    }
  }

// onUpdate(id?: number){
//   const id =this.activatedRouter.snapshot.params["id"];
//   this.sExperiencia.update(id, this.experiencia).subscribe(
//     data => {
//       this.router.navigate(['']);
//     }, err => {
//       alert("Error al modificar la educacion");
//       this.router.navigate(['']);
//     }
//   )
// }
  
}