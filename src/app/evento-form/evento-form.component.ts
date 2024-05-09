import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Evento } from '../evento';
import { EventoService } from '../evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evento-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  providers: [EventoService],
  templateUrl: './evento-form.component.html',
  styleUrl: './evento-form.component.css'
})
export class EventoFormComponent {

  evento: Evento = new Evento();
  inclusao: boolean = true;


  constructor(private repositorio: EventoService,
              private router: Router,
              private rotaAtual: ActivatedRoute){}

  ngOnInit(): void {
    this.inclusao = true;
    this.rotaAtual.paramMap.pipe(
       switchMap(
         params =>{
           if(params.get("nome")){
              const nome = String(params.get("nome"));
              this.inclusao=false;
              return this.repositorio.obter(nome);
           }
           else return of<Evento>(new Evento());
         })
    ).subscribe(p=>this.evento=p);
 }

  inserir = () => {
    this.repositorio.adicionar(this.evento).subscribe(
      _ => {
        this.evento = new Evento();
      }
    )
  }

  alterar = () => {
    this.repositorio.alterar(this.evento).subscribe(
      _ => {
        this.evento = new Evento();
      }
    )
  }

}
