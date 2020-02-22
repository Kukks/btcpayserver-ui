import {Action, Getter, Module, Mutation, registerModule, State, unregisterModule, useModule} from "vuex-simple";
import {Guid} from "guid-typescript";
import {AppPreferencesModule} from "@/store/app-preferences.module";
import {ServerModuleData} from "@/store/server-module.data";
import {ServerModule} from "@/store/server.module";
import store from "@/store/index";

export class RootModule {
    @State()
    public servers: Guid[] = [];
    @Module()
    public appPreferences: AppPreferencesModule = new AppPreferencesModule();

    @Action()
    public addServer(data: ServerModuleData = {apiKey: "", serverUrl: ""}) {
        const id = Guid.create();
        this.servers.push(id);
        registerModule(store, this.getServerModuleNamespace(id), new ServerModule(data));
        return id;
    }

    @Getter()
    public get server() {
        return (id: Guid) => {
            return useModule<ServerModule>(store, this.getServerModuleNamespace(id))??null;
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