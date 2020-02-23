import {createVuexStore, useStore} from "vuex-simple";
import Vue from "vue";
import Vuex, {Store} from "vuex";
import {AppPreferencesModule} from "@/store/app-preferences.module";
import {ServerModule} from "@/store/server.module";
import {RootModule} from "@/store/root.module";
import createPersistedState from "vuex-persistedstate";

export {AppPreferencesModule} from "@/store/app-preferences.module";
export {StoreModule} from "@/store/store.module";
export {ServerModule} from "@/store/server.module";
export {AuthenticationResultModule} from "@/store/authentication-result.module";
export {StoreModuleData} from "@/store/store-module.data";
export * from "./server-module.data";

Vue.use(Vuex);

class StoreProvider{
    public store!: Store<RootModule>;

    public async initStore() {
        let promise1;
        let  result;
        const promise2 = new Promise(resolve2 => {
            promise1 = new Promise(resolve1 => {
                result = createVuexStore(new RootModule(), {
                    strict: false,
                    plugins: [createPersistedState({
                        rehydrated: function (s: typeof Store) {
                            resolve2();
                        }
                    })]
                });
                resolve1();
                if(!localStorage["vuex"]){
                    resolve2();
                }
            })
        });

        await Promise.all([promise2, promise1]);
        this.store = result;
        return result;
    }
} 
const storeProvider = new StoreProvider();
export default storeProvider;

