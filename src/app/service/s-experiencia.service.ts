import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from 'interfaces';
import { EducacionComponent } from '../components/educacion/educacion.component';

@Injectable({
  providedIn: 'root'
})
export class SExperienciaService {
  expURL = 'https://portfolio-mariquenaallosa.koyeb.app/explab/';

  constructor(private http: HttpClient) { }
  
get(): Observable<Experiencia[]>{
    console.log("El servicio portfolio experiencia esta corriendo");
    return this.http.get<Experiencia[]>(this.expURL + 'lista');
  }

detail(id: number): Observable<Experiencia>{
    return this.http.get<Experiencia>(this.expURL + `detail/${id}`);
  } 

save(experiencia: Experiencia): Observable<any>{
    return this.http.post<any>(this.expURL + `create`, experiencia);
  }

edit(experiencia: Experiencia):Observable<any>{ 
     return this.http.put<any>(this.expURL+`update`, experiencia);
  } 


delete(id: number):Observable<Experiencia>{    
    return this.http.delete<any>(this.expURL+`delete/${id}`);
  }
}