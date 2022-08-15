import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skills } from 'interfaces';
import { SkillsService } from 'src/app/service/skills.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-soft-skills',
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.css']
})
export class SoftSkillsComponent implements OnInit {
  softSkillsList: Skills[] = [];
  isLogged = false;


softSkillForm: FormGroup;
constructor(
  private skillsService: SkillsService,
  private tokenService: TokenService,
  private fb: FormBuilder
) {
  this.softSkillForm = this.fb.group({
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
    this.softSkillsList = data;
  });
}

private clearForm() {
  this.softSkillForm.setValue({
    id:'',
    skillsLevel:'',
    nombreSkill:'',
    imgSkill:''
  });
}

private loadForm(skills: Skills) {
  this.softSkillForm.setValue({
    id: skills.id,
   skillsLevel: skills.skillsLevel,
   nombreSkill: skills.nombreSkill,
    imgSkill: skills.imgSkill
  });
}
onSubmit() {
  console.log(this.softSkillForm.value);
 let skills: Skills = this.softSkillForm.value;
 if (this.softSkillForm.get('id')?.value == '') {
   this.skillsService.crearSkills(skills).subscribe(
    (nuevaskills:Skills) => {
       this.softSkillsList.push(nuevaskills);
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
  let skills: Skills = this.softSkillsList[index];
  this.loadForm(skills);
}
onEliminarEducacion(index: number) {
  let skills: Skills = this.softSkillsList[index];
  if (confirm('¿Está seguro que desea borrar la educación?')) {
    this.skillsService.eliminar(skills.id).subscribe(() => {
      this.reloadData();
    });
  }
}
}
