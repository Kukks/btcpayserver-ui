import {Vue} from "vue-property-decorator";

declare module '*.vue' {
  export default Vue

}

declare interface Window {
  nameof: (x: any) => string
}

declare interface VueEl<T extends Element> extends Vue {
  $el: T;
}
