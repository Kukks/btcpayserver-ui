import {Guid} from "guid-typescript";
import {delay} from "@/helpers";
import {StoreModuleData} from "@/store";

export class StoreService {
    constructor() {
    }

    async createStore(apiKey: string, name: string): Promise<StoreModuleData> {
        await delay(1000);
        return {id: Guid.create().toString(), name};
    }
}
const storeService = new StoreService();
export default storeService;