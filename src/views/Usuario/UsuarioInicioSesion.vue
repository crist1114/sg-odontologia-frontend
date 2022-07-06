<template>
  <div class="text-center container-inicio-sesion">
      <Mensaje :mensaje="mensaje"/>
      <p class="mt-4 titulo-modulo">Iniciar sesión</p>
      <div class="d-flex justify-content-center align-items-center container">
          <div class="row">
              <form @submit.prevent="inicioSesion()" class="formulario">
                  <div class="form-group">
                      <input type="number" placeholder="Número de documento" class="form-control" v-model="usuario.nro_documento">
                  </div>
                  <div class="form-group">
                      <input type="password" placeholder="Contraseña" class="form-control" v-model="usuario.clave">
                  </div>
                  <div class="form-group">
                      <button type="submit" class="btn btn-success">Continuar</button>
                  </div>
              </form>
          </div>
      </div>
  </div>
</template>
<script>
import Mensaje from '@/components/parciales/Mensaje.vue'
import { mapActions } from 'vuex'
export default {
    data() {
       return{
           usuario:{},
           usuarioIngresado:{},
           mensaje:{ver:false}
       }
    },
    methods:{
      ...mapActions(['guardarToken']),
        crearMensaje(contenido, color){
            this.mensaje.ver = true;
            this.mensaje.contenido = contenido
            this.mensaje.color = color
        },
        inicioSesion(){
            this.axios.post('odontologo/login', this.usuario)
            .then((respuesta)=>{
                if(respuesta && respuesta.status === 200){                 
                  this.guardarToken(respuesta.data.token)
                  this.$router.push('/menu')
                }
            })
            .catch((error) => {
              this.crearMensaje(error.response.data.mensaje, 'danger')
            })
        }
    },
    components:{
        Mensaje
    }
}
</script>