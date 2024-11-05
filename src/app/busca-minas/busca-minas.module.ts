import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegoBuscaminasComponent } from './juego-buscaminas/juego-buscaminas.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    JuegoBuscaminasComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    JuegoBuscaminasComponent
  ]
})
export class BuscaMinasModule { }
