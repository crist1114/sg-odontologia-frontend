<template>
  <div class="container-tarjetas">
    <div class="tarjeta-menu">
      <img src="../../assets/pacientes.svg" alt="img-pacientes" width="140px" height="180px" @click="abrirRuta('/pacientes')">
      <button class="btn btn-success mt-4" @click="abrirRuta('/pacientes')">Pacientes</button>
    </div>
    <div class="tarjeta-menu">
      <img src="../../assets/citas.svg" alt="img-pacientes" width="140px" height="180px" @click="abrirRuta('/agenda')">
      <button class="btn btn-success mt-4" @click="abrirRuta('/agenda')">Citas</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MenuComponente',
  methods: {
    abrirRuta (ruta) {
      this.$router.push(ruta)
    }
  }
}
</script>
<style scoped>
  .container-tarjetas {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  .tarjeta-menu {
    margin: 40px;
    width: 250px;
    height: 300px;

  }
  .tarjeta-menu img {
    cursor: pointer;
    width: 100%;
    height: 80%;
    object-fit: contain;
  }
  .tarjeta-menu button {
    width: 100%;
    border-end-end-radius: 0px;
    border-end-start-radius: 0px;
  }
</style>