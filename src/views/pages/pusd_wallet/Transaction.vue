<template>
    <UiTitleCard title="PUSD Transactions" class-name="px-0 rounded-md overflow-hidden">
    
            <template v-if="loading">
                <!-- Skeleton Placeholder -->
                <div class="p-4">
                    <DataTable :value="products">
                        <Column field="transaction_id" header="Transaction Id">
                            <template #body>
                                <Skeleton></Skeleton>
                            </template>
                        </Column>
                        <Column field="amount" header="Amount">
                            <template #body>
                                <Skeleton></Skeleton>
                            </template>
                        </Column>
                        <Column field="net_bal" header="Net Bal">
                            <template #body>
                                <Skeleton></Skeleton>
                            </template>
                        </Column>
                        <Column field="remarks" header="Remark">
                            <template #body>
                                <Skeleton></Skeleton>
                            </template>
                        </Column>
                        <Column field="purpose" header="Purpose">
                            <template #body>
                                <Skeleton></Skeleton>
                            </template>
                        </Column>
                    </DataTable>
                    
                </div>
            </template>
            <template v-else>
                <DataTable ref="dataTable" v-model:filters="filters" v-model:selection="selectedCustomers" :value="customers" paginator :rows="10" dataKey="id" filterDisplay="menu"
                    :globalFilterFields="['id', 'attributes.transaction_id',  'attributes.amount']" :sortField="sortField"
                    :sortOrder="sortOrder">
                    <template #header>
                        <div class="flex justify-between">
                            <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                            </IconField>
                        </div>
                    </template>
                    <template #empty> No transaction found. </template>
                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    
                    <Column field="attributes.transaction_id" header="Transaction Id" sortable style="min-width: 14rem">
                        <template #body="{ data }">
                            {{ data.attributes.transaction_id }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text" placeholder="Search by name" />
                        </template>
                    </Column>
                    <Column field="attributes.amount" header="Amount" sortable filterField="attributes.amount" dataType="numeric" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatCurrency(data.attributes.amount) }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputNumber v-model="filterModel.value" mode="currency" currency="USD" locale="en-US" />
                        </template>
                    </Column>
                    <Column field="attributes.net_bal" header="Net Bal" sortable filterField="attributes.net_bal" dataType="numeric" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatCurrency(data.attributes.net_bal) }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputNumber v-model="filterModel.value" mode="currency" currency="USD" locale="en-US" />
                        </template>
                    </Column>
                    <Column field="attributes.remarks" header="Remark" sortable filterField="attributes.remarks"  style="min-width: 10rem">
                        <template #body="{ data }">
                            {{data.attributes.remarks }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text" placeholder="Search by remarks" />
                        </template>
                    </Column>
                    <Column field="attributes.purpose" header="Purpose" sortable filterField="attributes.purpose"  style="min-width: 10rem">
                        <template #body="{ data }">
                            {{data.attributes.purpose }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text" placeholder="Search by purpose" />
                        </template>
                    </Column>
                    <Column header="Type" sortable sortField="attributes.transaction_type" filterField="attributes.transaction_type" :showFilterMatchModes="false" :filterMenuStyle="{ width: '8rem' }" style="min-width: 8rem">
                        <template #body="{ data }">
                            <div class="flex items-center gap-2">
                             
                                <span>{{ data.attributes.transaction_type }}</span>
                            </div>
                        </template>
                        <template #filter="{ filterModel }">
                            <MultiSelect v-model="filterModel.value" :options="types" optionLabel="name" optionValue="name" placeholder="Any" @change="(e) => console.log('Selected Transaction Types:', e.value)">
                                <template #option="slotProps">
                                    <div class="flex items-center gap-2">
                                        <span>{{ slotProps.option.name }}</span>
                                    </div>
                                </template>
                            </MultiSelect>
                        </template>
                    </Column>
                    
                    <Column header="Status" field="data.attributes.status" filterField="attributes.status" :showFilterMatchModes="false" sortable :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                        <template #body="{ data }">
                            <Tag :value="data.attributes.status" :severity="getSeverity(data.attributes.status)" > {{getStatus(data.attributes.status)}}</Tag>
                        </template>
                        <template #filter="{ filterModel }">
                            <MultiSelect v-model="filterModel.value" :options="statuses" optionLabel="name" optionValue="value" placeholder="Any" @change="(e) => console.log('Selected Transaction Types:', e.value)">
                                <template #option="slotProps">
                                    <div class="flex items-center gap-2">
                                        <span>{{ slotProps.option.name }}</span>
                                    </div>
                                </template>
                            </MultiSelect>
                            
                        </template>
                    </Column>
                    
                    
                    <Column field="attributes.created_at" header="Created At" sortable filterField="attributes.created_at" dataType="date" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatDate(data.attributes.created_at) }}
                        </template>
                        <template #filter="{ filterModel }">
                            <DatePicker v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                        </template>
                    </Column>
                    
                    
                </DataTable>
            </template>
        
    </UiTitleCard>
</template>

<script setup>
        import { ref, onMounted } from 'vue';

      
        import { computed } from 'vue'
        import { TransactionService } from '@/service/TransactionService';
        import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
        import UiTitleCard from '@/components/shared/UiTitleCard.vue';



        import DataTable from 'primevue/datatable';
        import Column from 'primevue/column';
        import InputText from 'primevue/inputtext';
        import IconField from 'primevue/iconfield';
        import InputIcon from 'primevue/inputicon';
        import MultiSelect from 'primevue/multiselect';
        import DatePicker from 'primevue/datepicker';
        import InputNumber from 'primevue/inputnumber';
        import Skeleton from 'primevue/skeleton'; // Import Skeleton Component

        import Tag from 'primevue/tag';
        import ProgressBar from 'primevue/progressbar';
        import Slider from 'primevue/slider'
        import Button from 'primevue/button';

        import ColumnGroup from 'primevue/columngroup';   // optional
        import Row from 'primevue/row';  
        const products = ref(new Array(10));   
        
        const statuses = ref([{ name: 'Processed', value: 1},
        { name: 'Rejected', value: 2 }, { name: 'Pending', value: 0 }]);
        const types = ref([
            { name: 'Credit', type: "credit"},
            { name: 'Debit', type: "debit" },
        ]);
                     
        const loading = ref(true); 


        const customers = ref();
        const selectedCustomers = ref();
        const filters = ref();
        const dataTable = ref(null); // Reference to the DataTable component

        const sortField = ref(null); // Track sorting field
        const sortOrder = ref(null); // Track sorting order

        const representatives = ref([
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'XuXue Feng', image: 'xuxuefeng.png' }
        ]);
        // const statuses = ref(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal']);

        onMounted(async () => {
            try {
                const data = await TransactionService.getWalletTransactions();
                console.log(data.data)
                customers.value = getTransaction(data.data.data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            } finally {
                loading.value = false; // Hide shimmer once data is fetched
            }
        });


        const initFilters = () => {
            filters.value = {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
               
                'attributes.transaction_id': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'attributes.created_at': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
                'attributes.amount': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                'attributes.net_bal': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
                'attributes.remarks': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'attributes.purpose': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                'attributes.transaction_type': { value: null, matchMode: FilterMatchMode.IN },
                'attributes.status': { value: null, matchMode: FilterMatchMode.IN },


                
            };
        };

        initFilters();

        const formatDate = (value) => {
            return value.toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true, 
            });
        };
        const formatCurrency = (value) => {
            return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        };
        const clearFilter = () => {
            initFilters();
            if (dataTable.value) {
                sortField.value = null; // Reset sorting field
                sortOrder.value = null; // Clear all filters and sorting using DataTable's clear method
            }
        };
        const getTransaction = (data) => {
            return [...(data || [])].map((d) => {
                d.attributes.created_at = new Date(d.attributes.created_at);

                return d;
            });
        };
        const getSeverity = (status) => {
            switch (status) {
                case 0:
                    return 'info';

                case 1:
                    return 'success';

                case 2:
                    return 'danger';

                case 3:
                    return 'danger';

                default:
                    return 'info';
            }
        };

        const getStatus = (status) => {
            switch (status) {
                case 0:
                    return 'Pending';

                case 1:
                    return 'Processed';

                case 2:
                    return 'Rejected';

                case 3:
                    return 'Rejected';

                default:
                    return 'Pending';
            }
        };

                
            
  </script>
  
  
  
  
  
  