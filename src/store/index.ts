import {
    Action,
    createVuexStore,
    Getter, Module,
    Mutation,
    registerModule,
    State,
    unregisterModule,
    useModule
} from "vuex-simple";
import {Guid} from "guid-typescript";
import Vue from "vue";
import Vuex from "vuex";
import {AppPreferencesModule, ServerModule, ServerModuleData} from "@/store/server-credentials.module";

export * from "./server-credentials.module";

export class RootModule {
    @State()
    public servers: Guid[] = [];
    @Module()
    public appPreferences: AppPreferencesModule = new AppPreferencesModule();

    @Mutation()
    public addServer(data: ServerModuleData = {apiKey: "", serverUrl: ""}) {
        const id = Guid.create();
        this.servers.push(id);
        registerModule(store, this.getServerModuleNamespace(id), new ServerModule(data))
    }

    @Getter()
    public get server() {
        return (id: Guid) => {
            return useModule<ServerModule>(store, this.getServerModuleNamespace(id));
        }
    }

    @Action()
    public removeServer(id: Guid) {
        this.servers.splice(this.servers.indexOf(id), 1);
        unregisterModule(store, this.getServerModuleNamespace(id))
    }

    private getServerModuleNamespace(id: Guid) {
        return [`servers[${id}]`];
    }
}

Vue.use(Vuex);
const store = createVuexStore(new RootModule());
export default store;