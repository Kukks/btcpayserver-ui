<template>
    <f7-page name="home">
        <template v-if="editMode">
            <EditServerConfiguration v-if="!serverId" @cancel="onCancel()"
                                     @submit="onSaveData($event)"></EditServerConfiguration>
            <EditServerConfiguration v-else :server="serverData" @cancel="onCancel()"
                                     @submit="onSaveData($event)"></EditServerConfiguration>
        </template>
        <template v-else-if="serverId">
            <f7-toolbar bottom></f7-toolbar>
            <f7-fab v-show="!editMode" position="bottom-center" slot="fixed"  @click="editMode = true">
                <f7-icon ios="f7:settings" aurora="f7:settings" md="material:settings"></f7-icon>
            </f7-fab>
        </template>
    </f7-page>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {useStore} from "vuex-simple";
    import {RootModule} from "@/store/root.module";
    import EditServerConfiguration from "@/components/EditServerConfiguration.vue";
    import {ServerModuleData} from "@/store";

    @Component({
        components: {EditServerConfiguration}
    })
    export default class ViewServer extends Vue {
        @Prop({required: false})
        public serverId?: string;
        public store: RootModule = useStore(this.$store);
        public editMode = false;

        public get serverData(): ServerModuleData | null {
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
            console.warn("savedata", data);
            const serverId = await this.store.addOrUpdateServer(data);
            console.warn("serverId", serverId);
            if (this.serverId != serverId) {
                this.$f7router?.navigate({
                    name: 'server',
                    params: {
                        serverId
                    }
                });
                this.$f7router?.clearPreviousHistory();
            }
        }

        public onCancel() {
            if (this.serverId) {
                this.editMode = false;
                return;
            }
            console.log(this.$f7router?.currentRoute.url);
            this.$f7router?.back();

            console.log(this.$f7router?.currentRoute.url);
            
        }
    }
</script>

<style scoped>

</style>