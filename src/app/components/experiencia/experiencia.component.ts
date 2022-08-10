import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  experiencia : Experiencia[] =[];
  tituloExp: string = '';
  empleador: string = '';
  fechaIngreso: number = 2022;
  fechaFinal: number = 2025;
  descripcionE: string = '';

  constructor(private sExperiencia: SExperienciaService, private tokenService: TokenService, private router: Router) { }
  

  isLogged = false;

  ngOnInit(): void {
    this.cargarExperiencia();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
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

  onCreate(): void {
    const experiencia = new Experiencia(this.tituloExp, this.empleador, this.fechaIngreso,this.fechaFinal, this.descripcionE);
    this.sExperiencia.save(experiencia).subscribe(
      data=> {
        alert("Experiencia añadida");
        this.router.navigate(['']);
      }, err=> {
        alert("Falló");
        this.router.navigate(['']);
      }
    );
  }

  
}