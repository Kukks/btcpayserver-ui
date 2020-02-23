<template>
        <f7-list no-hairlines-md form ref="servereditform" @submit.prevent="submit()">
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
            <f7-list-item-row>
                <f7-list-item-cell>
                    <f7-button type="submit" title="Save">Save</f7-button>
                </f7-list-item-cell>
                <f7-list-item-cell>
                    <f7-button title="Cancel" @click="cancel()">Cancel</f7-button>
                </f7-list-item-cell>
            </f7-list-item-row>
        </f7-list>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {ServerModuleData} from "@/store";
    import {VueEl} from "@/shims-vue";

    @Component({})
    export default class EditServerConfiguration extends Vue implements ServerModuleData {
        public serverUrl: string = "";
        public apiKey: string = "";

        @Prop()
        public server?: ServerModuleData;

        $refs!: {
            servereditform: VueEl<HTMLFormElement>;
        };
        
        public mounted(){
            this.serverChanged(this.server)
        }

        @Watch("server")
        public serverChanged(val?: ServerModuleData) {
            if (val) {
                this.serverUrl = val.serverUrl;
                this.apiKey = val.apiKey;
            } else {
                this.serverUrl = "";
                this.apiKey = "";
            }
        }

        public submit() {
            if (this.$refs.servereditform.$el.reportValidity()) {
                this.$emit("submit", {id: this.server?.id, ... this} as ServerModuleData)
            }
        }

        public cancel() {
            this.serverChanged(this.server);
            this.$emit("cancel");
        }
    }
</script>