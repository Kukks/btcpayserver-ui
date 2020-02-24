<template>
    <f7-card>
        <f7-card-header>Stores</f7-card-header>
        <f7-card-content :padding="false">
            <f7-list>
                <f7-list-item
                        v-for="store in data"
                        :link="`/servers/${serverId}/stores/${store.id}`"
                        :key="store.id"
                        :title="store.name"
                />
                <f7-list-button v-if="canAddStore" title="Add Store"
                                :link="`/servers/${serverId}/stores/add`"></f7-list-button>
            </f7-list>
        </f7-card-content>
    </f7-card>

</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {StoreModuleData} from "@/store";

    @Component({})
    export default class StoreList extends Vue {
        @Prop()
        public serverId!: string;
        @Prop()
        public data!: StoreModuleData[];
        @Prop()
        public canAddStore!: boolean;
    }
</script>