import {Action, Getter, Module, Mutation, registerModule, State, unregisterModule, useModule} from "vuex-simple";
import {Guid} from "guid-typescript";
import {AppPreferencesModule} from "@/store/app-preferences.module";
import {ServerModuleData} from "@/store/server-module.data";
import {ServerModule} from "@/store/server.module";
import store, {StoreModule, StoreModuleData} from "@/store/index";

export class RootModule {
    @State()
    public servers: string[] = [];
    @Module()
    public appPreferences: AppPreferencesModule = new AppPreferencesModule();

    @Getter()
    public get server() {
        return (id: string) => {
            return useModule<ServerModule>(store, this.getServerModuleNamespace(id)) ?? null;
        }
    }

    @Mutation()
    public addServer(data: ServerModuleData) {
        if (data.id) {
            this.servers.push(data.id);
            registerModule(store, this.getServerModuleNamespace(data.id), new ServerModule(data));
        }
    }

    @Action()
    public async addOrUpdateServer(data: ServerModuleData) {
        if (data.id) {
            let existingModule = this.server(data.id);
            if (!existingModule) {
                this.addServer(data);
            }
            existingModule = this.server(data.id);
            await existingModule?.update(data);
            return data.id;            
        } else {
            const id = Guid.create().toString();
            this.addServer({...data, id});
            return id;
        }
    }

    @Mutation()
    public removeServer(id: string) {
        this.servers.splice(this.servers.indexOf(id), 1);
        unregisterModule(store, this.getServerModuleNamespace(id))
    }

    private getServerModuleNamespace(id: string) {
        return [`servers[${id}]`];
    }
}