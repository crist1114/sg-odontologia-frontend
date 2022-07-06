<template>
<div class="text-center">
    <Mensaje :mensaje="mensaje" />
    <h5 class="text-success">Examenes</h5>
    <div class="contenedor-filtro_general">
      <div class="contenedor-filtro">
        <label for="" class="col-md-12">Seleccione filtro:</label>
        <select class="form-select form-control col-md-12" aria-label="Seleccione el filtro" v-model="condicion">
          <option value="nombre" selected>Nombres </option>
          <option value="descripcion">Descripcion</option>
          <option value="id_paciente">Identificación</option> 
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
        Registrar Examen
    </button>
    <Tabla :examenes="examenes"/>
</div>
</template>
<script>
import Tabla from '@/components/Examen/TablaExamen.vue'
import Mensaje from '@/components/parciales/Mensaje.vue'
export default {
  components:{
    Tabla,
    Mensaje
  },
  data(){
    return{
        examenes:[],
        mensaje:{ver:false},
        condicion: 'nombre',
        buscar:''
    }
  },
  created () {
    this.verexamenes()
  },
  methods:{
    verexamenes(){
        this.axios.get('examen', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(respuesta =>{
            this.examenes = respuesta.data
        })
        .catch((error)=>{
            this.crearMensaje(error.response.data.mensaje, 'danger')
        })
    },
    filtrar(){
      if (this.buscar.length <= 0) {
        this.verexamenes()
      }else if (this.buscar.length > 3) {
        this.axios.get('examen/' + this.condicion + '/' + this.buscar, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(respuesta =>{
            this.examenes = respuesta.data
        })
        .catch((error)=>{
            this.crearMensaje(error.response.data.mensaje, 'danger')
        })
      }
    },
    pacienteRegistro(){
      this.$router.push('/examen-registro')
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