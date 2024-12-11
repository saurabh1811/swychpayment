<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import MainRoutes from '@/router/MainRoutes'

// icons
import { RiseOutlined, FallOutlined } from '@ant-design/icons-vue';
import { SettingOutlined, GiftOutlined, MessageOutlined, CopyOutlined, RightOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';

import { DashboardService } from '@/service/DashboardService';
let wallet_val = ref(0);
let isLoading = ref(true);
let isFiatLoading = ref(true);

const fivecards = shallowRef([
  {
    name: 'Total Page Views',
    earn: '4,42,236',
    percent: '59.3%',
    color: 'primary',
    icon: GiftOutlined,
    text: '35,000'
  },
  {
    name: 'Total Page Views',
    earn: '4,42,236',
    percent: '59.3%',
    color: 'primary',
    icon: SettingOutlined,
    text: '35,000'
  },
  {
    name: 'Total Page Views',
    earn: '4,42,236',
    percent: '59.3%',
    color: 'primary',
    icon: MessageOutlined,
    text: '35,000'
  },
  {
    name: 'Total Page Views',
    earn: '4,42,236',
    percent: '59.3%',
    color: 'primary',
    icon: RiseOutlined,
    text: '35,000'
  },
  {
    name: 'Total Page Views',
    earn: '4,42,236',
    percent: '59.3%',
    color: 'primary',
    icon: FallOutlined,
    text: '35,000'
  },
  {
    name: 'Total Page Views',
    earn: '4,42,236',
    percent: '59.3%',
    color: 'primary',
    icon: RiseOutlined,
    text: '35,000'
  },
  {
    name: 'Total Page Views',
    earn: '4,42,236',
    percent: '59.3%',
    color: 'primary',
    icon: FallOutlined,
    text: '35,000'
  },
 
  
]);

let fiat_wallets = ref([{
    name: 'Total Page Views',
    earn: '4,42,236',
    percent: '59.3%',
    color: 'primary',
    icon: MessageOutlined,
    text: '35,000'
  },
  {
    name: 'Total Page Views',
    earn: '4,42,236',
    percent: '59.3%',
    color: 'primary',
    icon: RiseOutlined,
    text: '35,000'
  },]);

  let empty_fiat_wallets = ref([]);




onMounted(() => {
    DashboardService.getWalletInfo().then((resp) => {
        console.log(resp);
        wallet_val.value = parseInt(resp.data.wallet_bal);
    })
    .catch((error) => {
      console.error('Error fetching wallet info:', error);
    })
    .finally(() => {
      isLoading.value = false; // Stop loading after API call
    });

    DashboardService.getFiatWalletInfo().then((resp) => {
        fiat_wallets.value = resp.data.data ;
        console.log(fiat_wallets)
    })
    .catch((error) => {
      console.error('Error fetching wallet info:', error);
    })
    .finally(() => {
        isFiatLoading.value = false; // Stop loading after API call
    });
});

    



function formatCurrency(value: any) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
}

function formatCountryCurrency(value: any, currency_code: string) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency_code
      }).format(value);
}
</script>
<template>
    
    
    <v-row class="my-0">
        
        <v-col cols="12" sm="6" md="4" >
            <v-card elevation="0" class="rounded-card">
                <v-card variant="outlined"  class="rounded-card">
                    <!-- Shimmer Effect for Loading -->
                    <v-card-text v-if="isLoading" class="main_box shimmer">
                        <div class="shimmer-item"></div>
                        <div class="shimmer-item small"></div>
                    </v-card-text>
                     
                    <v-card-text v-else class="main_box">
                        <div>
                            <v-row class="mb-5 ">
                                <div class="d-flex align-center justify-space-between w-100 ga-2">
                                    <v-avatar size="36" :color="'primary'" :class="'square_icon text-' + 'primary'" variant="tonal">
                                        <component :is="GiftOutlined" :style="{ fontSize: '16px' }" />
                                    </v-avatar>
                                    <div style="margin-left: 0px !important;">
                            
                                        <h6 class="text-subtitle-1 mb-0">Primary Wallet</h6>
                                        <span class="text-subtitle-2 text-lightText font-weight-regular">USD Holding</span>
                                    </div>
                                    <div class="text-right">
                                        <v-avatar size="36"  :class="'text-' + 'primary'" variant="tonal">
                                            <component :is="CopyOutlined " :style="{ fontSize: '16px' }" />
                                        </v-avatar>
                                    </div>
                                </div>
                            </v-row>
                            <v-row>
                                <div class="d-flex align-center justify-space-between w-100 ga-2">
                                    <div>
                                        <h6 class="mb-0 text-subtitle-2 text-lightText font-weight-regular">Total Balance</h6>
                                        <span class="text-subtitle-1 f_large">{{formatCurrency(wallet_val)}}</span>
                                    </div>
                                </div>
                            </v-row>
                          
                        </div>
                    </v-card-text>
                    <v-divider></v-divider>

                    <v-list-item
                        link
                        subtitle="View Transaction"
                        href="/pusd_wallets"
                        style="background-color: #f6f6f6">
                        <template v-slot:append>
                            <v-icon :icon="RightOutlined" size="14"></v-icon>
                          </template>
                    </v-list-item>
                </v-card>
            </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" v-for="(wallet, i) in fiat_wallets" :key="i" :value="wallet">
            <v-card elevation="0" class="rounded-card">
                <v-card variant="outlined"  class="rounded-card">
                    <!-- Shimmer Effect for Loading -->
                    <v-card-text v-if="isFiatLoading" class="main_box shimmer">
                        <div class="shimmer-item"></div>
                        <div class="shimmer-item small"></div>
                    </v-card-text>
                     
                    <v-card-text v-else class="main_box">
                        <div>
                            <v-row class="mb-5 ">
                                <div class="d-flex align-center justify-space-between w-100 ga-2">
                                    <v-avatar size="36" :color="'primary'" :class="'square_icon text-' + 'info'" variant="tonal">
                                        <component :is="fivecards[i % fivecards.length].icon" :style="{ fontSize: '16px' }" />
                                    </v-avatar>
                                    <div style="margin-left: 0px !important;">
                            
                                        <h6 class="text-subtitle-1 mb-0">{{wallet.attributes.currency_code}} Wallet</h6>
                                        <span class="text-subtitle-2 text-lightText font-weight-regular">Fiat Holding</span>
                                    </div>
                                    <div class="text-right">
                                        <v-avatar size="36"  :class="'text-' + 'warning'" variant="tonal">
                                            <component :is="CopyOutlined " :style="{ fontSize: '16px' }" />
                                        </v-avatar>
                                    </div>
                                </div>
                            </v-row>
                            <v-row>
                                <div class="d-flex align-center justify-space-between w-100 ga-2">
                                    <div>
                                        <h6 class="mb-0 text-subtitle-2 text-lightText font-weight-regular">Total Balance</h6>
                                        <span class="text-subtitle-1 f_large">{{formatCountryCurrency(wallet.attributes.net_bal, wallet.attributes.currency_code)}}</span>
                                    </div>
                                </div>
                            </v-row>
                          
                        </div>
                    </v-card-text>
                    
                    <v-divider></v-divider>

                    <v-list-item
                        link
                        subtitle="View Transaction"
                        :href="`/fiat_wallets/${wallet.id}`"
                        style="background-color: #f6f6f6"
                       >
                        <template v-slot:append>
                            <v-icon :icon="RightOutlined" size="14"></v-icon>
                        </template>
                    </v-list-item>
                </v-card>
            </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" v-if="empty_fiat_wallets.length === 0 && isFiatLoading===false">
            <v-card elevation="0" class="rounded-card">
                <v-card variant="outlined"  class="rounded-card">
                    
                     
                    <v-card-text class="main_box">
                        <div>
                            <v-row class="mb-5 ">
                                <div class="d-flex align-center justify-space-between w-100 ga-2">
                                    <v-avatar size="36" :color="'primary'" :class="'square_icon text-' + 'info'" variant="tonal">
                                        <component :is="fivecards[0].icon" :style="{ fontSize: '16px' }" />
                                    </v-avatar>
                                    <div style="margin-left: 0px !important;">
                            
                                        <h6 class="text-subtitle-1 mb-0">No Fiat Wallet</h6>
                                        <span class="text-subtitle-2 text-lightText font-weight-regular">Fiat Holding</span>
                                    </div>
                                    <div class="text-right">
                                        <v-avatar size="36"  :class="'text-' + 'warning'" variant="tonal">
                                            <component :is="CopyOutlined " :style="{ fontSize: '16px' }" />
                                        </v-avatar>
                                    </div>
                                </div>
                            </v-row>
                            <v-row>
                                <div class="d-flex align-center justify-space-between w-100 ga-2">
                                    <div>
                                        <h6 class="mb-0 text-subtitle-2 text-lightText font-weight-regular">Total Balance</h6>
                                        <span class="text-subtitle-1 f_large">0.0</span>
                                    </div>
                                </div>
                            </v-row>
                          
                        </div>
                    </v-card-text>
                    
                    <v-divider></v-divider>

                    <v-list-item
                        link
                        subtitle="Create Fiat Wallet"
                        :href="`/create_fiat_wallets`"
                        style="background-color: #f6f6f6"
                       >
                        <template v-slot:append>
                            <v-icon :icon="RightOutlined" size="14"></v-icon>
                        </template>
                    </v-list-item>
                </v-card>
            </v-card>
        </v-col>
    </v-row>
</template>

