
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/model/persona';


@Injectable({
  providedIn: 'root'
})

export class PersonaService {
  URL ='http://localhost:8080/personas/';


  constructor(private http: HttpClient) {}

  public getPersona(): Observable<Persona>{
    return this.http.get<Persona> (this.URL + 'traer/perfil');
  }
  public save(persona: Persona): Observable<any>{
    return this.http.post<Persona>(this.URL + 'create', persona);
  }
  public editar(persona: Persona): Observable<any>{
    return this.http.put<any>(this.URL + 'update', persona);
  }
}


