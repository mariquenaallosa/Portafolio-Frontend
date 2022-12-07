import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from 'interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  URL= 'https://portfolio-mariquenaallosa.koyeb.app/proyectos/';
  constructor(private http: HttpClient) { }
    get(): Observable<Proyecto[]>{
    console.log("El servicio portfolio proyectos esta corriendo");
    return this.http.get<Proyecto[]>(this.URL + 'lista');
  }

  detail(id: number): Observable<Proyecto>{
    return this.http.get<Proyecto>(this.URL + `detail/${id}`);
  } 

 save(proyecto: Proyecto): Observable<any>{
    return this.http.post<any>(this.URL + 'create', proyecto);
  }

  edit(proyecto: Proyecto): Observable<any>{
    return this.http.put<any>(this.URL + 'update', proyecto);
  }

 delete(id: number): Observable<any>{
    return this.http.delete<any>(this.URL + `delete/${id}`);
  }
}
