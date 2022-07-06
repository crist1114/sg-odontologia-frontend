<template>
  <div>
    <Mensaje :mensaje="mensaje" />
    <h3 class="text-center text-success">Odontograma</h3>
    <div class="contenedor-input_buscar">
      <input
        type="text"
        class="form-control text-center formulario"
        placeholder="Ingrese la identificación del Paciente"
        v-model="buscar"
        disabled
      />
      <button class="btn btn-outline-success ml-2" @click="filtrar()">
        <span class="icon-Lupa"></span>
      </button>
    </div>
    <div class="contenedor-odontograma">
      <div
        :class="diente.color"
        class="contenedor-diente"
        v-for="diente of dientes"
        :key="diente.id_diente"
        @click="abrirObservacionGuardar(diente.id_diente)"
      >
        <h3>{{ diente.id_diente }}</h3>
      </div>
    </div>
    <div class="contenedor-informativo">
      <div class="contenedor-info_diente">
        <h3 class="color-diente_enfermo">X</h3>
        <p>Enfermo</p>
      </div>
      <div class="contenedor-info_diente">
        <h3 class="color-diente_en_tratamiento">X</h3>
        <p>En Tratamiento</p>
      </div>
      <div class="contenedor-info_diente">
        <h3 class="color-diente_sano">X</h3>
        <p>Sano</p>
      </div>
    </div>

    <div class="contenedor-filtro_general">
      <div class="contenedor-filtro">
        <label for="" class="col-md-12">Seleccione filtro:</label>
        <select
          class="form-select form-control col-md-12"
          aria-label="Seleccione el filtro"
          v-model="condicionObservaciones"
        >
          <option value="id_diente" selected># Diente</option>
          <option value="descripcion">Observación</option>
        </select>
      </div>
      <div class="contenedor-input">
        <label for="" class="col-md-12"
          >Buscar por {{ condicionObservaciones }}:</label
        >
        <div class="contenedor-input_buscar">
          <input
            type="text"
            class="form-control text-center formulario"
            placeholder="Ingrese el dato"
            v-model="buscarObservaciones"
          />
          <button
            class="btn btn-outline-success ml-2"
            @click="filtrarObservaciones()"
          >
            <span class="icon-Lupa"></span>
          </button>
        </div>
      </div>
    </div>
    <div class="contenedor-observaciones mt-5" v-if="observaciones.length > 0">
      <div class="tabla-observaciones mt-3">
        <h4>Observaciones:</h4>
        <TablaObservacionesComponent :observaciones="observaciones" />
      </div>
    </div>
    <button class="btn btn-success" @click="imprimir()">Generar Reporte</button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="modalObservacion"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Agregar Observación
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h4># del diente: {{ observacionGuardar.id_diente }}</h4>
            <div class="form-group">
              <label for="select">Seleccione Estado:</label>
              <select
                id="select"
                class="form-select form-control"
                aria-label="Default select example"
                v-if="estados.length > 0"
                v-model="observacionGuardar.estado"
                required
              >
                <option
                  :value="estado.id"
                  v-for="estado in estados"
                  :key="estado.id"
                >
                  {{ estado.descripcion }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <input
                type="text"
                placeholder="Descripción"
                class="form-control"
                v-model="observacionGuardar.descripcion"
                required
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-success"
              @click="guardarObservacion()"
            >
              Guardar Observación
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TablaObservacionesComponent from "./TablaObservaciones.vue";
import Mensaje from "@/components/parciales/Mensaje.vue";
export default {
  props: {
    paciente: Object,
    editar: Boolean,
  },
  components: { TablaObservacionesComponent, Mensaje },
  data() {
    return {
      mensaje: { ver: false },
      buscar: "",
      estados: [
        { id: 1, descripcion: "Sano" },
        { id: 2, descripcion: "En tratamiento" },
        { id: 3, descripcion: "Enfermo" },
      ],
      es: [],
      observacionGuardar: {},
      observaciones: [],
      dientes: [],
      condicionObservaciones: "id_diente",
      buscarObservaciones: "",
    };
  },
  created() {
    this.verInfoPaciente();
    this.verDientes();
    this.verObservaciones();
  },
  methods: {
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    verInfoPaciente() {
      this.buscar = this.paciente.nro_documento;
    },
    verDientes() {
      this.axios
        .get("diente", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((respuesta) => {
          console.warn(respuesta.data, "dientes");
          this.dientes = respuesta.data;
        });
    },
    verObservaciones() {
      this.axios
        .get("odontograma/" + this.buscar, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((respuesta) => {
          console.warn(respuesta.data, "dientes");
          this.observaciones = respuesta.data;
          this.verificarDientes();
        });
    },
    filtrarObservaciones() {
      if (this.buscarObservaciones.length > 0) {
        this.axios
          .get(
            "odontograma/" +
              this.paciente.nro_documento +
              "/" +
              this.condicionObservaciones +
              "/" +
              this.buscarObservaciones,
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          )
          .then((respuesta) => {
            console.warn(respuesta.data, "dientes");
            this.observaciones = respuesta.data;
            this.verificarDientes();
          });
      } else {
        this.crearMensaje("Ingrese el dato", "danger");
      }
    },
    abrirObservacionGuardar(id_diente) {
      this.observacionGuardar = {
        id_diente: id_diente,
        nro_documento: this.buscar,
      };
      $("#modalObservacion").modal("show");
    },
    guardarObservacion() {
      this.axios
        .post("odontograma", this.observacionGuardar, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((respuesta) => {
          console.warn(respuesta, "R odon");
          if (respuesta && respuesta.status === 200) {
            this.crearMensaje("Guardado correctamente", "success");
            $("#modalObservacion").modal("hide");
            this.verInfoPaciente();
            this.verDientes();
            this.verObservaciones();
          }
        })
        .catch((error) => {
          console.log(error, "error");
          this.crearMensaje(error.response.data.mensaje, "danger");
        });
    },
    verificarDientes() {
      const dientes = this.dientes;
      const observaciones = this.observaciones;

      for (const observacion of observaciones) {
        const idDiente = observacion.id_diente;
        for (const diente of dientes) {
          if (diente.id_diente === idDiente) {
            diente.estado = observacion.estado;
          }
        }
      }
      this.dientes = dientes;
      this.agregarColorDiente();
    },
    agregarColorDiente() {
      const dientes = this.dientes;
      console.log(dientes, "dientes color");
      for (const diente of dientes) {
        if (diente.estado === 1) {
          diente.color = "bg-secondary";
        } else if (diente.estado === 2) {
          diente.color = "bg-primary";
        } else if (diente.estado === 3) {
          diente.color = "bg-danger";
        }
      }
      this.dientes = dientes;
    },
    async imprimir() {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const video = document.createElement("video");

      try {
        const captureStream = await navigator.mediaDevices.getDisplayMedia();
        video.srcObject = captureStream;
        context.drawImage(video, 0, 0, window.width, window.height);
        const frame = canvas.toDataURL("image/png");
        captureStream.getTracks().forEach((track) => track.stop());
        window.location.href = frame;
      } catch (err) {
        console.error("Error: " + err);
      }
    },
  },
};
</script>
<style scoped>
.contenedor-odontograma {
  border: solid #000 1px;
  display: flex;
  align-content: center;
  align-items: center;
  padding: 15px;
  flex-wrap: wrap;
}
.contenedor-diente {
  color: #fff;
  width: 50px !important;
  height: 50px !important;
  margin: 10px;
  border-radius: 50%;
  display: flex;
  align-content: center;
  align-items: center;
  text-align: center;
  justify-content: center;
  cursor: pointer;
}
.contenedor-diente h3 {
  font-size: 17px;
  margin-top: 5px;
}
.contenedor-informativo {
  margin-top: 20px;
  display: flex;
}
.contenedor-info_diente {
  display: flex;
  margin-right: 10px;
}
.color-diente_enfermo {
  color: transparent;
  background-color: #dc3545;
  width: 30px !important;
  height: 30px !important;
  border: solid #000 0.5px;
  border-radius: 10px;
}
.color-diente_en_tratamiento {
  color: transparent;
  background-color: #007bff;
  width: 30px !important;
  height: 30px !important;
  border: solid #000 0.5px;
  border-radius: 10px;
}
.color-diente_sano {
  color: transparent;
  background-color: #6c757d;
  width: 30px !important;
  height: 30px !important;
  border: solid #000 0.5px;
  border-radius: 10px;
}
.contenedor-info_diente p {
  margin-top: 2px;
  margin-left: 5px;
}
</style>