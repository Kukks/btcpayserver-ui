<template>
    <div>
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
        </f7-list>
        <f7-toolbar position="bottom">

            <f7-button title="Save" @click="submit()">Save</f7-button>
            <f7-button title="Cancel" @click="cancel()">Cancel</f7-button>

        </f7-toolbar>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {ServerModuleData} from "@/store";

    @Component
    export default class EditServerConfiguration extends Vue implements ServerModuleData {
        public serverUrl: string = "";
        public apiKey: string = "";

        @Prop()
        public data!: ServerModuleData;

        $refs!: {
            servereditform: HTMLFormElement;
        };

        @Watch("data")
        public dataChanged(val: ServerModuleData) {
            if (val) {
                this.serverUrl = val.serverUrl;
                this.apiKey = val.apiKey;
            } else {
                this.serverUrl = "";
                this.apiKey = "";
            }
        }

        public submit() {
            if (this.$refs.servereditform.checkValidity()) {
                this.$emit("submit", this as ServerModuleData)
            }
        }

        public cancel() {
            this.dataChanged(this.data);
            this.$emit("cancel");
        }
    }
</script>