<template>
  <div class="container">
    <div id="mensaje" class="alert text-center fixed-bottom alert-dismissible fade show" :class="'alert-' + mensaje.color" role="alert" v-if="mensaje.ver">
      <h6>{{mensaje.contenido}}</h6>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="cerrar">x</button>
    </div>
  </div>
</template>

<script>
export default {
  name:'Mensaje',
  created(){
    this.cerrar()
  },
  props:{
    mensaje:Object
  },
  methods:{
    cerrar(){
      setInterval(this.ocultar, 5000); 
      this.ocultar()
    },
    ocultar(){
      this.mensaje.ver = false
    }
  }
}

</script>