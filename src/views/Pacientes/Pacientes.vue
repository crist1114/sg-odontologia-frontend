<template>
<div class="text-center">
    <Mensaje :mensaje="mensaje" />
    <h5 class="text-success">Pacientes</h5>
    <div class="contenedor-filtro_general">
      <div class="contenedor-filtro">
        <label for="" class="col-md-12">Seleccione filtro:</label>
        <select class="form-select form-control col-md-12" aria-label="Seleccione el filtro" v-model="condicion">
          <option value="nombre" selected>Nombres </option>
          <option value="apellido">Apellidos</option>
          <option value="nro_documento">Identificación</option> 
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
        Registrar Paciente
    </button>
    <Tabla :pacientes="pacientes"/>
</div>
</template>
<script>
import Tabla from '@/components/Pacientes/TablaPacientes.vue'
import Mensaje from '@/components/parciales/Mensaje.vue'
export default {
  components:{
    Tabla,
    Mensaje
  },
  data(){
    return{
        pacientes:[],
        mensaje:{ver:false},
        condicion: 'nombre',
        buscar:''
    }
  },
  created(){
    this.verPacientes()
  },
  methods:{
    verPacientes(){
        this.axios.get('paciente', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(respuesta =>{
            this.pacientes = respuesta.data
        })
        .catch((error)=>{
            this.crearMensaje(error.response.data.mensaje, 'danger')
        })
    },
    filtrar(){
      if (this.buscar.length <= 0) {
        this.verPacientes()
      }else if (this.buscar.length > 3) {
        this.axios.get('paciente/' + this.condicion + '/' + this.buscar, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(respuesta =>{
            this.pacientes = respuesta.data
        })
        .catch((error)=>{
            this.crearMensaje(error.response.data.mensaje, 'danger')
        })
      }
    },
    pacienteRegistro(){
      this.$router.push('/registro')
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