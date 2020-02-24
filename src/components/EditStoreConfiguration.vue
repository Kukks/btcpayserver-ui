<template>
    <f7-list no-hairlines-md form ref="form" @submit.prevent="submit()">
        <f7-list-input
                label="Store Name"
                type="text"
                placeholder="Store A"
                info="The name of the store"
                required
                validate
                clear-button
                :value="name" @input="name=$event.target.value"
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
    import {StoreModuleData} from "@/store";
    import {VueEl} from "@/shims-vue";

    @Component({})
    export default class EditStoreConfiguration extends Vue implements StoreModuleData {
        public id: string = "";
        public name: string = "";

        @Prop()
        public data?: StoreModuleData;

        $refs!: {
            form: VueEl<HTMLFormElement>;
        };

        public mounted() {
            this.dataChanged(this.data)
        }

        @Watch("data")
        public dataChanged(val?: StoreModuleData) {
            if (val) {
                this.id = val.id;
                this.name = val.name;
            } else {
                this.id = "";
                this.name = "";
            }
        }

        public submit() {
            if (this.$refs.form.$el.reportValidity()) {
                this.$emit("submit", {...this} as StoreModuleData)
            }
        }

        public cancel() {
            this.dataChanged(this.data);
            this.$emit("cancel");
        }
    }
</script>
