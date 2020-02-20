<template>
    <f7-list no-hairlines-md form ref="servereditform">
        <f7-list-input
                label="BTCPay Server Url"
                type="url"
                placeholder="btcpay.com"
                info="Default validation"
                required
                validate
                clear-button
                :value="serverUrl" @input="serverUrl=$event.target.value"
        >
        </f7-list-input>
        <f7-list-input
                label="API Key"
                type="password"
                info="An API key generated from BTCPay"
                required
                validate
                :value="apiKey" @input="apiKey=$event.target.value"
                clear-button
        >
        </f7-list-input>
        <f7-list-input
                label="Default"
                type="checkbox"
                info="Set as the default server for this app"
        >
        </f7-list-input>
        <f7-list-button title="Save" @click="submit()"></f7-list-button>
        <f7-list-button title="Cancel" @click="cancel()"></f7-list-button>
    </f7-list>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {useStore} from "vuex-simple";
    import {RootModule, ServerModuleData} from "@/store";

    @Component
    export default class EditServerConfiguration extends Vue implements ServerModuleData {
        public serverUrl: string = "";
        public apiKey: string = "";

        @Prop()
        public data!: ServerModuleData;

        public store: RootModule = useStore(this.$store);
        $refs!: {
            servereditform: HTMLFormElement;
        }

        @Watch('data')
        public dataChanged(val: ServerModuleData, oldVal: ServerModuleData) {
            if (val) {
                this.serverUrl = val.serverUrl;
                this.apiKey = val.apiKey;
            } else {
                this.serverUrl = "";
                this.apiKey = "";
            }
        }

        public submit() {
            debugger;
            const val = this.$refs.servereditform.checkValidity();
            if (val) {
                this.$emit("submit", this as ServerModuleData)
            }
        }

        public cancel() {
            this.dataChanged(this.data, this.data);
        }

    }
</script>