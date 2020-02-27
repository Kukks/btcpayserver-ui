import {Mutation, State} from "vuex-simple";
import {StoreModuleData} from "@/store/store-module.data";

export class StoreModule implements StoreModuleData {
    @State()
    public id!: string;
    @State()
    public name!: string;

    constructor(data: StoreModuleData = {id: "", name: ""}) {
        this.update(data);
    }

    @Mutation()
    public update(data: StoreModuleData) {
        Object.assign(this, data);
    }
    public onRehydrate(store) {
        
        console.log("nothign to do")
    }

}
