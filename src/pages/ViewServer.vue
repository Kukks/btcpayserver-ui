<template>
    <f7-page name="home">
        <EditServerConfiguration v-if="editMode" :data="serverData" @cancel="onCancel()" @submit="onSaveData($event)"></EditServerConfiguration>
    </f7-page>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {ServerModuleData} from "../store";
    import {Guid} from 'guid-typescript';
    import {useStore} from "vuex-simple";
    import EditServerConfiguration from "@/components/EditServerConfiguration.vue";
    import {RootModule} from "@/store/root.module";

    @Component({
        components: {EditServerConfiguration}
    })
    export default class ViewServer extends Vue {
        @Prop({required: false})
        public serverId?: Guid;
        public store: RootModule = useStore(this.$store);
        public editMode = false;

        public get serverData(): ServerModuleData | null {
            if (this.serverId) {
                return this.store.server(this.serverId);
            }
            return {apiKey: "", id: "", serverUrl: ""};
        }

        public mounted() {

            if (!this.serverId) {
                this.editMode = true;
            }
        }

        public onSaveData(data: ServerModuleData) {
            if (this.serverId) {
                const serverStore = this.store.server(this.serverId);
                if (serverStore) {
                    serverStore.update(data);
                    return;
                }
            }

            this.serverId = this.store.addServer();
            this.$f7router?.navigate({
                name: 'server',
                params: {
                    "id": this.serverId.toString()
                }
            });
        }
        
        public onCancel(){
            if(this.serverId){
                this.editMode = false;
                return;
            }
            this.$f7router?.back();
        }
    }
</script>

<style scoped>

</style>