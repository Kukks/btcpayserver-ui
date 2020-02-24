import {Guid} from "guid-typescript";
import {delay} from "@/helpers";
import {StoreModuleData} from "@/store";

export class StoreService {
    async createStore(apiKey: string, name: string): Promise<StoreModuleData> {
        await delay(1000);
        return {id: Guid.create().toString(), name};
    }

    async fetchStores(apiKey: string): Promise<StoreModuleData[]> {
        if (apiKey) {
            await delay(1000);
            return [{id: "1", name: "Store 1"}, {id: "2", name: "Store 2"}];
        }
        return [];
    }
}
const storeService = new StoreService();
export default storeService;