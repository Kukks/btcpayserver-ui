<template>
    <f7-app :params="f7params" :theme-dark="darkTheme">
        <LeftPanel></LeftPanel>
        <f7-view main url="/" >

        </f7-view>
    </f7-app>


</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Framework7Params} from "framework7/components/app/app-class";
    import {routes} from "@/routes";
    import LeftPanel from "@/components/LeftPanel.vue";
    import {RootModule} from "@/store";
    import {useStore} from "vuex-simple";

    @Component({
        components: {
            LeftPanel
        }
    })
    export default class App extends Vue {
        public f7params: Framework7Params = {
            id: "io.framework7.testapp", // app bundle ID
            name: "Framework7", // app name
            theme: "auto", // automatic theme detection
            // app routes
            routes: routes
        };
        public store: RootModule = useStore(this.$store);

        public get darkTheme() {
            return this.store.appPreferences.darkMode;
        }
    }
</script>