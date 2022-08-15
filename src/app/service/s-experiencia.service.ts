import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from 'interfaces';
import { EducacionComponent } from '../components/educacion/educacion.component';

@Injectable({
  providedIn: 'root'
})
export class SExperienciaService {
  expURL = 'http://localhost:8080/explab/';

  constructor(private http: HttpClient) { }
  
obtenerDatosExperiencia(): Observable<Experiencia[]>{
    console.log("El servicio portfolio experiencia esta corriendo");
    return this.http.get<Experiencia[]>(this.expURL + 'lista');
  }

detail(id: number): Observable<Experiencia>{
    return this.http.get<Experiencia>(this.expURL + `detail/${id}`);
  } 

crearDatosExperiencia(experiencia: Experiencia): Observable<any>{
    return this.http.post<any>(this.expURL + `create`, experiencia);
  }

editarDatosExperiencia(experiencia: Experiencia):Observable<any>{ 
     return this.http.put<any>(this.expURL+`update`, experiencia);
  } 


eliminarDatosExperiencia(id: number):Observable<Experiencia>{    
    return this.http.delete<any>(this.expURL+`delete/${id}`);
  }
}