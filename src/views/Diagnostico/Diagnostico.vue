<template>
<div class="text-center">
    <Mensaje :mensaje="mensaje" />
    <h5 class="text-success">diagnosticos</h5>
    <div class="contenedor-filtro_general">
      <div class="contenedor-filtro">
        <label for="" class="col-md-12">Seleccione filtro:</label>
        <select class="form-select form-control col-md-12" aria-label="Seleccione el filtro" v-model="condicion">
          <option value="id_paciente" selected>Identificación </option>
          <option value="resultado" selected>Resultado </option>
          <option value="observacion">Observación</option>
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
        Registrar diagnostico
    </button>
    <Tabla :diagnosticos="diagnosticos"/>
</div>
</template>
<script>
import Tabla from '@/components/Diagnostico/TablaDiagnostico.vue'
import Mensaje from '@/components/parciales/Mensaje.vue'
export default {
  components:{
    Tabla,
    Mensaje
  },
  data(){
    return{
        diagnosticos:[],
        mensaje:{ver:false},
        condicion: 'id_paciente',
        buscar:''
    }
  },
  created () {
    this.verdiagnosticos()
  },
  methods:{
    verdiagnosticos(){
        this.axios.get('diagnostico', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(respuesta =>{
            this.diagnosticos = respuesta.data
        })
        .catch((error)=>{
            this.crearMensaje(error.response.data.mensaje, 'danger')
        })
    },
    filtrar(){
      if (this.buscar.length <= 0) {
        this.verdiagnosticos()
      }else if (this.buscar.length > 3) {
        this.axios.get('diagnostico/' + this.condicion + '/' + this.buscar, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(respuesta =>{
            this.diagnosticos = respuesta.data
        })
        .catch((error)=>{
            this.crearMensaje(error.response.data.mensaje, 'danger')
        })
      }
    },
    pacienteRegistro(){
      this.$router.push('/diagnostico-registro')
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