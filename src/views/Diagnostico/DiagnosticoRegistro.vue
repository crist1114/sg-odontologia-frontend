<template>
  <div class="text-center container-inicio-sesion">
    <Mensaje :mensaje="mensaje" />
    <p class="mt-4 titulo-modulo">Registro diagnostico:</p>
    <div class="d-flex justify-content-center align-items-center container">
      <div class="row">
        <form @submit.prevent="" class="formulario">
          <div class="form-group">
            <input
              type="text"
              placeholder="Número Documento"
              v-model="diagnostico.nro_documento"
              class="form-control"
              required
            />
            <button @click="verInfoPaciente()" class="btn btn-info form-control">
              Buscar
            </button>
          </div>
          <div v-if="infoPaciente !== null">
            <h5 class="mb-5">Paciente: {{infoPaciente.nombre}} {{infoPaciente.apellido}}</h5>
            <div class="form-group">
              <label for="select">Seleccione el Procedimiento:</label>
              <select
                id="select"
                class="form-select form-control"
                aria-label="Default select example"
                v-if="procedimientos.length > 0"
                v-model="diagnostico.id_procedimiento"
                @change="verTotalPagar(diagnostico.id_procedimiento)"
              >
                <option
                  :value="procedimiento.id_procedimiento"
                  v-for="procedimiento in procedimientos"
                  :key="procedimiento.id_procedimiento"
                >
                  {{ procedimiento.nombre }} - $ {{ procedimiento.precio }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <textarea
                rows="7"
                type="text"
                placeholder="Resultado Procedimiento"
                class="form-control"
                v-model="diagnostico.resultado"
                required
              />
            </div>
            <div class="form-group">
              <label for="select">Fecha:</label>
              <input
                type="date"
                class="form-control"
                v-model="diagnostico.fecha"
                required
              />
            </div>
            <div class="form-group">
              <textarea
                rows="7"
                type="text"
                placeholder="Observación Procedimiento"
                class="form-control"
                v-model="diagnostico.observacion"
                required
              />
            </div>
            <h5>Total Pagar: $ {{ diagnostico.valor_total }}</h5>
            <label for="select">Ingrese Abono:</label>
            <div class="form-group">
              <input
                type="number"
                placeholder="Abono Procedimiento $"
                class="form-control"
                v-model="diagnostico.abono"
                required
              />
            </div>
            <div class="form-group">
              <button @click="cancelar()" class="btn btn-info">Cancelar</button>
              <button @click="registro()" class="btn btn-success ml-5">
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Mensaje from "@/components/parciales/Mensaje.vue";
export default {
  data() {
    return {
      procedimientos: [],
      diagnostico: { abono: 0, valor_total: 0, firma_filename: '' },
      diagnosticoIngresado: {},
      mensaje: { ver: false },
      infoPaciente: null,
    };
  },
  created() {
    this.verprocedimientos();
  },
  methods: {
    cancelar() {
      this.$router.push("/diagnostico");
    },
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    registro() {
      this.axios
        .post("diagnostico", this.diagnostico, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((respuesta) => {
          console.warn(respuesta, "R diagnosticos");
          if (respuesta && respuesta.status === 200) {
            this.enviarEmail();
            this.crearMensaje("Guardado correctamente", "success");
            this.$router.push("/diagnostico");
          }
        })
        .catch((error) => {
          this.crearMensaje(error.response.data.mensaje, "danger");
        });
    },
    verprocedimientos() {
      this.axios
        .get("procedimiento", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((respuesta) => {
          console.warn(respuesta);
          this.procedimientos = respuesta.data;
        });
    },
    verTotalPagar(id_procedimiento) {
      console.log(id_procedimiento, "id");
      const procedimiento = this.procedimientos.filter(
        (procedimiento) => procedimiento.id_procedimiento == id_procedimiento
      );
      console.log(procedimiento, "pro");
      this.diagnostico.valor_total = procedimiento[0].precio;
    },
    verInfoPaciente() {
      if (this.diagnostico.nro_documento !== undefined) {
        this.axios
          .get("paciente/" + this.diagnostico.nro_documento, {
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
      }
    },
    enviarEmail() {
      const datosEnviarEmaeil = {
        nombre: this.infoPaciente.nombre + " " + this.infoPaciente.apellido,
        email: this.infoPaciente.email,
        resultado: this.diagnostico.resultado,
        observacion: this.diagnostico.observacion,
        valor_total: this.diagnostico.valor_total,
        abono: this.diagnostico.abono,
        fecha: this.diagnostico.fecha
      };
      this.axios
        .post("diagnostico/email", datosEnviarEmaeil, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((respuesta) => {
          console.warn(respuesta, "R diagnosticos");
          if (respuesta && respuesta.status === 200) {
            this.crearMensaje(
              "Diagnostico enviado al email " + this.infoPaciente.email,
              "success"
            );
          }
        })
        .catch((error) => {
          this.crearMensaje(error.response.data.mensaje, "danger");
        });
    },
  },
  components: {
    Mensaje,
  },
};
</script>