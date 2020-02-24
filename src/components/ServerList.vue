<template>
    <f7-list accordion-list accordion-opposite>
        <f7-list-item
                accordion-item
                v-for="server in servers"
                :opened="true"
                :key="server.id"
                :title="server.serverUrl"
        >

            <f7-link slot="after-title"  :href="`/servers/${server.id}`"> > </f7-link>

            <f7-accordion-content>
                <f7-list>
                    <f7-list-item title="Server overview" :link="`/servers/${server.id}`"></f7-list-item>
                    <f7-list-item v-for="store in server.stores.map(value => server.store(value))"
                                  :key="store.id"
                                  :title="store.name"
                                  :link="`/servers/${server.id}/stores/${store.id}`"></f7-list-item>

                </f7-list>
            </f7-accordion-content>

        </f7-list-item>
        <f7-list-button title="Add Server" link="/servers/add" ></f7-list-button>
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