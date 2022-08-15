import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skills } from 'interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  URL= 'http://localhost:8080/skills/';
  constructor(private http: HttpClient) { }
    public obtener(): Observable<Skills[]>{
      console.log("El servicio portfolio educacion esta corriendo");
      return this.http.get<Skills[]>(this.URL + 'lista');
    }
  
    public detail(id: number): Observable<Skills>{
      return this.http.get<Skills>(this.URL + `detail/${id}`);
    } 
  
    public crearSkills(skills: Skills): Observable<any>{
      return this.http.post<any>(this.URL + 'create', skills);
    }
  
    public editar(skills: Skills): Observable<any>{
      return this.http.put<any>(this.URL + 'update', skills);
    }
  
    public eliminar(id: number): Observable<any>{
      return this.http.delete<any>(this.URL + `delete/${id}`);
    }
}
