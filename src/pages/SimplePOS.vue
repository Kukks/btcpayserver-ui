<template>
    <f7-page name="simple-pos" class="pos">

        <f7-row no-gap class="align-items-stretch numpad-row">
            <f7-col width="100" medium="75" >
                <f7-input type="number" step="0.01" min="0" :value="amount" class="h-100 pos-input"></f7-input>

            </f7-col>
            <f7-col width="100" medium="25">
                <f7-input type="select" step="0.01" min="0" class="h-100  pos-input" :value="currency">>
                    <option value="BTC">BTC</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                </f7-input>
            </f7-col>
        </f7-row>
        <f7-row no-gap class="align-items-stretch numpad-row">
            <f7-col>
                <f7-segmented raised strong class="h-100">
                    <f7-button class="numpad-button display-inline-flex justify-content-center h-100">1</f7-button>
                    <f7-button class="numpad-button display-inline-flex justify-content-center h-100">2</f7-button>
                    <f7-button class="numpad-button display-inline-flex justify-content-center h-100">3</f7-button>
                </f7-segmented>

            </f7-col>

        </f7-row>
        <f7-row no-gap class="align-items-stretch numpad-row">
            <f7-col>
                <f7-segmented raised strong class="h-100">
                    <f7-button class="numpad-button display-inline-flex justify-content-center h-100">4</f7-button>
                    <f7-button class="numpad-button display-inline-flex justify-content-center h-100">5</f7-button>
                    <f7-button class="numpad-button display-inline-flex justify-content-center h-100">6</f7-button>
                </f7-segmented>

            </f7-col>

        </f7-row>
        <f7-row no-gap class="align-items-stretch numpad-row">
            <f7-col>
                <f7-segmented raised strong class="h-100">
                    <f7-button class=" numpad-button display-inline-flex justify-content-center  h-100">7</f7-button>
                    <f7-button class=" numpad-button display-inline-flex justify-content-center h-100">8</f7-button>
                    <f7-button class=" numpad-button display-inline-flex justify-content-center h-100">9</f7-button>
                </f7-segmented>

            </f7-col>

        </f7-row>

        <f7-row no-gap class="align-items-stretch numpad-row">
            <f7-col>
                <f7-segmented raised strong class="h-100">
                    <f7-button class="numpad-button display-inline-flex justify-content-center h-100">Pay</f7-button>
                </f7-segmented>

            </f7-col>
        </f7-row>
    </f7-page>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {useStore} from "vuex-simple";
    import {RootModule} from "@/store/root.module";
    import {ServerModule, StoreModule} from "@/store";

    @Component({
        components: {}
    })
    export default class SimplePOS extends Vue {
        public amount: number = 1;
        public currency: string = "USD";

        @Prop({required: true})
        public serverId!: string;
        @Prop({required: true})
        public storeId!: string;

        public store: RootModule = useStore(this.$store);
        public editMode = false;

        public get serverModule(): ServerModule | null {
            if (this.serverId) {
                return this.store.server(this.serverId) ?? null;
            }
            return null;
        }

        public get storeData(): StoreModule | null {
            if (this.storeId) {
                return this.serverModule?.store(this.storeId) ?? null;
            }
            return null;
        }

    }
</script>
<style scoped lang="scss">

    .pos-input, .numpad-button{
        font-size: 4rem;
        font-weight: bold;
        text-align:center;
    }
    
    .numpad-button {
        border-bottom: 1px solid rgba(0,0,0,0.2);
        border-left-color: rgba(0,0,0,0.2);
    }

    .h-100 {
        height: 100%;
    }

    .numpad-row {
        min-height: 20vh;

        &:first-child, &:last-child {
            min-height: 10vh;
        }
    }

</style>
