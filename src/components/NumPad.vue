<template>

    <div class="grid-container">
        <f7-segmented raised strong class="h-100 align-content-stretch grid-item" >
            <f7-button raised large strong @click="keypad(1)"
                       class="numpad-button ">1
            </f7-button>
        </f7-segmented>
        <f7-segmented raised strong class="h-100 align-content-stretch grid-item" >
            <f7-button raised large strong @click="keypad(2)"
                       class="numpad-button ">2
            </f7-button>
        </f7-segmented>
        <f7-segmented raised strong class="h-100 align-content-stretch grid-item" >
            <f7-button raised large strong @click="keypad(3)"
                       class="numpad-button ">3
            </f7-button>
        </f7-segmented>
        <f7-segmented raised strong class="h-100 align-content-stretch grid-item" >
            <f7-button raised large strong @click="keypad(4)"
                       class="numpad-button ">4
            </f7-button>
        </f7-segmented>
        <f7-segmented raised strong class="h-100 align-content-stretch grid-item" >
            <f7-button raised large strong @click="keypad(5)"
                       class="numpad-button ">5
            </f7-button>
        </f7-segmented>
        <f7-segmented raised strong class="h-100 align-content-stretch grid-item" >
            <f7-button raised large strong @click="keypad(6)"
                       class="numpad-button ">6
            </f7-button>
        </f7-segmented>
        <f7-segmented raised strong class="h-100 align-content-stretch grid-item" >
            <f7-button raised large strong @click="keypad(7)"
                       class="numpad-button ">7
            </f7-button>
        </f7-segmented>
        <f7-segmented raised strong class="h-100 align-content-stretch grid-item" >
            <f7-button raised large strong @click="keypad(8)"
                       class="numpad-button ">8
            </f7-button>
        </f7-segmented>
        <f7-segmented raised strong class="h-100 align-content-stretch grid-item">
            <f7-button raised large strong  @click="keypad(9)"
                       class="numpad-button ">9
            </f7-button>
        </f7-segmented>
        <f7-segmented raised strong class="h-100 align-content-stretch grid-item" >
            <f7-button raised large strong @click="keypad('clear')"
                       class="numpad-button ">C
            </f7-button>
        </f7-segmented>
        <f7-segmented raised strong class="h-100 align-content-stretch grid-item" >
            <f7-button raised large strong @click="keypad(0)"
                       class="numpad-button ">0
            </f7-button>
        </f7-segmented>
        <f7-segmented raised strong class="h-100 align-content-stretch grid-item" >
            <f7-button raised large strong @click="keypad('.')"
                       class="numpad-button ">.
            </f7-button>
        </f7-segmented>

    </div>
</template>

<script lang="ts">
    import {Component, Emit, Vue} from "vue-property-decorator";

    @Component({})
    export default class NumPad extends Vue {
        @Emit()
        public keypad(val: number | "."| "clear"){
            console.warn(val);
        }
    }
</script>

<style scoped lang="scss">
    .pos-input, .numpad-button {
        font-size: 4rem;
        font-weight: bold;
        text-align: center;
    }

    .numpad-button {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        border-left-color: rgba(0, 0, 0, 0.2);
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: center;

    }

    .h-100 {
        height: 100%;
    }

    .numpad-row {
        height: 20%;

    }

    .grid-container {
        display: grid;
        grid-template-columns: auto auto auto;
    }
</style>