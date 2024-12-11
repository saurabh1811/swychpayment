<template>
    
    <v-row class="mb-0">
        <v-col cols="12" md="2">
        </v-col>
        <v-col cols="12" md="8">
            <div class="bg-white rounded-lg p-10 max-w-xl shadow-box-circle  dark:bg-dark-1000">
                <Vueform
                    size="lg"
                    :display-errors="false"
                    @submit="handleFormSubmit"
                    :endpoint="false"
                >
               
                    <!-- Defining form elements -->
                        <!-- 'Contact information' (email) -->
                        <GroupElement name="contact_information">
                        <template #label>
                            <div class="text-lg leading-tight mb-4 mt-4">Country Info</div>
                        </template>

                        <SelectElement
                            name="selected_country"
                            default="CM"
                            placeholder="Country"
                            autocomplete="new-country"
                            input-type="search"
                            rules="required"
                            :items="countries"
                            :loading="isCountryLoading"
                            :search="true"
                            :can-clear="true"
                            v-model="selectedCountry"
                            @change="updatePaymentMethods"

                        />


                        <SelectElement
                            name="payout_method"
                            default=""
                            placeholder="Payout Method"
                            autocomplete="new-payment-method"
                            input-type="search"
                            rules="required"
                            :items="paymentMethods"
                            :loading="isPaymentMethodLoading"
                            ref="payoutSelect"
                            :search="true"
                            :can-clear="false"

                        />

                        
      
                        <template #label1>
                            <div class="text-lg leading-tight mb-4 mt-4">Amount Info</div>
                        </template>

                        <TextElement
                            name="transaction_id"
                            rules="required|regex:/^[a-zA-Z0-9]{1,20}$/"
                            placeholder="Transaction ID"
                            default="TMID094094"
                            :columns="6"
                        />
                        <TextElement
                            name="remarks"
                            default=""
                            placeholder="Remarks (optional)"
                            :columns="6"
                        />
                        
                       
                        <StaticElement name="desc" before="Mobile Wallet Info" />

                        <MazPhoneNumberInput
                            :translations="{
                                countrySelector: {
                                placeholder: 'Country code',
                                error: 'Choose country',
                                searchPlaceholder: 'Search a country',
                                },
                                phoneInput: {
                                placeholder: 'Phone number',
                                example: 'Example:',
                                },
                            }"
                            :columns="6"
                            :countryCode="selectedCountry"
                            :onlyCountries="[selectedCountry]" 
                            name="mobile_no"
                            :noSearch="true"
                            v-model="phoneNumber"
                            @update="updatePhoneNumber"
                        />

                      
                        
                        
                        
                        <TextElement
                            name="amount"
                            rules="required|regex:/^[a-zA-Z0-9]{1,20}$/"
                            placeholder="Amount"
                            default="0"
                            :columns="8"
                        />

                        <div class="text-lg leading-tight mb-4 mt-4">{{currency_code}}</div>
                        <TextElement
                            name="account_number" 
                            :columns="6"
                            v-if="showSecondField"
                            floating="Account Number"
                            placeholder="Account Number"
                            :rules="['required']"
                        />
                        
                        
                        <TextElement
                            name="bank_code"
                            rules="required"
                            v-if="showSecondField"
                            placeholder="Bank Code"
                            :columns="6"
                        />

                        

                        

                    
                        
                        

                        
                        
                        </GroupElement>
                       

                        <!-- 'Shipping address' (name, company, address fields, phone) -->
                        <GroupElement name="shipping_address">
                            <template #label>
                                <div class="text-lg leading-tight mb-4 mt-4">Customer Info</div>
                            </template>
                            

                            
                            <TextElement
                                name="firstname"
                                default=""
                                placeholder="First name (optional)"
                                :columns="6"
                            />
                            <TextElement
                                name="lastname"
                                default=""
                                placeholder="Last name (optional)"
                                :columns="6"
                            />

                            
                           
                            
                            <TextElement
                                name="email"
                                default=""
                                placeholder="Email (optional)"
                            />
                    
                    
                    
                    
                    
                    
                        </GroupElement>
                        
                        <ButtonElement
                            name="submit"
                            add-class="mt-2"
                            submits
                            :loading="submitButtonLoading"

                        >
                            Send Request
                        </ButtonElement>
                </Vueform>
            </div>
        </v-col>
        <v-col cols="12" md="2">
        </v-col>
    </v-row>
    <template>
        <v-snackbar
          v-model="snackbar.visible"
          :timeout="snackbar.timeout"
          :color="snackbar.color"
          class="top-right-snackbar"
          absolute
        >
          {{ snackbar.message }}
        </v-snackbar>
      </template>
</template>


<script>
import { Vueform, useVueform } from '@vueform/vueform'
import { PayoutService } from '@/service/PayoutService';
import Swal from "sweetalert2";
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput';
import 'maz-ui/styles' ;




export default {
  mixins: [ Vueform ],
  setup: useVueform,
  components: {
    MazPhoneNumberInput
  },
  data: () => ({
    vueform: {
      size: 'lg',
      addClasses: {
        RadioElement: {
          input: 'mb-1',
        },
        CheckboxElement: {
          input: 'mb-1',
        },
      }
    },
    countries: {},
    countryList: [],
    states: {},
    isCountryLoading: true,
    selectedCountry: "CM",
    isPaymentMethodLoading: false,
    paymentMethods: [],
    currency_code: "",
    phoneNumber: '',
    mobile_code: '+237',
    selectedCountryName: "Cameroon",
    submitButtonLoading: false,
    snackbar: {
      visible: false,
      message: '',
      color: 'error', // You can use 'error', 'info', etc.
      timeout: 3000, // Duration in milliseconds
    },
    showSecondField: false,
    isMobileValid: false,
    enteredMobileNo: "",
    mobileCountryCode: ""


  }),
  methods: {
    getPaymentMethod(countryCode) {
      const country = this.countryList.find((c) => c.country_code === countryCode);
      this.currency_code = country.currency_code;
      this.selectedCountryName = country.country;
      this.mobile_code = country.mobile_code;
    //   this.$refs.payoutPhone.default = country.mobile_code;÷
    //   console.log(this.currency_code);
      return country?.payment_methods?.map((payMethod) => ({
        value: payMethod.payment_method,
        label: payMethod.payment_method,
      })) || [];
    },
    showSnackbar(message, color = 'error') {
        this.snackbar.message = message;
        this.snackbar.color = color;
        this.snackbar.visible = true;
    },
    updatePaymentMethods(value) {
        this.isPaymentMethodLoading = true;
        this.$refs.payoutSelect.clear();
        // this.$refs.payoutPhone.clear();
        this.selectedCountry = value;
        console.log(value);
        if (value==='NG'){
            this.showSecondField = true;
        }else{
            this.showSecondField = false;
        }
        const methods = this.getPaymentMethod(value);
        this.paymentMethods = methods; // Ensure reactivity
        this.isPaymentMethodLoading = false;
        // this.paymentMethods = this.getPaymentMethod(this.selectedCountry);
    },

    updatePhoneNumber(payload){
        this.isMobileValid = payload.isValid;
        this.enteredMobileNo = payload.formattedNumber;
        this.mobileCountryCode = payload.countryCode;
    },

    
    handleFormSubmit(formData) {
        console.log(this.phoneNumber)

        if (!this.isMobileValid || this.mobileCountryCode!==this.selectedCountry) {
            // Perform desired action if the prefix matches
            // console.log("Mobile number prefix matches the expected code.");
            this.showSnackbar('Please enter valid phone number with country code.', 'error');

            return; // Exit early if condition is met
        }

        else{
            this.submitButtonLoading = true;
            Swal.fire({
                title: "Are you sure? ",
                text: `You are going to make a payout of ${this.currency_code} ${formData.data.amount} to ${this.phoneNumber}`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: `<i class="pi pi-thumbs-up"></i> Confirm!`,
                confirmButtonAriaLabel: "Thumbs up, great!",
                cancelButtonText: `<i class="pi pi-thumbs-down"></i> Cancel`,
                cancelButtonAriaLabel: "Thumbs down"
            }).then((result) => {
                if (result.isConfirmed) {
                    this.submitFormData(formData);
                }else{
                    this.submitButtonLoading = false;
                }
            });
        }
        
        
    },
    formattedPhoneno(phoneNo) {
      var phone = "";
      if (["CM"].includes(this.selectedCountry.toUpperCase())) {
        phone = phoneNo.slice(1);
      } else if (["GA", "CI"].includes(this.selectedCountry.toUpperCase())) {
        phone = `0${phoneNo.slice(4)}`;
      } else if (["BJ", "TG"].includes(this.selectedCountry.toUpperCase())) {
        phone = `${phoneNo.slice(4)}`;
      } else {
        phone = `${phoneNo.slice(4)}`;
      }

      return phone;
    },
  
    
   
    submitFormData(formData){
        console.log("test the data",formData.data)
        // const formData = event.getData();

        const phoneNo = this.formattedPhoneno(this.phoneNumber);
        console.log(phoneNo);

        // Debugging output
        const data = {
            "country_code": formData.data.selected_country,
            "benerficairy_name": formData.data.firstname + " "+formData.data.lastname,
            "mobile_no": phoneNo,
            "address": this.selectedCountryName,
            "amount": formData.data.amount,
            "transaction_id": formData.data.transaction_id,
            "payment_method": "mtn",
            "remarks": formData.data.remarks,
            "bank_code": formData.data.bank_code || "", // Add these if dynamic data is required
            "account_number": formData.data.account_number || "" // Add these   

        }

        // API Call or any further logic
        PayoutService.postPayoutCreation(data).then((resp) => {
            console.log(resp);
            this.submitButtonLoading = false;
        })
        .catch((error) => {
            this.submitButtonLoading = false;
            console.error('Error fetching wallet info:', error);
        })
        .finally(() => {
            this.submitButtonLoading = false;
            // isFiatLoading.value = false; // Stop loading after API call
        });
        
    }
    
  },
  computed: {
    // Dynamically calculating column size for country
    // (narrower when states are also visible)
    countryColumn() {
        return this.data.country === 'US' ? 4 : 8
    },
  },
  
  mounted() {
    // Setting `countries` and `states`
    PayoutService.getPayoutCountry().then((resp) => {
        this.countryList = resp.data ;
        this.countries = resp.data.map(country => ({
            value: country.country_code,
            label: country.country,
        }))
      
    })
    .catch((error) => {
        console.error('Error fetching wallet info:', error);
    })
    .finally(() => {
        this.isCountryLoading = false;
        this.updatePaymentMethods("CM"); 
        // isFiatLoading.value = false; // Stop loading after API call
    });

   

  }
}
</script>

<style>
    .w-30 {
        width: 7.5rem;
    }

    .vf-floating-label.vf-floating-label-lg {
        margin-top: 0 !important;
        background-color: var(--vf-bg-input) !important;
    }
    .vf-row {
        gap: var(--vf-gutter-lg);
        grid-template-columns: none; 
    }
    .v-snackbar__wrapper {
        right: 30px; /* Space from the right */
        top: 30px; /* Space from the top */
      }
</style>