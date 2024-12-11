<template>
    <v-row class="my-0">
        <v-col>
            <v-card
            :disabled="loading"
            :loading="loading"
            class="mx-auto rounded-card"
            max-width="374"
            >
            <template v-slot:loader="{ isActive }">
                <v-progress-linear
                :active="isActive"
                color="deep-purple"
                height="4"
                indeterminate
                ></v-progress-linear>
            </template>
        
            
            <v-card-item>
                <v-card-title>Latest Card</v-card-title>
        
                
            </v-card-item>
            
        
            <Card
                :fields="fields"
                :labels="formData"
                :isCardNumberMasked="isCardNumberMasked"
                :randomBackgrounds="randomBackgrounds"
                :backgroundImage="backgroundImage"
                :currentPlaceholder="currentPlaceholder"
                />
            <v-card-actions>
                <v-row>
                    <v-col>
                        <v-btn
                            color="deep-purple-lighten-2"
                            text="Details"
                            block
                            border
                            @click="reserve"
                        >
                        </v-btn>
                    </v-col>
                    <v-col>
                    <v-btn
                    color="deep-purple-lighten-2"
                    text="Topup"
                    block
                    border
                    @click="reserve"
                    ></v-btn>
                </v-col>
                </v-row>
            </v-card-actions>
            <v-card-text>
                
                <v-row
                align="center"
                class="mx-0"
                >
                
                </v-row>
        
                <div class="my-4 text-subtitle-1">
                Manage Virtual Card
                </div>
        
                <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
            </v-card-text>
        
        
        
           
        
            <v-divider></v-divider>

                    <v-list-item
                        
                        subtitle="View All Cards"
                        link style="background-color: #f6f6f6">
                        <template v-slot:append>
                            <v-icon :icon="RightOutlined" size="14"></v-icon>
                          </template>
                    </v-list-item>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
  import Card from '@/views/dashboard/components/Card.vue'
  import { SettingOutlined, GiftOutlined, MessageOutlined, CopyOutlined, RightOutlined } from '@ant-design/icons-vue';
  export default {
    
    props: {
      formData: {
        type: Object,
        default: () => {
          return {
            cardName: 'Harshit Kumar',
            cardNumber: '4200800820044200',
            cardNumberNotMask: 'false',
            cardMonth: '12',
            cardYear: '2029',
            cardCvv: '123'
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
        cardNumberMaxLength: 16,
        currentPlaceholder: "### ### ### ####"
      }
    },
    
    
  }
</script>
<style lang="scss">
@import '@/assets/lib/css/style.scss';
</style>