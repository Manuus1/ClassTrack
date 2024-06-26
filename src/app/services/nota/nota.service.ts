// nota.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ModelNota } from 'src/app/modelos/notamodel';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  constructor(private _http: HttpClient) {}

  superbaseUrl = 'https://alzycbtmqtcdkkddvxms.supabase.co/rest/v1/';
  supabaseHeaders = new HttpHeaders().set( "apiKey",'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsenljYnRtcXRjZGtrZGR2eG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2NjYzMTQsImV4cCI6MjAzMDI0MjMxNH0.fNqIvTPGHvKcN-SpZp51-grfIxt9DHBSTLbosxhdHFU'
  )

  agregarNotaAlumnoAsignatura(idAlumno: string, idAsignatura: number, nota: number): Observable<string | any> {
    const nuevaNota: ModelNota = {
      id_alumno: idAlumno,
      id_asignatura: idAsignatura,
      nota: nota
    };
    return this._http.post<any>(this.superbaseUrl + 'NOTA', nuevaNota, { headers: this.supabaseHeaders });
  }

  actualizarNotaAlumnoAsignatura(idNota: number, nota: number): Observable<any> {
    return this._http.patch<any>(`${this.superbaseUrl}NOTA?id=eq.${idNota}`, { nota: nota }, { headers: this.supabaseHeaders });
  }

  obtenerTodaNota(): Observable<ModelNota[]> {
    return this._http.get<ModelNota[]>(this.superbaseUrl + 'NOTA', { headers: this.supabaseHeaders })
      .pipe(
        catchError(error => {
          console.error('Error al obtener notas:', error);
          return of([]); // Devolver un array vacío en caso de error
        })
      );
  }

  obtenerNotasPorAlumnoYAsignatura(idAlumno: string, idAsignatura: number): Observable<ModelNota[]> {
    return this._http.get<ModelNota[]>(`${this.superbaseUrl}NOTA?select=*&id_alumno=eq.${idAlumno}&id_asignatura=eq.${idAsignatura}`, { headers: this.supabaseHeaders })
      .pipe(
        catchError(error => {
          console.error('Error al obtener notas del alumno y asignatura:', error);
          return of([]); // Devolver un array vacío en caso de error
        })
      );
  }

  obtenerNotasPorAlumno(idAlumno: string): Observable<ModelNota[]> {
    return this._http.get<ModelNota[]>(`${this.superbaseUrl}NOTA?select=*&id_alumno=eq.${idAlumno}`, { headers: this.supabaseHeaders })
      .pipe(
        catchError(error => {
          console.error('Error al obtener notas:', error);
          return of([]); // Devolver un array vacío en caso de error
        })
      );
  }
}
