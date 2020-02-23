import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import Framework7 from "framework7/framework7-lite.esm.bundle";
import Framework7Vue from "framework7-vue/framework7-vue.esm.bundle";
import "framework7/css/framework7.bundle.css";
import 'framework7-icons';
import 'material-design-icons-iconfont';
import storeProvider from "@/store";
import {Permissions} from "@/store/server.module";
import {useStore} from "vuex-simple";
import {RootModule} from "@/store/root.module";


Vue.config.productionTip = false;
Vue.prototype.Permissions = Permissions;
console.log(process.env);
const init = async () => {
  await storeProvider.initStore();
  await useStore<RootModule>(storeProvider.store).onRehydrate(storeProvider.store);
  Framework7.use(Framework7Vue);

  new Vue({
    store: storeProvider.store,
    render: h => h(App)
  }).$mount("#app");
};

// Wait for the deviceready event to start the render
document.addEventListener("deviceready", init);

// If we are not in Cordova, manually trigger the deviceready event
const isCordovaApp = !!window.cordova;
if (!isCordovaApp){
  document.dispatchEvent(new CustomEvent("deviceready", {}));
}