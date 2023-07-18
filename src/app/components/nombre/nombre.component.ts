import { Component, OnInit } from '@angular/core';

/*---conectar servicio---*/
import { ConjuntoService } from '../../servicios/conjunto.service';


/*----usar ruta----*/
import { Router } from "@angular/router"

@Component({
  selector: 'app-nombre',
  templateUrl: './nombre.component.html',
  styleUrls: ['./nombre.component.css']
})
export class NombreComponent implements OnInit {

  nombrePersona:string = ""

  constructor(private usarRuta:Router, private conectarServicio:ConjuntoService ) { }

  ngOnInit(): void {

    /*----traer nombre----*/
    console.log( this.conectarServicio.guardarNombre );
    this.nombrePersona = this.conectarServicio.guardarNombre;
      

  }

  cerrarSesion(){

    this.conectarServicio.destruirToken();
    this.usarRuta.navigate( ['/login'] );
  
  }

}
