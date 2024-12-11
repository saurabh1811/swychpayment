<template>
  <div class="wrapper" id="app">
    <CardForm
      :form-data="formData"
      @input-card-number="updateCardNumber"
      @input-card-name="updateCardName"
      @input-card-month="updateCardMonth"
      @input-card-year="updateCardYear"
      @input-card-cvv="updateCardCvv"
    />
    <!-- backgroundImage="https://images.unsplash.com/photo-1572336183013-960c3e1a0b54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" -->
  </div>
</template>

<script>
import CardForm from '@/views/dashboard/components/CardForm.vue'
export default {
  name: 'VuePaycard',
  components: {
    CardForm
  },
  data () {
    return {
      formData: {
        cardName: 'Harshit Kumar',
        cardNumber: '4334519391378245',
        cardMonth: '12',
        cardYear: '2030',
        cardCvv: '123'
      }
    }
  },
  methods: {
    updateCardNumber (val) {
    },
    updateCardName (val) {
    },
    updateCardMonth (val) {
    },
    updateCardYear (val) {
    },
    updateCardCvv (val) {
    }
  },
  mounted () {
    this.$i18n.locale = navigator.language
  }
}
</script>

<style lang="scss">
@import '@/assets/lib/css/style.scss';
</style>