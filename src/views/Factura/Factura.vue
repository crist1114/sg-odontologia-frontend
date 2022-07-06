<template>
<div class="text-center">
    <Mensaje :mensaje="mensaje" />
    <h5 class="text-success">Facturas</h5>
    <Tabla :facturas="facturas"/>
</div>
</template>
<script>
import Tabla from '@/components/Factura/TablaFactura.vue'
import Mensaje from '@/components/parciales/Mensaje.vue'
export default {
  components:{
    Tabla,
    Mensaje
  },
  data(){
    return{
        facturas:[],
        mensaje:{ver:false},
        condicion: 'id_paciente',
        buscar:''
    }
  },
  created () {
    this.verfacturas()
  },
  methods:{
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    }, 
    verfacturas(){
        this.axios.get('factura', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(respuesta =>{
            this.facturas = respuesta.data
        })
        .catch((error)=>{
            this.crearMensaje(error.response.data.mensaje, 'danger')
        })
    }
  }
}
</script>
<style lang="css">
  .contenedor-filtro_general {
    margin-top: 20px;
    display: flex;
    align-content: center;
    justify-content: center;
  } 
  .contenedor-input {
    margin-left: 10px;
  }
  .contenedor-input_buscar {
    display: flex;
  }
</style>