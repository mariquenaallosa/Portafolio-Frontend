import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from 'interfaces';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  URL= 'http://localhost:8080/educacion/';
  constructor(private http: HttpClient) { }
    public obtenerDatosEducacion(): Observable<Educacion[]>{
      console.log("El servicio portfolio educacion esta corriendo");
      return this.http.get<Educacion[]>(this.URL + 'lista');
    }
  
    public detail(id: number): Observable<Educacion>{
      return this.http.get<Educacion>(this.URL + `detail/${id}`);
    } 
  
    public crearDatosEducacion(educacion: Educacion): Observable<any>{
      return this.http.post<any>(this.URL + 'create', educacion);
    }
  
    public editarDatosEducacion(educacion: Educacion): Observable<any>{
      return this.http.put<any>(this.URL + 'update', educacion);
    }
  
    public eliminarDatosEducacion(id: number): Observable<any>{
      return this.http.delete<any>(this.URL + `delete/${id}`);
    }
  }

