import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import Framework7 from "framework7/framework7-lite.esm.bundle";
import Framework7Vue from "framework7-vue/framework7-vue.esm.bundle";
import "framework7/css/framework7.bundle.css";
import store from "@/store";

Vue.config.productionTip = false;
console.log(process.env);
const init = () => {
  Framework7.use(Framework7Vue);

  new Vue({
    store,
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