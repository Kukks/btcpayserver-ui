import {Guid} from "guid-typescript";
import {delay} from "@/helpers";
import {ServerModuleData, StoreModuleData} from "@/store";

export class StoreService {
    async createStore(server: ServerModuleData, name: string): Promise<StoreModuleData> {
        await delay(1000);
        return {id: Guid.create().toString(), name};
    }

    async fetchStores(server: ServerModuleData): Promise<StoreModuleData[]> {
        if (server) {
            await delay(1000);
            return [{id: "1", name: "Store 1"}, {id: "2", name: "Store 2"}];
        }
        return [];
    }

    async removeStore(server: ServerModuleData, id: string) {
        if (server) {
            await delay(1000);
            return true;
        }
        return false;
    }
    
    
}
const storeService = new StoreService();
export default storeService;