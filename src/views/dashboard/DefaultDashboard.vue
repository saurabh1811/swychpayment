<script setup lang="ts">
import WidgetFive from './components/WidgetFive.vue';
import UniqueVisitor from './components/UniqueVisitor.vue';
import IncomeOverview from './components/IncomeOverview.vue';
import RecentOrder from './components/RecentOrder.vue';
import AnalyticsReport from './components/AnalyticsReport.vue';
import HelpSupport from './components/HelpSupport.vue';
import TransactionHistory from './components/TransactionHistory.vue';
import SalesReport from './components/SalesReport.vue';
import SingleCard from './components/SingleCard.vue';
import Users from '@/views/dashboard/usertable/Users.vue';
</script>
<template>
  <!-- -------------------------------------------------------------------- -->
  <!-- Total widgets -->
  <!-- -------------------------------------------------------------------- -->
  <!-- <WidgetFive /> -->

  <v-row class="mb-0">
    <!-- -------------------------------------------------------------------- -->
    <!-- Unique visitor -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" md="8">
      
      <WidgetFive />
      <SalesReport />
    </v-col>

    <!-- -------------------------------------------------------------------- -->
    <!-- Income overview -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" md="4">
      <SingleCard />
    </v-col>
  </v-row>
  <v-row class="mb-0">
    <!-- -------------------------------------------------------------------- -->
    <!-- Recent order -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="12" md="12">
      <Users />
    </v-col>

    <!-- -------------------------------------------------------------------- -->
    <!-- Analytics Report -->
    <!-- -------------------------------------------------------------------- -->
    
  </v-row>
  
    
</template>
