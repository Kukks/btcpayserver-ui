import {createVuexStore} from "vuex-simple";
import Vue from "vue";
import Vuex from "vuex";
import {AppPreferencesModule} from "@/store/app-preferences.module";
import {ServerModule} from "@/store/server.module";
import {RootModule} from "@/store/root.module";

export * from "./server-module.data";

Vue.use(Vuex);
const store = createVuexStore(new RootModule());
export default store;
export {AppPreferencesModule} from "@/store/app-preferences.module";
export {StoreModule} from "@/store/store.module";
export {ServerModule} from "@/store/server.module";
export {AuthenticationResultModule} from "@/store/authentication-result.module";
export {StoreModuleData} from "@/store/store-module.data";