import {Router} from "framework7/modules/router/router";
import {Routes} from "@/routes";

class RouterService {
    private router!: Router.Router;

    public get loaded() {
        return !!this.router;
    }

    public setRouter(router: Router.Router) {
        this.router = router;
    }

    public generateUrl(name: Routes, args: { [key: string]: string }, router?: Router.Router) {
        return (router ?? this.router).generateUrl({name: name.toString(), params: args, query: null});
    }
}

const routerService = new RouterService();
export default routerService;