<template>
    <div class="card-form">
      <div class="card-list">
        <Card
          :fields="fields"
          :labels="formData"
          :isCardNumberMasked="isCardNumberMasked"
          :randomBackgrounds="randomBackgrounds"
          :backgroundImage="backgroundImage"
          :currentPlaceholder="currentPlaceholder"
        />
      </div>
      
    </div>
  </template>
  
  <script>
  import Card from '@/views/dashboard/components/Card.vue'
  export default {
    name: 'CardForm',
    
    props: {
      formData: {
        type: Object,
        default: () => {
          return {
            cardName: '',
            cardNumber: '',
            cardNumberNotMask: '',
            cardMonth: '',
            cardYear: '',
            cardCvv: ''
          }
        }
      },
      backgroundImage: [String, Object],
      randomBackgrounds: {
        type: Boolean,
        default: true
      },
      currentPlaceholder:{
        type: String,
        default: "#### ###"
      }
    },
    components: {
      Card
    },
    data () {
      return {
        fields: {
          cardNumber: 'v-card-number',
          cardName: 'v-card-name',
          cardMonth: 'v-card-month',
          cardYear: 'v-card-year',
          cardCvv: 'v-card-cvv'
        },
        minCardYear: new Date().getFullYear(),
        isCardNumberMasked: false,
        mainCardNumber: this.cardNumber,
        cardNumberMaxLength: 19,
        currentPlaceholder: "### ### ###"
      }
    },
    
    
  }
</script>