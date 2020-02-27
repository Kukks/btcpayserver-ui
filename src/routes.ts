import {Router} from "framework7/modules/router/router";
import ViewServer from "@/pages/ViewServer.vue";
import Home from "@/pages/Home.vue";
import ViewStore from "@/pages/ViewStore.vue";
import PageNotFound from "@/pages/PageNotFound.vue";
import SimplePOS from "@/pages/SimplePOS.vue";
import storeProvider from "@/store";
import {useStore} from "vuex-simple";
import {RootModule} from "@/store/root.module";

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
                result = r.path + ((r.path.endsWith("/") || result.startsWith("/")) ? "" : "/") + result;
                break;
            }
        }
    }
    for (const arg in args) {
        result = result.split(`:${arg}`).join(args[arg]);
    }
    return result;
}

function guard(params, serverId, storeId) {
    if ((serverId && !params["serverId"]) || (storeId && !params["storeId"])) {
        return false;
    }
    const rootModule = useStore<RootModule>(storeProvider.store);
    if (serverId) {

        const serverModule = rootModule.server(params["serverId"]);
        if (!serverModule) {
            return false;
        }

        if (storeId) {
            const storeModule = serverModule.store(params["storeId"]);
            if (!storeModule) {
                return false;
            }
        }
    }
    return true;
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
                name: Routes.AddServer
            },
            {
                path: 'servers/:serverId',
                component: ViewServer,
                name: Routes.ViewServer,
                routes: [
                    {
                        path: 'stores/add',
                        component: ViewStore,
                        name: Routes.AddStore,

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
                        ],
                        beforeEnter: function (routeTo, routeFrom, resolve, reject) {
                            guard(routeTo.params, true, false)? resolve() : reject();
                        }
                    }
                ],
                beforeEnter: function (routeTo, routeFrom, resolve, reject) {
                    guard(routeTo.params, true, false)? resolve() : reject();
                }
            }
        ]
    },
    {
        path: '404',
        component: PageNotFound,
        name: Routes.NotFound
    }
];


    
