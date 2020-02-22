<template>
    <f7-page name="Home">
        <f7-block>
            <p>{{$theme}} </p>
            <p>{{$device}} </p>
            <p>home material
                <f7-icon material="home"></f7-icon></p>
            <p>home f7
                <f7-icon f7="house"></f7-icon></p>
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

    @Component({})
    export default class Home extends Vue {
    }
</script>

<style scoped>

</style>