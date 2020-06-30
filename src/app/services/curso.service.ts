// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// Modelo
import { Curso } from './../models/curso';

const API_URL: string = 'http://localhost:8090/api/cursos/';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Curso[]> {
    return this.http.get<Curso[]>(API_URL + 'all');
  }

  save(element: Curso): Observable<Curso> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<Curso>(API_URL + 'save', JSON.stringify(element), {
      headers: headers,
    });
  }

  delete(id: number): Observable<Curso> {
    return this.http.get<Curso>(API_URL + 'delete/' + id);
  }
}
