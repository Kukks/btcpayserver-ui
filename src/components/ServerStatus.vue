<template>
    <f7-card>
        <f7-card-header>
            Server status
            <f7-icon v-if="data.authenticated" ios="f7:check" md="material:check" aurora="material:check"></f7-icon>
            <f7-icon v-else ios="f7:close" md="material:close" aurora="material:close"></f7-icon>
        </f7-card-header>
<f7-card-content>{{data}}</f7-card-content>
    </f7-card>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {AuthenticationResultModuleData} from "@/store/authentication-result-module.data";

    @Component({})
    export default class ServerStatus extends Vue {
        @Prop()
        public data!: AuthenticationResultModuleData;
    }
</script>