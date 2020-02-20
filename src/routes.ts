import {Router} from "framework7/modules/router/router";
import ViewServer from "@/pages/ViewServer.vue";
import Home from "@/pages/Home.vue";

export const routes: Router.RouteParameters[] = [
    {
        path: '/:serverId',
        component: ViewServer,
    },
    {
        path: '/',
        component: Home,
    },
];