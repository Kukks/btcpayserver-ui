<template>
    <f7-list>
        <f7-list-item
                :link="`/server/${n.id}`"
                v-for="n in servers"
                :key="n.id"
                :title="n.store.serverUrl"
        />
        <f7-list-button title="Add Server" link="/server" ></f7-list-button>
    </f7-list>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {useStore} from "vuex-simple";
    import {RootModule} from "@/store";

    @Component
    export default class ServerList extends Vue {
        public store: RootModule = useStore(this.$store);

        public get servers() {
            return this.store.servers.map(value => {
                return {
                    id: value,
                    store: this.store.server(value)
                };
            })
        }

    }
</script>