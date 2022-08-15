import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  experienciaList : Experiencia[] = [];
  isLogged = false;
  

  experienciaForm: FormGroup;
  
  
  constructor(private sExperiencia: SExperienciaService, private tokenService: TokenService, private router: Router,private activatedRouter : ActivatedRoute, private fb: FormBuilder ) {
    this.experienciaForm = this.fb.group({
      id: [''],
      tituloExp: ['',[Validators.required]],
      empleador: ['',[Validators.required]],
      fechaIngreso: ['',[Validators.required]],
      fechaFinal: ['',[Validators.required]],
      descripcionE:['',[Validators.required]]
    });
   }
  



  ngOnInit(): void {
    this.cargarExperiencia()
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.reloadData();
    } else {
      this.isLogged = false;
    }
  }

  cargarExperiencia(): void {
      this.sExperiencia.ObtenerDatosExperiencia().subscribe(resp => { this.experienciaList = resp; })
    }

  private reloadData(){
    this.sExperiencia.ObtenerDatosExperiencia().subscribe(
      (data)=>{
        this.experienciaList = data;
    });
  }

  private clearForm(){
    this.experienciaForm.setValue({
      id:'',
      tituloExp:'',
      empleador:'',
      fechaIngreso:'2012',
      fechaFinal:'2022',
      descripcionE:''
    });
  }

  private loadForm(experiencia: Experiencia){
    this.experienciaForm.setValue({
      id: experiencia.id,
      tituloExp:experiencia.tituloExp,
      empleador:experiencia.empleador,
      fechaIngreso:experiencia.fechaIngreso,
      fechaFinal:experiencia.fechaFinal,
      descripcionE:experiencia.descripcionE
  })
  }

  onSubmit() {    
    // console.log(this.experienciaForm.value);
    let experiencia : Experiencia = this.experienciaForm.value;
    if (this.experienciaForm.get('id')?.value == ''){
      this.sExperiencia.saveExperiencia(experiencia).subscribe(
        (nuevaexperiencia: Experiencia)=>{
          this.experienciaList.push(nuevaexperiencia);
          this.reloadData();
          window.location.reload();
        }
      ); 
    }else{
      this.sExperiencia.saveExperiencia(experiencia).subscribe(
        data=> {
                alert("Experiencia añadida");
                this.router.navigate(['']);
                this.reloadData();
                window.location.reload();
              }, err=> {
                alert("Falló");
                this.router.navigate(['']);
              }
            );
    }     
  }

  onNewExp(){
    this.clearForm();
  }

  onEditarExperiencia(index: number){
    let experiencia: Experiencia = this.experienciaList[index];
    this.loadForm(experiencia);    
  }
}

  // delete(index: number){
  //   let experiencia: Experiencia = this.experienciaList[index];
  //   if(confirm("¿Está seguro que desea borrar la experiencia?")){
  //     this.sExperiencia.delete(experiencia.id).subscribe(()=>{
  //       this.reloadData();
  //     })
  //   }
  // }  


//   delete(id?: number){
//     if(id != undefined){
//       this.sExperiencia.delete(id).subscribe(
//         {next: data => { this.cargarExperiencia();
//         }, 
//         error : err => {
//         alert("No se pudo borrar la experiencia");
//       } 
//     });
//     }
// }
  // onCreate(): void {
  //   const experiencia = new Experiencia(this.tituloExp, this.empleador, this.fechaIngreso,this.fechaFinal, this.descripcionE);
  //   this.sExperiencia.save(experiencia).subscribe(
  //     data=> {
  //       alert("Experiencia añadida");
  //       this.router.navigate(['']);
  //       window.location.reload();
  //     }, err=> {
  //       alert("Falló");
  //       this.router.navigate(['']);
  //     }
  //   );
  // }



  // cargarExperiencia(): void {
  //   this.sExperiencia.lista().subscribe(resp => { this.experiencia = resp; })
  // }

  
//   }
//   // onUpdate(): void{
//   //   const id = this.activatedRouter.snapshot.params['id'];
//   //   this.sExperiencia.update(id, this.experiencia).subscribe(
//   //     data => {
//   //       this.router.navigate(['']);
//   //     }, err => {
//   //       alert("Error al modificar la educacion");
//   //       this.router.navigate(['']);
//   //     }
//   //   )

