import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'interfaces';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  // persona: Persona = new Persona("","","","","");
  persona : Persona [] = [];
  isLogged = false;

  personaForm : FormGroup;
  constructor(
    private personaService: PersonaService,
    private tokenService: TokenService,
    private fb:FormBuilder) { 
      this.personaForm = this.fb.group({
        id:['', [Validators.required]],
        nombre:['',[Validators.required]],
        apellido: ['', [Validators.required]],
        titulo: ['', [Validators.required]],
        about: ['', [Validators.required]],
        photoUrl: ['', [Validators.required]]

      });
     }


   

    ngOnInit(): void {
      this.reloadData();
      if(this.tokenService.getToken()){
        this.isLogged = true;
      }else{
        this.isLogged = false;
      }
    }


    private reloadData() {
      this.personaService.get().subscribe(data => {this.persona = data});
    }

    private loadForm(persona:Persona) {
      this.personaForm.setValue({
        id:persona.id,
        nombre: persona.nombre,
        apellido: persona.apellido,
        titulo: persona.titulo,
        about: persona.about,
        photoUrl: persona.photoUrl
      });
    }


    onSubmit() {
      console.log(this.personaForm.value);
     let persona: Persona = this.personaForm.value;
     if (this.personaForm.get('id')?.value == '') {
       this.personaService.save(persona).subscribe(
        (nuevapersona: Persona) => {
           this.persona.push(nuevapersona);
           this.reloadData();
         });
  
     } else {
       this.personaService.save(persona).subscribe(
         (data) => {
           this.reloadData();
         }
        
       );
       window.location.reload();
     }
   } 
    
    onEdit(index:number) {
      let persona : Persona = this.persona[index];
      this.loadForm(persona);
    }
   
    
}
