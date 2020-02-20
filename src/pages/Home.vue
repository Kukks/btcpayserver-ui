<template>
    <f7-page name="Home">
        <f7-navbar title="My App"/>
        <f7-block>
            <p>{{$theme}} </p>
            <p>{{$device}} </p>
        </f7-block>
        <f7-block>
            <f7-segmented>
                <f7-button panel-open="left">Left Panel</f7-button>
            </f7-segmented>
        </f7-block>
        <f7-list>
            <f7-list-item
                    v-for="n in 3"
                    :key="n"
                    :title="`Item ${n}`"
            />
        </f7-list>
    </f7-page>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {ServerModuleData, RootModule} from "../store";
    import {Guid} from 'guid-typescript';
    import {useStore} from "vuex-simple";
    import EditServerConfiguration from "@/components/EditServerConfiguration.vue";

    @Component({})
    export default class Home extends Vue {
    }
</script>

<style scoped>

</style>