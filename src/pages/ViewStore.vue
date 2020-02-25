<template>
    <f7-page name="store">
        <EditStoreConfiguration v-if="!storeId" @cancel="onCancel()" :edit-mode="editMode"
                                @submit="onSaveData($event)"></EditStoreConfiguration>


        <template v-else-if="storeId">
            <EditStoreConfiguration :data="storeData" @cancel="onCancel()" :edit-mode="editMode"
                                    @submit="onSaveData($event)"></EditStoreConfiguration>
            <f7-list-button title="POS" :link="generateUrl(Routes.SimplePOS)" ></f7-list-button>

            <f7-toolbar bottom></f7-toolbar>
            <f7-fab v-show="!editMode" position="bottom-center" slot="fixed" @click="editMode = true">
                <f7-icon ios="f7:settings" aurora="f7:settings" md="material:settings"></f7-icon>
            </f7-fab>
        </template>
    </f7-page>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {useStore} from "vuex-simple";
    import {RootModule} from "@/store/root.module";
    import EditStoreConfiguration from "@/components/EditStoreConfiguration.vue";
    import {ServerModule, StoreModule, StoreModuleData} from "@/store";
    import ServerStatus from "@/components/ServerStatus.vue";
    import StoreList from "@/components/StoreList.vue";
    import {Routes} from "@/routes";

    @Component({
        components: {StoreList, EditStoreConfiguration, ServerStatus}
    })
    export default class ViewStore extends Vue {
        @Prop({required: true})
        public serverId!: string;
        @Prop({required: false})
        public storeId?: string;
        
        public store: RootModule = useStore(this.$store);
        public editMode = false;

        public get serverModule(): ServerModule | null {
            if (this.serverId) {
                return this.store.server(this.serverId)??null;
            }
            return null;
        }
        
        public get storeData(): StoreModule | null {
            if (this.storeId) {
                return this.serverModule?.store(this.storeId)?? null;
            }
            return null;
        }

        public mounted() {
            if (!this.serverId) {
                this.editMode = true;
            }
        }

        public async onSaveData(data: StoreModuleData) {
            const storeId = await this.serverModule?.addOrUpdateStore(data);
            if (this.storeId != storeId && storeId) {
                this.$f7router?.navigate({
                    name: Routes.ViewStore,
                    params: {
                        serverId: this.serverId,
                        storeId
                    }
                });
            }
        }

        public onCancel() {
            if (this.storeId) {
                this.editMode = false;
                return;
            }
            this.$f7router?.back();
        }
    }
</script>