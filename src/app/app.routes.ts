import { Routes } from '@angular/router';
import { EventoListaComponent } from './evento-lista/evento-lista.component';
import { EventoFormComponent } from './evento-form/evento-form.component';

export const routes: Routes = [
    {path: 'listagem', component: EventoListaComponent},
    {path: 'cadastro', component: EventoFormComponent},
    {path: '', redirectTo:'/listagem', pathMatch: 'full'},
];
