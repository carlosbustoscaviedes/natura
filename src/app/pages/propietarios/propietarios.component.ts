import { Component, OnInit } from '@angular/core';

/*---usar ruta----*/
import { Router } from "@angular/router"; 

/*-----localizacion---*/
import { Location } from '@angular/common';


/*----conectar servicios----*/
import { ConjuntoService } from '../../servicios/conjunto.service';



@Component({
  selector: 'app-propietarios',
  templateUrl: './propietarios.component.html',
  styleUrls: ['./propietarios.component.css']
})
export class PropietariosComponent implements OnInit {

  cerrarDeuda = false;

  propietariosRegistrados:any[] = [];

  constructor( private usarRuta: Router,
               private conectarServicio: ConjuntoService) { }

  ngOnInit(): void {

    this.conectarServicio.mostrarUsuarios()
        .subscribe( (resp:any) => {
          console.log(resp)

          this.propietariosRegistrados = resp;
        })
  }

  agregar_nuevo(){
      
    this.usarRuta.navigate( ['/agregarNuevo'] )
  }

  volver_home(){

    this.usarRuta.navigate( ['/home'] );
  }





  /*------actualizar-----*/
  actualizar( id:any ){

    this.usarRuta.navigate( ['/actualizar', id] )
  }



  /*-----borrar registro------*/
  borrarRegistro( id:any, i:number ){


    var dialog = confirm("¿Desea eliminar el resgitro?");
    if (dialog) {
        
       //console.log(id);
       this.conectarServicio.borrarRegistro( id )
       .subscribe(resp => {
         console.log(resp);

         /*--borrar posicion--*/
         this.propietariosRegistrados.slice( 1, i );
        
       })

    }
    else {

       
    }


     
  }





/*-------------ver un infromacion de un registro-------------*/
  ver_informacion(id:any){


    this.usarRuta.navigate( ['/verInformacion', id] );
  
  }



  



  abrirDeuda(){
  
    this.cerrarDeuda = true;
  
  }

  icono_cerrar(){{

    this.cerrarDeuda = false;

  }}

}
