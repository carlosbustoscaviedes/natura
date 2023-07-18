import { Injectable } from '@angular/core';

/*---usar HttpClient----*/
import { HttpClient } from "@angular/common/http"


/*----usar map----*/
import { map } from "rxjs/operators"


@Injectable({
  providedIn: 'root'
})

export class ConjuntoService {
  
  Token:any = ""
  guardarNombre:any = ""
 

  

  constructor( private usarHttp: HttpClient ) {
    
    this.leerToken()



  }


/*-----------------------------registrar login------------------------------*/
registrarLogin( registro:any ){
  
  const datos = {
      displayName   : registro.controls['nombre'].value,
      email    : registro.controls['correo'].value,
      password : registro.controls['pass1'].value,
      volverSecureToken : true 
  }
  
  return this.usarHttp.post( `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbebNy_xgwv3GeG7JKeiIDGCOJ1eOpEiM`, datos );

}


autenticarLogin( formularioLogin:any ){
  
  const login = {

    email :    formularioLogin.controls['email'].value,
    password : formularioLogin.controls['password'].value,
    volverSecureToken: true

  }
  
  return this.usarHttp.post( `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbebNy_xgwv3GeG7JKeiIDGCOJ1eOpEiM`, login )
                      .pipe(
                          map( (resp:any) => {
                            
                            this.Token = resp.localId
                            this.guardarToken()

                             this.guardarNombre = resp.displayName 
               
                            return resp
                            
                          } )
                      )

}

guardarToken(){

  localStorage.setItem( 'token', this.Token );

}


leerToken(){
  
  if( localStorage.getItem('token') ){
    
    this.Token = localStorage.getItem('token');
  
  }else{
    
    this.Token = " ";
  }
 

}


validarToken(){
  
   return  this.Token.length > 2
  
}



destruirToken(){

  localStorage.removeItem('token');
}

/*----------------------------------registrar login--------------------------*/






/*---------------------------registrar propietario----------------------------*/

registrarUsuario( registro:any ){
  
  const usuario = {

      nombre:       registro.controls['nombre'].value,  
      edad:         registro.controls['edad'].value,  
      cedula:       registro.controls['cedula'].value,  
      correo:       registro.controls['correo'].value,   
      celular:      registro.controls['celular'].value,   
      torre:        registro.controls['torre'].value,   
      apartamento:  registro.controls['apartamento'].value,
      parqueadero:  registro.controls['parqueadero'].value,
      deuda:        registro.controls['deuda'].value,
   
      
      
  }
    
  return this.usarHttp.post(`https://conjunto-79c93-default-rtdb.firebaseio.com/conjunto.json`, usuario)
                      .pipe(
                        map( (resp:any) => {
                            
                          return resp;
                        
                          })
                      )

  
}



mostrarUsuarios(){

    
  return this.usarHttp.get(`https://conjunto-79c93-default-rtdb.firebaseio.com/conjunto.json`)
              .pipe(
                map( (resp:any) => {

                let nuevoArrUsuario:any = [];
                  
                  Object.keys( resp ).forEach( llave => {

                    let usuario =  resp[llave]
                    usuario.id  = llave;
                    nuevoArrUsuario.push(usuario);

                  })
                
                  return nuevoArrUsuario;

                })
              )

}





/*------------------actualizar---------------*/
traerUnregistro(idT:any){

  return this.usarHttp.get(`https://conjunto-79c93-default-rtdb.firebaseio.com/conjunto/${ idT }.json`);
  
}




actualizarUsuario( datoActualizar:any, id:any ){
  
  console.log( datoActualizar )

  const actualizarDatos = {

      nombre:       datoActualizar.controls['actualizarNombre'].value,  
      edad:         datoActualizar.controls['actualizarEdad'].value,  
      cedula:       datoActualizar.controls['actualizarCedula'].value,  
      correo:       datoActualizar.controls['actualizarCorreo'].value,   
      celular:      datoActualizar.controls['actualizarContacto'].value,   
      torre:        datoActualizar.controls['actualizarTorre'].value,   
      apartamento:  datoActualizar.controls['actulizarApartamento'].value,
      parqueadero:  datoActualizar.controls['actulizarParqueadero'].value,
      deuda:        datoActualizar.controls['actulizarDeuda'].value
  }

  //delete actualizarDatos.id;
  
  return this.usarHttp.put(`https://conjunto-79c93-default-rtdb.firebaseio.com/conjunto/${ id }.json`, actualizarDatos );

}



/*-------------borrar registro--------------*/
borrarRegistro( id:any ){

    return this.usarHttp.delete( `https://conjunto-79c93-default-rtdb.firebaseio.com/conjunto/${ id }.json` );

}


}


