<template>
    <f7-page name="simple-pos" class="pos">
        <f7-row no-gap class="align-items-stretch">
            <f7-col width="100" medium="75">
                <input type="number" pattern="[0-9]*" step="0.01" min="0" :value="amount"
                       onfocus="onInputFocus($event);"
                       :readonly="sheetOpened"
                       class="h-100 width-100"/>

            </f7-col>
            <f7-col width="100" medium="25">
                <f7-input
                        label="Currency"
                        type="select"
                        class="h-100"
                        :value="currency" @input="currency=$event.target.value">
                    <option v-for="currency in currencies" :key="currency.code" :value="currency.code">{{currency.code}}
                    </option>
                    <option value="">Custom</option>
                </f7-input>
            </f7-col>
        </f7-row>
        <f7-row>
            <f7-col width="100">
                <f7-button class="pos-input" large fill>Pay</f7-button>
            </f7-col>
        </f7-row>

        <f7-sheet :opened="sheetOpened" :close-on-escape="false" :close-by-backdrop-click="false"
                  @sheet:closed="onSheetClosed"
                  :close-by-outside-click="false" :backdrop="false" swipe-to-close>
            <f7-toolbar>
                <div class="left"></div>
                <div class="right">
                    <f7-link sheet-close>
                        <f7-icon ios="f7:keyboard" aurora="f7:keyboard" md="material:close"></f7-icon>
                    </f7-link>
                </div>
            </f7-toolbar>
            <f7-page-content style="padding-top:0px">
                <NumPad class="width-100 h-100" v-on:keypad="onKeypad($event)"></NumPad>
            </f7-page-content>
        </f7-sheet>
        <f7-toolbar bottom>
            <f7-link @click="sheetOpened = true" class="width-100">
                <f7-icon ios="f7:xmark" aurora="f7:xmark" md="material:keyboard"></f7-icon>
            </f7-link>
        </f7-toolbar>
    </f7-page>
</template>
<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import {useStore} from "vuex-simple";
    import {RootModule} from "@/store/root.module";
    import {ServerModule, StoreModule} from "@/store";
    import NumPad from "@/components/NumPad.vue";

    @Component({
        components: {NumPad}
    })
    export default class SimplePOS extends Vue {

        public get parsedAmount() {
            if (this.amount.endsWith(".")) {
                return this.amount.substr(0, this.amount.length - 1);
            }
            return this.amount
        }

        public sheetOpened = true;
        public amount: string = "1.00";
        public currency: string = "";

        @Prop({required: true})
        public serverId!: string;
        @Prop({required: true})
        public storeId!: string;

        public store: RootModule = useStore(this.$store);

        public onSheetClosed() {
            this.sheetOpened = false;
        }

        public get currencies() {
            return this.store.appPreferences.currencies ?? [];
        }

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

        public mounted() {
            this.currency = this.currencies[0]?.code;
        }

        @Watch("currency")
        public currencyChanged(val: string) {
            if (!val) {
                this.$f7?.dialog.prompt("Currency code", (val: string) => {
                    this.currency = val;
                }, (val: string) => {
                    this.currency = val;
                }, "BTC");
            } else {
                this.store?.appPreferences?.addCurrency({code: val, name: val, divisibility: 8, symbol: val});
            }
        }

        public onKeypad(evt) {
            if (evt === "clear") {
                if (this.amount.length > 0) {
                    this.amount = this.amount.substr(0, this.amount.length - 1);
                }
            } else if (evt === ".") {
                if (this.amount.indexOf(".") === -1) {
                    this.amount = this.amount + ".";
                }
            } else {
                this.amount = this.amount + "" + evt;
            }

        }

        public onInputFocus(event: Event) {
            if (this.sheetOpened) {
                (event.target as HTMLInputElement).blur();
            }
        }


    }
</script>
<style lang="scss">
    .pos{
        input, .input-with-value, select option {
            font-size: 4rem !important;
            font-weight: bold !important;
            text-align: center !important;
            text-align-last: center !important;

        }
        
    }
    
</style>
