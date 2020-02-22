import {Router} from "framework7/modules/router/router";
import ViewServer from "@/pages/ViewServer.vue";
import Home from "@/pages/Home.vue";

export const routes: Router.RouteParameters[] = [
    {
        path: '/server/:serverId/',
        component: ViewServer,
        name: "server"
    },
    {
        path: '/server/',
        component: ViewServer,
        name: "add-server"
    },
    {
        path: '/',
        component: Home,
        name: "home"
    },
];