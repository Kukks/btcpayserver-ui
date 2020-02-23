import {Mutation, State} from "vuex-simple";
import {AuthenticationResultModuleData} from "@/store/authentication-result-module.data";

export class AuthenticationResultModule implements AuthenticationResultModuleData {
    @State()
    public permissions: string[] = [];
    @State()
    public authenticated: boolean = false;
    @State()
    public userId: string = "";


    @Mutation()
    public updateData(data: AuthenticationResultModuleData) {
        Object.assign(this, data);
    }
}