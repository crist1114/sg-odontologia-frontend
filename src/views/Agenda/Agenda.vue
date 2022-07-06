<template>
  <div>
    <Mensaje :mensaje="mensaje" />
    <h3 class="text-center text-success mb-4">Agenda</h3>
    <div class="contenedor-input_buscar">
      <input
        type="text"
        class="form-control text-center formulario"
        placeholder="Ingrese la identificación del Paciente"
        v-model="buscar"
        @click="verCitas()"
      />
      <button class="btn btn-outline-success ml-2" @click="filtrar()">
        <span class="icon-Lupa"></span>
      </button>
    </div>
    <vue-scheduler
      :min-date="null"
      :max-date="null"
      :labels="{
        today: 'Hoy',
        back: 'Atrás',
        next: 'Siguiente',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        all_day: 'Todo el día',
      }"
      :time-range="[8, 18]"
      :available-views="['month', 'week', 'day']"
      initial-view="week"
      use12
      :show-today-button="false"
      :events="citas"
      :event-dialog-config="dialogConfig"
      @month-changed="monthChanged"
      @week-changed="weekChanged"
      @day-changed="dayChanged"
      @view-changed="viewChanged"
      @day-clicked="dayClicked"
      @time-clicked="timeClicked"
      @event-clicked="eventClicked"
      @event-created="eventCreated"
    />

    <!-- Modal -->
    <div
      class="modal fade"
      id="modalCita"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">Cita</h5>
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
            <h4>Identificación Paciente: {{ citaVer.nro_documento }}</h4>
            <p>
              Hora inicio: {{ citaVer.hora_inicio }} - Hora fin:
              {{ citaVer.hora_fin }}
            </p>
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
              class="btn btn-danger"
              @click="eliminarCita()"
            >
              Eliminar Cita
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Mensaje from "@/components/parciales/Mensaje.vue";
export default {
  components: {
    Mensaje,
  },
  data() {
    return {
      mensaje: { ver: false },
      citas: [],
      buscar: '',
      citaVer: {},
      events: [
        {
          date: new Date(),
          startTime: "13:00",
          endTime: "15:00",
          name: "Date with David",
        },
      ],
      dialogConfig: {
        title: "Agendar nueva cita",
        createButtonLabel: "Guardar Cita",
        enableTimeInputs: true,
        fields: [
          {
            name: "nro_documento",
            label: "Identificación del Paciente",
          },
        ],
      },
    };
  },
  created() {
    this.verCitas();
  },
  methods: {
    monthChanged(newDate) {
      console.log("Month Changed");
      console.log(newDate);
    },
    weekChanged(newDate) {
      console.log("Week Changed");
      console.log(newDate);
    },
    dayChanged(newDate) {
      console.log("Day Changed");
      console.log(newDate);
    },
    viewChanged(newView) {
      console.log("View Changed");
      console.log(newView);
    },
    dayClicked(date) {
      console.log("Day clicked");
      console.log(date.getDate());
    },
    timeClicked(dateWithTime) {
      console.log("Time clicked");
      console.log("Date: " + dateWithTime.date);
      console.log("Time: " + dateWithTime.time);
    },
    eventClicked(event) {
      console.log("Event clicked");
      const cita = {
        id_cita: event.id_cita,
        nro_documento: event.nro_documento,
        fecha: event.date,
        hora_inicio: event.startTime,
        hora_fin: event.endTime,
      };
      this.citaVer = cita;
      $("#modalCita").modal("show");
      console.log(event);
    },
    eventCreated(event) {
      console.log("Event created");
      console.log(event);
      const cita = {
        nro_documento: event.nro_documento,
        fecha: event.date,
        hora_inicio: event.startTime,
        hora_fin: event.endTime,
      };
      this.guardarCita(cita);
    },
    guardarCita(cita) {
      this.axios
        .post("cita", cita, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((respuesta) => {
          if (respuesta && respuesta.status === 200) {
            this.crearMensaje("Guardado correctamente", "success");
            this.verCitas();
          }
        })
        .catch((error) => {
          this.crearMensaje(error.response.data.mensaje, "danger");
          this.verCitas();
        });
    },
    verCitas() {
      this.axios
        .get("cita", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((respuesta) => {
          const citasMostrar = [];
          this.pacientes = respuesta.data;
          for (const cita of respuesta.data) {
            const citaGuardar = {
              id_cita: cita.id_cita,
              date: cita.fecha,
              startTime: cita.hora_inicio,
              endTime: cita.hora_fin,
              nro_documento: cita.id_paciente,
            };
            citasMostrar.push(citaGuardar);
          }
          this.citas = citasMostrar;
          console.warn(this.citas, "citas mostrar");
        })
        .catch((error) => {
          this.crearMensaje(error.response.data.mensaje, "danger");
        });
    },
    eliminarCita() {
      this.axios
        .delete("cita/" + this.citaVer.id_cita, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((respuesta) => {
          if (respuesta.status === 200) {
            $("#modalCita").modal("hide");
            this.verCitas();
          }
        })
        .catch((error) => {
          this.crearMensaje(error.response.data.mensaje, "danger");
        });
    },
    filtrar() {
      let citas = [];
      const citasGuardadas = this.citas
      citas = this.citas.filter((cita) => cita.nro_documento === this.buscar);
      if (citas.length > 0) {
        this.citas = citas;
      } else {
        this.crearMensaje("No se encontraron citas", "danger");
        this.citas = citasGuardadas
      }
    },
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
  },
};
</script>