<template>
    <f7-page name="server">
        <EditServerConfiguration v-if="!serverId" @cancel="onCancel()" :edit-mode="editMode"
                                 @submit="onSaveData($event)"></EditServerConfiguration>
        
        <template v-else-if="serverId">
            <EditServerConfiguration :server="serverData" @cancel="onCancel()" :edit-mode="editMode"
                                     @submit="onSaveData($event)"></EditServerConfiguration>
            <f7-toolbar bottom></f7-toolbar>
            <f7-fab v-show="!editMode" position="bottom-center" slot="fixed" @click="editMode = true">
                <f7-icon ios="f7:settings" aurora="f7:settings" md="material:settings"></f7-icon>
            </f7-fab>
        </template>

        <f7-block v-if="serverData && !editMode">
            <f7-row>
                <f7-col width="100" medium="50" large="25">
                    <ServerStatus v-if="serverData.authenticationResult"
                                  :data="serverData.authenticationResult" 
                                    @refresh="refreshServerData()"></ServerStatus>
                </f7-col>
                <f7-col  width="100" medium="50" large="25" >
                    <StoreList :data="serverData.stores.map(value => serverData.store(value))" :server-id="serverId"
                               :can-add-store="serverData.hasPermission(Permissions.CanCreateStores)" :can-remove-store="Permissions.CanRemoveStores"></StoreList>
                </f7-col>
                <f7-col width="100" medium="50" large="25">
                    <ServerStatus v-if="serverData.authenticationResult"
                                  :data="serverData.authenticationResult"></ServerStatus>
                </f7-col>
                <f7-col  width="100" medium="50" large="25" >
                    <StoreList :data="serverData.stores.map(value => serverData.store(value))" :server-id="serverId"
                               :can-add-store="serverData.hasPermission(Permissions.CanCreateStores)"></StoreList>
                </f7-col>
                <f7-col width="100" medium="50" large="25">
                    <ServerStatus v-if="serverData.authenticationResult"
                                  :data="serverData.authenticationResult"></ServerStatus>
                </f7-col>
                <f7-col  width="100" medium="50" large="25" >
                    <StoreList :data="serverData.stores.map(value => serverData.store(value))" :server-id="serverId"
                               :can-add-store="serverData.hasPermission(Permissions.CanCreateStores)"></StoreList>
                </f7-col>
                <f7-col width="100" medium="50" large="25">
                    <ServerStatus v-if="serverData.authenticationResult"
                                  :data="serverData.authenticationResult"></ServerStatus>
                </f7-col>
                <f7-col  width="100" medium="50" large="25" >
                    <StoreList :data="serverData.stores.map(value => serverData.store(value))" :server-id="serverId"
                               :can-add-store="serverData.hasPermission(Permissions.CanCreateStores)"></StoreList>
                </f7-col>
            </f7-row>
        </f7-block>
    </f7-page>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {useStore} from "vuex-simple";
    import {RootModule} from "@/store/root.module";
    import EditServerConfiguration from "@/components/EditServerConfiguration.vue";
    import {ServerModule, ServerModuleData} from "@/store";
    import ServerStatus from "@/components/ServerStatus.vue";
    import StoreList from "@/components/StoreList.vue";
    import {Routes} from "@/routes";

    @Component({
        components: {StoreList, EditServerConfiguration, ServerStatus}
    })
    export default class ViewServer extends Vue {
        @Prop({required: false})
        public serverId?: string;
        public store: RootModule = useStore(this.$store);
        public editMode = false;

        public get serverData(): ServerModule | null {
            if (this.serverId) {
                return this.store.server(this.serverId);
            }
            return null;
        }

        public mounted() {
            if (!this.serverId) {
                this.editMode = true;
            }
        }

        public async onSaveData(data: ServerModuleData) {
            const serverId = await this.store.addOrUpdateServer(data);
            if (this.serverId != serverId) {
                this.$f7router?.navigate({
                    name: Routes.ViewServer,
                    params: {
                        serverId
                    }
                });
            }
        }

        public onCancel() {
            if (this.serverId) {
                this.editMode = false;
                return;
            }
            this.$f7router?.back();            
        }
        
        public async refreshServerData() {
            await this.serverData?.update();
        }
    }
</script>

<style scoped>

</style>