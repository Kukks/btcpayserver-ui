import {Mutation, State} from "vuex-simple";
import {Guid} from "guid-typescript";

export class AppPreferencesModule {
    @State()
    public darkMode: boolean = true;

    @State()
    public defaultServerId: Guid | null = null;

    @Mutation()
    public setDarkMode(on: boolean) {
        this.darkMode = on;
    }

    @Mutation()
    public setDefaultServer(id: Guid) {
        this.defaultServerId = id;
    }
}