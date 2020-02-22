import {Guid} from "guid-typescript";
import {delay} from "@/helpers";
import {ServerModuleData} from "@/store";
import {AuthenticationResultModuleData} from "@/store/authentication-result-module.data";

export class ServerService {

    async authenticate(data: ServerModuleData): Promise<AuthenticationResultModuleData> {
        await delay(1000);
        return {
            authenticated: !!data.serverUrl,
            permissions: [],
            userId: Guid.create().toString()
        }

    }
}

const serverService = new ServerService();
export default serverService;