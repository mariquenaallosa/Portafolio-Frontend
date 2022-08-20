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


  skillForm: FormGroup;
constructor(
  private skillsService: SkillsService,
  private tokenService: TokenService,
  private fb: FormBuilder
) {
  this.skillForm = this.fb.group({
    id:[''],
    skillsLevel:['',[Validators.required]],
    nombreSkill:['',[Validators.required]]
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
  this.skillsService.get().subscribe((data) => {
    this.skillsList = data;
  });
}

private clearForm() {
  this.skillForm.setValue({
    id:'',
    skillsLevel:'',
    nombreSkill:'',
    imgSkill:''
  });
}

private loadForm(skills: Skills) {
  this.skillForm.setValue({
    id: skills.id,
   skillsLevel: skills.skillsLevel,
   nombreSkill: skills.nombreSkill,
    imgSkill: skills.imgSkill
  });
}
onSubmit() {
  console.log(this.skillForm.value);
 let skills: Skills = this.skillForm.value;
 if (this.skillForm.get('id')?.value == '') {
   this.skillsService.save(skills).subscribe(
    (nuevaskills:Skills) => {
       this.skillsList.push(nuevaskills);
       this.reloadData();
       this.onNew()
     });
 } else {
  this.skillsService.save(skills).subscribe(
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
  let skills: Skills = this.skillsList[index];
  this.loadForm(skills);
}
onDelete(index: number) {
  let skills: Skills = this.skillsList[index];
  if (confirm('¿Está seguro que desea borrar la educación?')) {
    this.skillsService.delete(skills.id).subscribe(() => {
      this.reloadData();
    });
  }
}
}
