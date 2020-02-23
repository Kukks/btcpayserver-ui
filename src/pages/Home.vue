<template>
    <f7-page name="Home">
        <f7-block>
            <p>{{$theme}} </p>
            <p>{{$device}} </p>
        </f7-block>
        <f7-block>
            <f7-segmented>
             
                <f7-button href="/server/">Add Server</f7-button>
            </f7-segmented>
        </f7-block>
    </f7-page>
</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({})
    export default class Home extends Vue {
    }
</script>

<style scoped>

</style>