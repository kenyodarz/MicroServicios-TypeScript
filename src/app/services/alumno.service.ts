// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// Modelo
import { Alumno } from './../models/alumno';

const API_URL: string = 'http://localhost:8090/api/alumnos/';

@Injectable({
  providedIn: 'root',
})

export class AlumnoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(API_URL + 'all');
  }

  save(alumno: Alumno): Observable<Alumno> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<Alumno>(API_URL + 'save', JSON.stringify(alumno), {
      headers: headers,
    });
  }

  delete(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(API_URL + 'delete/' + id);
  }
}
