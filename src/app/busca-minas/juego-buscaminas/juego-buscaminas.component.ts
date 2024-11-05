import { Component } from '@angular/core';

@Component({
  selector: 'app-juego-buscaminas',
  templateUrl: './juego-buscaminas.component.html',
  styleUrls:['./juego-buscaminas.component.css']
})
export class JuegoBuscaminasComponent {
  tamanoCuadricula: number = 0; 
  cantidadBombas: number = 0; 
  cuadricula: any[][] = []; 
  juegoTerminado: boolean = false; 

  iniciarJuego() {
    if (this.cantidadBombas >= this.tamanoCuadricula * this.tamanoCuadricula) {
      alert('La cantidad de bombas debe ser menor que la cantidad de celdas.');
      return;
    }

    this.juegoTerminado = false;
    this.generarCuadricula();
    this.colocarBombas();
    this.calcularNumeros();
  }

  generarCuadricula() {
    this.cuadricula = Array(this.tamanoCuadricula).fill(null).map(() => 
      Array(this.tamanoCuadricula).fill({ esBomba: false, revelado: false, bombasCercanas: 0 })
    );
  }

  colocarBombas() {
    let posiciones = new Set<string>();

    while (posiciones.size < this.cantidadBombas) {
      const fila = Math.floor(Math.random() * this.tamanoCuadricula);
      const columna = Math.floor(Math.random() * this.tamanoCuadricula);
      const posicion = `${fila},${columna}`;

      if (!posiciones.has(posicion)) {
        posiciones.add(posicion);
        this.cuadricula[fila][columna] = { ...this.cuadricula[fila][columna], esBomba: true };
      }
    }
  }

  calcularNumeros() {
    // Calcula el número de bombas cercanas para cada celda
    for (let fila = 0; fila < this.tamanoCuadricula; fila++) {
      for (let columna = 0; columna < this.tamanoCuadricula; columna++) {
        if (this.cuadricula[fila][columna].esBomba) continue;
        let contadorBombas = 0;

        // Verifica las celdas 
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const nuevaFila = fila + i;
            const nuevaColumna = columna + j;
            if (
              nuevaFila >= 0 && nuevaFila < this.tamanoCuadricula &&
              nuevaColumna >= 0 && nuevaColumna < this.tamanoCuadricula &&
              this.cuadricula[nuevaFila][nuevaColumna].esBomba
            ) {
              contadorBombas++;
            }
          }
        }
        this.cuadricula[fila][columna] = { ...this.cuadricula[fila][columna], bombasCercanas: contadorBombas };
      }
    }
  }

  revelarCelda(fila: number, columna: number) {
    if (this.cuadricula[fila][columna].revelado || this.juegoTerminado) return;
    this.cuadricula[fila][columna].revelado = true;

    if (this.cuadricula[fila][columna].esBomba) {
      this.juegoTerminado = true;
      alert('¡Game Over! Has tocado una bomba 💣');
    } else if (this.cuadricula[fila][columna].bombasCercanas === 0) {
      this.revelarCeldasAdyacentes(fila, columna);
    }
  }

  revelarCeldasAdyacentes(fila: number, columna: number) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const nuevaFila = fila + i;
        const nuevaColumna = columna + j;
        if (
          nuevaFila >= 0 && nuevaFila < this.tamanoCuadricula &&
          nuevaColumna >= 0 && nuevaColumna < this.tamanoCuadricula
        ) {
          this.revelarCelda(nuevaFila, nuevaColumna);
        }
      }
    }
  }
}
