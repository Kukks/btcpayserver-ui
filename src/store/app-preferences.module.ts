import {Mutation, State} from "vuex-simple";
import {Guid} from "guid-typescript";

export class AppPreferencesModule {
    @State()
    public darkMode: boolean = true;    
    @State()
    public colorTheme: string = "btcpay";

    @State()
    public defaultServerId: Guid | null = null;

    @Mutation()
    public setDarkMode(on: boolean) {
        this.darkMode = on;
    }

    @State()
    public currencies: CurrencyOption[] = [{
        code: "EUR",
        name: "Euro",
        symbol: "Eur",
        divisibility: 2
    }];
    
    @Mutation()
    public setDefaultServer(id: Guid) {
        this.defaultServerId = id;
    }
    
    @Mutation()
    public addCurrency(currency: CurrencyOption){
        if(this.currencies.findIndex(value => value.code === currency.code) === -1){
            this.currencies.push(currency);
        }
    }

  
}

export interface CurrencyOption {
    code: string;
    name: string;
    symbol: string;
    divisibility: number;
}