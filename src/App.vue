<template>
    <f7-app :params="f7params" :theme-dark="darkTheme">
        <f7-navbar title="BTCPay Server">
            <f7-link v-if="showLeftPanel" slot="left" icon-md="material:menu" icon-aurora="material:menu" icon-ios="f7:bars" icon panel-open="left"></f7-link>
        </f7-navbar>
        <LeftPanel v-if="showLeftPanel"></LeftPanel>
        <f7-view main url="/" :push-state="!$device.cordova" >
        </f7-view>
       
    </f7-app>


</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Framework7Params} from "framework7/components/app/app-class";
    import {routes} from "@/routes";
    import {useStore} from "vuex-simple";
    import {RootModule} from "@/store/root.module";
    import LeftPanel from "@/components/LeftPanel.vue";

    @Component({
        components: {
            LeftPanel
        }
    })
    export default class App extends Vue {
        public f7params: Framework7Params = {
            id: "org.btcpayserver.ui", // app bundle ID
            name: "BTCPay Server UI", // app name
            theme: "auto", // automatic theme detection
            // app routes
            routes: routes
        };
        public store: RootModule = useStore(this.$store);

        public get showLeftPanel(){
            return this.store.servers.length > 0;
        }
        
        public get darkTheme() {
            return this.store.appPreferences.darkMode;
        }
    }
</script>