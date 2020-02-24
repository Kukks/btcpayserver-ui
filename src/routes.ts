import {Router} from "framework7/modules/router/router";
import ViewServer from "@/pages/ViewServer.vue";
import Home from "@/pages/Home.vue";
import ViewStore from "@/pages/ViewStore.vue";
import PageNotFound from "@/pages/PageNotFound.vue";

export const Routes = {
    NotFound: "not-found",
    Home: "home",
    AddServer: "add-server",
    ViewServer: "view-server",
    AddStore: "add-store",
    ViewStore: "view-store"
};
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
                        name: Routes.ViewStore
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



    
