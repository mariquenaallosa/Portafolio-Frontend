import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from 'interfaces';

@Injectable({
  providedIn: 'root'
})
export class SExperienciaService {
  expURL = 'http://localhost:8080/explab/';

  constructor(private http: HttpClient) { }

  public ObtenerDatosExperiencia(): Observable<Experiencia[]>{
    console.log("El servicio portfolio experiencia esta corriendo");
    return this.http.get<any>(this.expURL + 'lista');
  }

  public detail(id: number): Observable<Experiencia>{
    return this.http.get<any>(this.expURL + `detail/${id}`);
  } 

  public saveExperiencia(experiencia: Experiencia): Observable<any>{
    return this.http.post<any>(this.expURL + 'create', experiencia);
  }

  public editarDatosExperiencia(id: number, experiencia: Experiencia): Observable<any>{
    return this.http.put<any>(this.expURL + `update/${id}`, experiencia);
  }

  public eliminarDatosExperiencia(id: number):Observable<Experiencia>{    
    return this.http.delete<any>(this.expURL+`delete/${id}`);
  }
}