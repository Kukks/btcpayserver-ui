import {Router} from "framework7/modules/router/router";
import ViewServer from "@/pages/ViewServer.vue";
import Home from "@/pages/Home.vue";
import ViewStore from "@/pages/ViewStore.vue";
import PageNotFound from "@/pages/PageNotFound.vue";
import SimplePOS from "@/pages/SimplePOS.vue";

export enum Routes {
    NotFound = "not-found",
    Home = "home",
    AddServer = "add-server",
    ViewServer = "view-server",
    AddStore = "add-store",
    ViewStore = "view-store",
    SimplePOS = "simple-pos"
}

export function generateUrl(name: Routes, args: { [key: string]: string }, xroutes: Router.RouteParameters[] | null = null) {
    if (xroutes == null) {
        xroutes = routes;
    }
    let result = "";
    for (const r of xroutes) {
        if (r.name === name) {
            result = r.path;
            break;
        } else if (r.routes && r.routes.length > 0) {
            result = generateUrl(name, args, r.routes);
            if (result) {
                result = r.path + ((r.path.endsWith("/") || result.startsWith("/")) ? "": "/") + result;
                break;
            }
        }
    }
    for (const arg in args) {
        result = result.split(`:${arg}`).join(args[arg]);
    }
    return result;
}

export const routes: Router.RouteParameters[] = [

    {
        path: '/',
        component: Home,
        name: Routes.Home,
        routes: [
            {
                path: 'servers/add',
                component: ViewServer,
                name: Routes.ViewServer
            },
            {
                path: 'servers/:serverId',
                component: ViewServer,
                name: Routes.ViewServer,
                routes: [
                    {
                        path: 'stores/add',
                        component: ViewStore,
                        name: Routes.AddStore
                    },
                    {
                        path: 'stores/:storeId',
                        component: ViewStore,
                        name: Routes.ViewStore,
                        routes: [
                            {
                                path: 'pos',
                                component: SimplePOS,
                                name: Routes.SimplePOS,
                            }
                        ]
                    }
                ]
            }

        ]
    },
    {
        path: '(.*)',
        component: PageNotFound,
        name: Routes.NotFound
    }
];


    
