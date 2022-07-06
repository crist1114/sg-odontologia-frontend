<template>
<div class="text-center">
    <Mensaje :mensaje="mensaje" />
    <h5 class="text-success">procedimientos</h5>
    <div class="contenedor-filtro_general">
      <div class="contenedor-filtro">
        <label for="" class="col-md-12">Seleccione filtro:</label>
        <select class="form-select form-control col-md-12" aria-label="Seleccione el filtro" v-model="condicion">
          <option value="nombre" selected>Nombres </option>
          <option value="descripcion">Descripcion</option>
        </select>
      </div>
      <div class="contenedor-input">
        <label for="" class="col-md-12">Buscar por {{ condicion }}:</label>
        <div class="contenedor-input_buscar">
          <input type="text" class="form-control text-center formulario" placeholder="Ingrese el dato" v-model="buscar">
          <button class="btn btn-outline-success ml-2" @click="filtrar()"><span class="icon-Lupa"></span></button>
        </div>
      </div>
    </div>
    <button @click="pacienteRegistro()" type="button" class="btn btn-success mt-4" data-toggle="modal" data-target="#categoriaGuardarModal">
        Registrar Procedimiento
    </button>
    <Tabla :procedimientos="procedimientos"/>
</div>
</template>
<script>
import Tabla from '@/components/Procedimiento/TablaProcedimiento.vue'
import Mensaje from '@/components/parciales/Mensaje.vue'
export default {
  components:{
    Tabla,
    Mensaje
  },
  data(){
    return{
        procedimientos:[],
        mensaje:{ver:false},
        condicion: 'nombre',
        buscar:''
    }
  },
  created () {
    this.verprocedimientos()
  },
  methods:{
    verprocedimientos(){
        this.axios.get('procedimiento', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(respuesta =>{
            this.procedimientos = respuesta.data
        })
        .catch((error)=>{
            this.crearMensaje(error.response.data.mensaje, 'danger')
        })
    },
    filtrar(){
      if (this.buscar.length <= 0) {
        this.verprocedimientos()
      }else if (this.buscar.length > 3) {
        this.axios.get('procedimiento/' + this.condicion + '/' + this.buscar, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(respuesta =>{
            this.procedimientos = respuesta.data
        })
        .catch((error)=>{
            this.crearMensaje(error.response.data.mensaje, 'danger')
        })
      }
    },
    pacienteRegistro(){
      this.$router.push('/procedimiento-registro')
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