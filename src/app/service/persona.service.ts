
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from 'interfaces';


@Injectable({
  providedIn: 'root'
})

export class PersonaService {
  URL ='portfolio-mariquenaallosa.koyeb.app/personas/';


  constructor(private http: HttpClient) {}

  public get(): Observable<Persona[]>{
    console.log("El servicio portfolio persona esta corriendo");
    return this.http.get<Persona[]> (this.URL + 'traer');
  }
  public save(persona: Persona): Observable<any>{
    return this.http.post<Persona>(this.URL + 'crear', persona);
  }
  public update(persona: Persona): Observable<any>{
    return this.http.put<any>(this.URL + 'update', persona);
  }
}


