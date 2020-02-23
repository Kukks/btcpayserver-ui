import {Action, Getter, Module, Mutation, registerModule, State, unregisterModule, useModule} from "vuex-simple";
import {StoreModule} from "@/store/store.module";
import {ServerModuleData} from "@/store/server-module.data";
import {AuthenticationResultModule} from "@/store/authentication-result.module";
import {StoreModuleData} from "@/store/store-module.data";
import store from "@/store/index"
import serverService from "@/services/server.service";

export class ServerModule implements ServerModuleData {
    @State()
    public serverUrl!: string;
    @State()
    public apiKey!: string;
    @Module()
    public authenticationResult = new AuthenticationResultModule();
    @State()
    public stores: string[] = [];

    constructor(data: ServerModuleData = {apiKey: "", serverUrl: ""}) {
        this.updateData(data);
    }

    @Getter()
    public get store() {
        return (id: string) => {
            return useModule<StoreModule>(store, this.getStoreModuleNamespace(id));
        }
    }

    @Mutation()
    private updateData(data: ServerModuleData) {
        Object.assign(this, data);
    }

    @Action()
    public async update(data: ServerModuleData) {
        this.updateData(data);
        this.authenticationResult.updateData(await serverService.authenticate(this));
    }

    @Action()
    public async fetchStores() {
        const stores: StoreModuleData[] = [{id: "1", name: "Store 1"}, {id: "2", name: "Store 2"}];
        const storeIds = stores.map(value => value.id);
        const removedStores = this.stores.filter(value => storeIds.indexOf(value) === 1);
        removedStores.forEach(this.removeStore);
        stores.forEach(this.addOrUpdateStore);
    }

    @Action()
    public removeStore(id: string) {
        this.stores.splice(this.stores.indexOf(id), 1);
        unregisterModule(store, this.getStoreModuleNamespace(id))
    }

    @Mutation()
    public addOrUpdateStore(data: StoreModuleData) {
        if (this.stores.indexOf(data.id) === -1) {
            this.stores.push(data.id);
            registerModule(store, this.getStoreModuleNamespace(data.id), new StoreModule(data))
        } else {
            this.store(data.id)?.update(data);
        }
    }

    private getStoreModuleNamespace(id: string) {
        return [`stores[${id}]`];
    }
}