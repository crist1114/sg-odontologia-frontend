<template>
  <OdontogramaComponent :paciente="paciente" />
</template>
<script>
import OdontogramaComponent from "@/components/Odontograma/index.vue";
export default {
  props: {
    paciente: Object,
  },
  components: { OdontogramaComponent },
  name: "VistaOdontograma",
};
</script>