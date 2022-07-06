<template>
  <div>
    <div class="row container-inicio">
      <div class="col-md-6">
        <h1>Controla los movimientos de tu consultorio dental de una manera sencilla.</h1>
        <div class="mt-5">
          <p>Gestiona tus pacientes, los procedimientos y el agendamiento de las citas 📆</p>
          <button type="submit" class="btn btn-success" @click="iniciarSesion()">Iniciar Sesión</button>
        </div>
      </div>
      <div class="col-md-6">
        <img src="../../assets/procedimientos.svg" alt="" class="img-fluid">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    iniciarSesion () {
      this.$router.push('/inicio-sesion')
    }
  }
}
</script>