<template>
    <f7-list>
        <f7-list-item
                v-for="server in servers"
                :link="`/server/${server.id}`"
                :key="server.id"
                :title="server.serverUrl"
        />
        <f7-list-button title="Add Server" link="/server/" ></f7-list-button>
    </f7-list>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {ServerModuleData} from "@/store";

    @Component({})
    export default class ServerList extends Vue {
        @Prop()
        public servers!: ServerModuleData[];
    }
</script>