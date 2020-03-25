<template>
        <f7-list no-hairlines-md form ref="servereditform" @submit.prevent="submit()">
            <f7-list-input
                    label="BTCPay Server Url"
                    type="url"
                    placeholder="https://btcpay.com"
                    info="The full url of the BTCPay Server that you are using."
                    required
                    validate
                    :readonly="!editMode"
                    :value="serverUrl" @input="serverUrl=$event.target.value">
            </f7-list-input>
            <f7-list-input
                    label="API Key"
                    type="password"
                    info="An API key generated from BTCPay"
                    :required="!username"
                    validate
                    :readonly="!editMode"
                    :value="apiKey" @input="apiKey=$event.target.value">
            </f7-list-input>
            <f7-list-input
                    label="Username"
                    type="email"
                    info="Your BTCPay username/email"
                    :required="!apiKey"
                    validate
                    :readonly="!editMode"
                    :value="username" @input="username=$event.target.value">
            </f7-list-input>
            <f7-list-input
                    label="Password"
                    type="password"
                    info="Your BTCPay password"
                    :required="!!username"
                    validate
                    :readonly="!editMode"
                    :value="password" @input="password=$event.target.value">
            </f7-list-input>
            <f7-list-item-row v-if="editMode">
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
        public username: string = "";
        public password: string = "";

        @Prop()
        public editMode!: boolean;

        @Prop()
        public server?: ServerModuleData;

        $refs!: {
            servereditform: VueEl<HTMLFormElement>;
        };

        public mounted() {
            this.serverChanged(this.server)
        }

        @Watch("username")
        public usernameChanged(val?: string) {
            if (val) {
                this.apiKey = "";
            }
        }

        @Watch("apiKey")
        public apiKeyChanged(val?: string) {
            if (val) {
                this.username = "";
                this.password = "";
            }
        }

        @Watch("server")
        public serverChanged(val?: ServerModuleData) {
            if (val) {
                this.serverUrl = val.serverUrl;
                this.apiKey = val.apiKey || "";
                this.username = val.username || "";
                this.password = val.password || "";
            } else {
                this.serverUrl = "";
                this.apiKey = "";
                this.password = "";
                this.username = "";
            }
        }

        public submit() {
            if(!this.editMode){
                return;
            }
            if (this.$refs.servereditform.$el.reportValidity()) {
                this.$emit("submit", {id: this.server?.id, ... this} as ServerModuleData)
            }
        }

        public cancel() {
            if(!this.editMode){
                return;
            }
            this.serverChanged(this.server);
            this.$emit("cancel");
        }
    }
</script>