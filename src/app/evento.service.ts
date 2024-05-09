import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { Evento } from './evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private eventosUrl = "http://localhost:3000/produtos";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  private handleError<T>(operation:string = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(operation+" :: "+error); 
      return of(result as T);
    };
  }

  adicionar(evento: Evento): Observable<void>{
    return this.http.post<void>(this.eventosUrl, evento, 
                                this.httpOptions).pipe(
        tap(_ => console.log('Evento adicionado')),
        catchError(this.handleError<void>('adicionar'))
      );
  }

  obterTodos():Observable<Evento[]> {
    return this.http.get<Evento[]>(this.eventosUrl).pipe(
        tap((prods: Evento[]) => console.log(`Evento recuperados: ${prods.length}`)),
        catchError(this.handleError<Evento[]>('obterTodos', []))
      );
  }

  excluir(nome: string): Observable<void>{
    return this.http.delete<void>(`${this.eventosUrl}/${nome}`,this.httpOptions).pipe(catchError(this.handleError<void>('excluir')));
  }

  obter(nome: string): Observable<Evento> {
    return this.http.get<Evento>(`${this.eventosUrl}/${nome}`).pipe(
      tap((prod: Evento) => console.log(`Evento nome ${prod.nome} recuperado`)),
      catchError(this.handleError<Evento>('obter', new Evento()))
    );
  }

  alterar(evento:Evento): Observable<void> {
    return this.http.put<void>(`${this.eventosUrl}/${evento.nome}`,evento,this.httpOptions).pipe(
        tap(_ => console.log(`evento alterado ${evento.classificacao}`)),
        catchError(this.handleError<void>('alteração'))
    );
  }
}
