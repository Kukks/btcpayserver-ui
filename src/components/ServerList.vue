<template>
    <f7-list accordion-list accordion-opposite>
        <f7-list-item
                accordion-item
                v-for="server in servers"
                :opened="true"
                :key="server.id"
                :title="server.serverUrl"
        >

            <f7-link slot="after-title"  :href="generateUrl(Routes.ViewServer, {serverId: server.id})">
                <f7-icon ios="f7:chevron_right" aurora="f7:chevron_right" md="material:chevron_right"></f7-icon> </f7-link>

            <f7-accordion-content>
                <f7-list>
                    <f7-list-item title="Server overview" :link="generateUrl(Routes.ViewServer, {serverId: server.id})"></f7-list-item>
                    <f7-list-item v-for="store in server.stores.map(value => server.store(value))"
                                  :key="store.id"
                                  :title="store.name"
                                  :link="generateUrl(Routes.ViewStore, {serverId: server.id, storeId: store.id})"></f7-list-item>

                </f7-list>
            </f7-accordion-content>

        </f7-list-item>
        <f7-list-button title="Add Server" :link="generateUrl(Routes.AddServer)" ></f7-list-button>
    </f7-list>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {ServerModule} from "@/store";

    @Component({})
    export default class ServerList extends Vue {
        @Prop()
        public servers!: ServerModule[];
    }
</script>