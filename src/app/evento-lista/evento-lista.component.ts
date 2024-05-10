import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventoService } from '../evento.service';
import { Evento } from '../evento';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-evento-lista',
  standalone: true,
  imports: [CommonModule , HttpClientModule],
  providers: [EventoService],
  templateUrl: './evento-lista.component.html',
  styleUrl: './evento-lista.component.css'
})
export class EventoListaComponent {


  dados: Array<Evento> = []

  constructor(private repositorio: EventoService,
              private router: Router){
  };

  ngOnInit(): void{
    this.repositorio.obterTodos().subscribe(
      (evts: Evento[]) => this.dados = evts
    )
  }

  excluir = (nome: string) => {
    this.repositorio.excluir(nome).subscribe(
      _ => {
        this.repositorio.obterTodos().subscribe(
          (evts: Evento[]) => this.dados = evts
        )
      }
    )
  }

  alterar = (_nome: string) => {
    this.router.navigate(['/cadastro',{nome: _nome}]);
  }


}
