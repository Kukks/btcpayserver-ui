<template>
    <f7-app :params="f7params" :theme-dark="darkTheme" :class="[ colorTheme? `color-theme-${colorTheme}` : '']">
        <template v-if="f7loaded">
            <f7-navbar title="BTCPay Server">
                <f7-link v-if="showLeftPanel" slot="left" icon-md="material:menu" icon-aurora="material:menu"
                         icon-ios="f7:bars" icon panel-open="left"></f7-link>
            </f7-navbar>
            <LeftPanel v-if="showLeftPanel"></LeftPanel>
            <f7-view main :url="generateUrl(Routes.Home)" :push-state="!$device.cordova">
            </f7-view>
            <div v-html="cssTheme"></div>
        </template>
    </f7-app>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Framework7Params} from "framework7/components/app/app-class";
    import {routes} from "@/routes";
    import {useStore} from "vuex-simple";
    import {RootModule} from "@/store/root.module";
    import LeftPanel from "@/components/LeftPanel.vue";
    import {startupParameters} from "@/services/url.service";
    import routerService from "@/services/router.service";

    @Component({
        components: {
            LeftPanel
        }
    })
    export default class App extends Vue {
        public f7params: Framework7Params = {
            id: "org.btcpayserver.ui", // app bundle ID
            name: "BTCPay Server UI", // app name
            theme: startupParameters["theme"] ?? "auto", // automatic theme detection
            // app routes
            routes: routes
        };
        public store: RootModule = useStore(this.$store);
        public f7loaded = false;
        public cssTheme = "";

        public get showLeftPanel() {
            return this.store.servers.length > 0;
        }

        public get darkTheme() {
            return this.store.appPreferences.darkMode;
        }

        public get colorTheme() {
            return this.store.appPreferences.colorTheme ? this.store.appPreferences.colorTheme : "btcpay";
        }
        
        public mounted(){
            if(this.$f7ready){
                this.$f7ready(f7 => {
                    const sx = (f7.utils as any).colorThemeCSSProperties('#1e7a44');
                    console.warn(f7);
                    routerService.setRouter((f7 as any).router);
                    this.f7loaded = true;
                    this.cssTheme = `<style>.color-theme-btcpay {${Object.keys(sx).map(value => `${value}: ${sx[value]};`).join(' ')} }</style>`;
                });
            }
            
        }
    }
</script>
