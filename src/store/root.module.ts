import {Action, Getter, Module, Mutation, registerModule, State, unregisterModule, useModule} from "vuex-simple";
import {Guid} from "guid-typescript";
import {AppPreferencesModule} from "@/store/app-preferences.module";
import {ServerModuleData} from "@/store/server-module.data";
import {ServerModule} from "@/store/server.module";
import store from "@/store/index";
import {Store} from "vuex";
import storeProvider from "@/store/index";

export class RootModule {
    @State()
    public servers: string[] = [];
    @Module()
    public appPreferences: AppPreferencesModule = new AppPreferencesModule();

    @Getter()
    public get server() {
        return (id: string, explicitStore: Store<RootModule> | null = null) => {
            return useModule<ServerModule>(explicitStore ?? storeProvider.store, this.getServerModuleNamespace(id)) ?? null;
        }
    }

    @Mutation()
    public addServer(data: ServerModuleData) {
        if (data.id) {
            this.servers.push(data.id);
            registerModule(storeProvider.store, this.getServerModuleNamespace(data.id), new ServerModule(data), {preserveState: false});
        }
    }

    @Action()
    public async addOrUpdateServer(data: ServerModuleData) {
        let result: string = "";
        if (data.id) {
            let existingModule = this.server(data.id);
            if (!existingModule) {
                this.addServer(data);
            }
            existingModule = this.server(data.id);
            await existingModule?.update(data);
            result = data.id;
        } else {
            result = Guid.create().toString();
            this.addServer({...data, id: result});
        }
        await this.server(result)?.update();
        return result;
    }

    @Mutation()
    public removeServer(id: string) {
        this.servers.splice(this.servers.indexOf(id), 1);
        unregisterModule(storeProvider.store, this.getServerModuleNamespace(id))
    }

    @Action()
    public async onRehydrate(store) {
        console.warn("onRehydrate", this, this.servers);
        for (const value of this.servers) {
            registerModule(store, this.getServerModuleNamespace(value), new ServerModule(), {preserveState: true});
            console.warn("onRehydrate.1");
            await this.server(value, store)?.onRehydrate(store);
        }
    }

    private getServerModuleNamespace(id: string) {
        return [`servers[${id}]`];
    }
}