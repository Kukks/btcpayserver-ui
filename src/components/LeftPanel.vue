<template>
    <f7-panel left cover>
        <f7-page>
            <f7-navbar title="Server Selection"/>
            <ServerList :servers="servers"></ServerList>

            <f7-list simple-list>
                <f7-list-item>
                    <span>Dark mode</span>
                    <f7-toggle :checked="darkTheme" @change="darkTheme = !darkTheme"></f7-toggle>
                </f7-list-item>
            </f7-list>
        </f7-page>
    </f7-panel>
</template>

<script lang="ts">
    import {useStore} from "vuex-simple";
    import {Component, Vue} from "vue-property-decorator";
    import ServerList from "@/components/ServerList.vue";
    import {RootModule} from "@/store/root.module";

    @Component({
        components: {ServerList}

    })
    export default class LeftPanel extends Vue {
        public store: RootModule = useStore(this.$store);

        public get servers(){
            return this.store.servers.map(value => this.store.server(value));
        }
        
        public get darkTheme() {
            return this.store.appPreferences.darkMode;
        }

        public set darkTheme(val: boolean) {
            this.store.appPreferences.setDarkMode(val);
        }
    }
</script>