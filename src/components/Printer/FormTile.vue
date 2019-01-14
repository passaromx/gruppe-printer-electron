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
            <VSelect
              :items="printers"
              v-model="printer"
              label="Impresora"
              outline
              item-text="name"
              item-value="name"/>
          </VFlex>
          <VFlex xs12>
            <LabelAutocomplete
              :messages="errors.collect('labels')"/>
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
          <VFlex xs4>
            <VTextField
              number
              outline
              v-model="copies"
              label="Copias"
              v-validate="'required'"
              data-vv-name="copies"
              :error-messages="errors.collect('copies')"/>
          </VFlex>
          <VFlex xs6>
            <VTextField
              number
              outline
              v-model="place"
              label="Planta" />
          </VFlex>
          <VFlex xs6>
            <VTextField
              number
              outline
              v-model="place"
              label="Peso neto" />
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
          <VBtn>
            <VIcon class="mr-2">cloud_download</VIcon>
            PDF
          </VBtn>
          <VBtn color="primary">Imprimir</VBtn>
        </VLayout>
      </VContainer>
    </VCardText>
  </BaseCard>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import { ipcRenderer } from 'electron';
import moment from 'moment';

export default {
  $_veeValidate: { validator: 'new' },
  components: { LabelAutocomplete: () => import('@/components/Printer/LabelAutocomplete') },
  data() {
    return {
      printer: 'Zebra_Technologies_ZTC_110Xi4_203dpi_ZPL',
      printers: [],
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
  mounted() {
    ipcRenderer.send('get-printers');
    ipcRenderer.on('printers-fetched', (e, printers) => {
      this.printers = printers;
    });
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
