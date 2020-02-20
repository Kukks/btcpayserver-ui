import {Module, Mutation, State} from 'vuex-simple';
import {Guid} from 'guid-typescript';

export class AuthenticationResultModule {
    @State()
    public permissions: string[] = [];
    @State()
    public authenticated: boolean = false;
}

export interface ServerModuleData {
    serverUrl: string;
    apiKey: string;
}

export class ServerModule implements ServerModuleData {
    @State()
    public serverUrl!: string;
    @State()
    public apiKey!: string;
    @Module()
    public authenticationResult = new AuthenticationResultModule();

    constructor(data: ServerModuleData = {apiKey: "", serverUrl: ""}) {
        this.update(data);
    }

    @Mutation()
    public update(data: ServerModuleData) {
        Object.assign(this, data);
    }
}

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

