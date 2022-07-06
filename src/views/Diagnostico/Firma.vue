<template>
  <div class="text-center">
    <Mensaje :mensaje="mensaje" />
    <div v-if="nombreArchivo === ''">
      <h4>Firma Paciente {{ diagnostico.id_paciente }}</h4>
      <canvas
        id="myCanvas"
        width="560"
        height="360"
        @mousedown="beginDrawing"
        @mousemove="keepDrawing"
        @mouseup="stopDrawing"
      />
      <br />
      <button class="btn btn-success" @click="crearImagen()">Guardar</button>
    </div>
    <div class="mt-5" v-if="nombreArchivo !== ''">
      <h4>Firma subida correctamente</h4>
      <button class="btn btn-outline-success" @click="verFirma()">
        <span class="icon-Lupa"></span>
      </button>
      <br />
      <button class="btn btn-danger mt-4" @click="eliminarArchivo()">
        Eliminar y crear otra firma
      </button>
      <button class="btn btn-success ml-5 mt-4" @click="actualizarFirma()">
        Guardar Firma
      </button>
    </div>
    <button class="btn btn-info mt-5" @click="regresar()">
      Regresar
    </button>
  </div>
</template>
<script>
export default {
  props: {
    diagnostico: Object,
    editar: Boolean,
  },
  created() {
    this.nombreArchivo = this.diagnostico.firma_filename;
  },
  data() {
    return {
      x: 0,
      y: 0,
      isDrawing: false,
      canvas: null,
      infoPaciente: null,
      nombreArchivo: "",
      binarioImagenFirma: null,
      nombreArchivo: "",
      mensaje: { ver: false },
    };
  },
  methods: {
    drawLine(x1, y1, x2, y2) {
      let ctx = this.canvas;
      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
    },
    beginDrawing(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
      this.isDrawing = true;
    },
    keepDrawing(e) {
      if (this.isDrawing === true) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
        this.x = e.offsetX;
        this.y = e.offsetY;
      }
    },
    stopDrawing(e) {
      if (this.isDrawing === true) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
        this.x = 0;
        this.y = 0;
        this.isDrawing = false;
      }
    },
    verInfoPaciente() {
      this.axios
        .get("paciente/" + this.diagnostico.id_paciente, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((respuesta) => {
          console.log(respuesta, "respuesta info");
          if (respuesta.data.length > 0) {
            this.infoPaciente = respuesta.data[0];
          } else {
            this.infoPaciente = null;
            this.crearMensaje(respuesta.data.mensaje, "danger");
          }
        })
        .catch((error) => {
          this.crearMensaje(error.response.data.mensaje, "danger");
        });
    },
    async crearImagen() {
      const canvas = document.getElementById("myCanvas");
      const imagen = new Promise((resolve) => {
        canvas.toBlob(resolve, "image/png", 0.95);
      });
      const blob = await imagen;
      this.binarioImagenFirma = blob;
      this.subirArchivo();
    },
    subirArchivo() {
      var formData = new FormData();
      formData.append("file", this.binarioImagenFirma, "prueba.png");
      this.axios
        .post("subir", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((respuesta) => {
          console.log(respuesta);
          this.nombreArchivo = respuesta.data.filename;
        });
    },
    eliminarArchivo() {
      this.axios
        .delete("subir/" + this.nombreArchivo)
        .then((respuesta) => {
          console.log(respuesta);
          this.nombreArchivo = "";
          this.actualizarFirma();
          this.$router.push({ name: "Diagnostico" });
        })
        .catch((error) => console.log(error));
    },
    verFirma() {
      window.open(
        this.axios.defaults.baseURL + "documentos/" + this.nombreArchivo
      );
    },
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    actualizarFirma() {
      this.diagnostico.firma = this.nombreArchivo;
      this.axios
        .put(
          "diagnostico/firma/" + this.diagnostico.id_diagnostico,
          this.diagnostico,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((respuesta) => {
          console.warn(respuesta, "R diagnostico");
          if (respuesta && respuesta.status === 200) {
            this.crearMensaje(respuesta.data.mensaje, "success");
            this.$router.push("/diagnostico");
          }
        })
        .catch((error) => {
          console.log(error);
          this.crearMensaje(error.response.data.mensaje, "danger");
        });
    },
    regresar () {
      this.$router.push({ name: "Diagnostico" });
    }
  },
  mounted() {
    var c = document.getElementById("myCanvas");
    this.canvas = c.getContext("2d");
  },
};
</script>
<style scoped>
#myCanvas {
  border: 1px solid grey;
}
</style>