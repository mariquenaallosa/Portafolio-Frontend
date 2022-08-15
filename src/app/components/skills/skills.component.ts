import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skills } from 'interfaces';
import { SkillsService } from 'src/app/service/skills.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
    skillsList: Skills[] = [];
    isLogged = false;


  hardSkillForm: FormGroup;
  constructor(
    private skillsService: SkillsService,
    private tokenService: TokenService,
    private fb: FormBuilder
  ) {
    this.hardSkillForm = this.fb.group({
      id:[''],
      skillsLevel:['',[Validators.required]],
      nombreSkill:['',[Validators.required]],
      imgSkill: ['', [Validators.required]]
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
    this.skillsService.obtener().subscribe((data) => {
      this.skillsList = data;
    });
  }

  private clearForm() {
    this.hardSkillForm.setValue({
      id:'',
      skillsLevel:'',
      nombreSkill:'',
      imgSkill:''
    });
  }

  private loadForm(skills: Skills) {
    this.hardSkillForm.setValue({
      id: skills.id,
     skillsLevel: skills.skillsLevel,
     nombreSkill: skills.nombreSkill,
      imgSkill: skills.imgSkill
    });
  }
  onSubmit() {
    console.log(this.hardSkillForm.value);
   let skills: Skills = this.hardSkillForm.value;
   if (this.hardSkillForm.get('id')?.value == '') {
     this.skillsService.crearSkills(skills).subscribe(
      (nuevaskills:Skills) => {
         this.skillsList.push(nuevaskills);
         this.reloadData();
         window.location.reload();
       });
   } else {
    this.skillsService.crearSkills(skills).subscribe(
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
  onEditar(index: number) {
    let skills: Skills = this.skillsList[index];
    this.loadForm(skills);
  }
  onEliminarEducacion(index: number) {
    let skills: Skills = this.skillsList[index];
    if (confirm('¿Está seguro que desea borrar la educación?')) {
      this.skillsService.eliminar(skills.id).subscribe(() => {
        this.reloadData();
      });
    }
  }
}
