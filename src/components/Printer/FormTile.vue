<template>
  <BaseCard flat :isFullHeight="true">
    <VCardTitle>
      <h5 class="headline">Imprimir</h5>
    </VCardTitle>
    <!-- <VDivider /> -->
    <VCardText>
      <VContainer class="pa-0" grid-list-lg>
        <VLayout row wrap>
          <VFlex xs12>
            <VTextField
              outline
              v-model="test"
              label="Impresora" />
          </VFlex>
          <VFlex xs8>
            <VTextField
              outline
              v-model="label"
              hide-details
              label="SKU" />
          </VFlex>
          <VFlex xs4>
            <VTextField
              number
              outline
              v-model="copies"
              hide-details
              label="Copias" />
          </VFlex>
          <VFlex xs4>
            <VTextField
              number
              outline
              v-model="place"
              label="Planta" />
          </VFlex>
          <VFlex xs8>
            <VMenu
                ref="dateMenu"
                lazy
                :close-on-content-click="false"
                v-model="dateMenu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                min-width="290px"
                :return-value.sync="date"
              >
                <VTextField
                  slot="activator"
                  label="Fecha"
                  outline
                  v-model="formattedDate"
                  append-icon="event"
                  required
                  readonly
                ></VTextField>
                <VDatePicker
                  v-model="date"
                  no-title
                  scrollable
                  @input="$refs.dateMenu.save(date)">
                  <!-- <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="expiresMenu = false">Cancelar</v-btn>
                  <v-btn flat color="primary" @click="$refs.expiresMenu.save(editedItem.expiresAt)">OK</v-btn> -->
                </VDatePicker>
              </VMenu>
          </VFlex>
          <VFlex xs12>
            <span class="subheading">Nomenclatura</span>
          </VFlex>

          <VFlex xs4>
            <VTextField
              number
              outline
              v-model="line"
              label="Línea" />
          </VFlex>
          <VFlex xs4>
            <VTextField
              number
              outline
              v-model="turn"
              label="Turno" />
          </VFlex>
          <VFlex xs4>
            <VTextField
              number
              outline
              v-model="group"
              label="Grupo" />
          </VFlex>
        </VLayout>
        <VLayout justify-end>
          <VBtn >PDF</VBtn>
          <VBtn color="primary">Imprimir</VBtn>
        </VLayout>
      </VContainer>
    </VCardText>
  </BaseCard>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      test: 'ZEBRA-23F56',
      place: 'TX',
      copies: 1,
      label: 'Y4041',
      dateMenu: false,
      date: null,
      line: 4,
      turn: 2,
      group: 'C'
    };
  },
  computed: {
    formattedDate() {
      if (this.date) {
        return moment(this.date).utc().format('L');
      }
      return moment().format('L');
    }
  }
};
</script>
