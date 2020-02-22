declare module '*.vue' {
  import Vue from 'vue'
  export default Vue

}
declare interface Window {
  nameof: (x: any) => string
}
