<template>
    <f7-page name="home">
        <EditServerConfiguration :data="data" @submit="onSaveData($event)"></EditServerConfiguration>
    </f7-page>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {ServerModuleData, RootModule} from "../store";
    import {Guid} from 'guid-typescript';
    import {useStore} from "vuex-simple";
    import EditServerConfiguration from "@/components/EditServerConfiguration.vue";

    @Component({
        components: {EditServerConfiguration}
    })
    export default class ViewServer extends Vue {
        @Prop({required: false})
        public serverId?: Guid;

        public store: RootModule = useStore(this.$store);

        public get data(): ServerModuleData | undefined {
            if (this.serverId) {
                return this.store.server(this.serverId);
            }
            return undefined;
        }

        public onSaveData(data: ServerModuleData) {
            if (this.serverId) {
                const serverStore = this.store.server(this.serverId);
                if (serverStore) {
                    serverStore.update(data);
                }
            }
            this.store.addServer();
        }
    }
</script>

<style scoped>

</style>