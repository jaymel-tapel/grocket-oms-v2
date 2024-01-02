import {
  Route,
  Router,
  redirect,
  lazyRouteComponent,
  rootRouteWithContext,
} from "@tanstack/react-router";

import Root from "./RootRoute";
import { queryClient } from "../services/queries";
import { isAuth } from "../utils/utils";
import { getTaskQuery } from "../services/queries/taskQueries";

const rootRoute = rootRouteWithContext<{ queryClient: typeof queryClient }>()({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: async ({ context: { queryClient } }) => {
    if (isAuth()) {
      throw redirect({ to: "/dashboard" });
    } else {
      queryClient.clear();
    }
  },
  component: lazyRouteComponent(() => import("./login/Login")),
});

const protectedRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "logged",
  beforeLoad: async () => {
    if (!isAuth()) {
      throw redirect({ to: "/" });
    }
  },
});

const dashboardRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: "dashboard",
  component: lazyRouteComponent(() => import("./dashboard/Dashboard")),
});

const inboxRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: "inbox",
  component: lazyRouteComponent(() => import("./dashboard/Inbox")),
});

const tasksRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: "tasks",
  component: lazyRouteComponent(() => import("./dashboard/Tasks")),
});

const tasksIndexRoute = new Route({
  getParentRoute: () => tasksRoute,
  path: "/",
  // beforeLoad: async () => {
  //   throw redirect({ to: "/tasks/all" });
  // },
  component: lazyRouteComponent(
    () => import("../components/dashboard/tasks/DashboardTasks")
  ),
});

export const taskRoute = new Route({
  getParentRoute: () => tasksRoute,
  path: "$taskId",
  beforeLoad: async ({ params: { taskId } }) => {
    if (isNaN(+taskId)) throw redirect({ to: "/tasks" });
    return { queryOptions: getTaskQuery(taskId) };
  },
  loader: async ({ context: { queryClient, queryOptions } }) => {
    queryClient.ensureQueryData(queryOptions).catch(console.log);
  },
  component: lazyRouteComponent(() => import("./dashboard/NewTask")),
});

const newTaskRoute = new Route({
  getParentRoute: () => tasksRoute,
  path: "new",
  component: lazyRouteComponent(() => import("./dashboard/NewTask")),
});

const ordersRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: "orders",
  component: lazyRouteComponent(() => import("./orders/Orders")),
});

const ordersIndexRoute = new Route({
  getParentRoute: () => ordersRoute,
  path: "/",
  beforeLoad: async () => {
    throw redirect({ to: "/orders/orders_report" });
  },
});

const ordersReportRoute = new Route({
  getParentRoute: () => ordersRoute,
  path: "orders_report",
  component: lazyRouteComponent(() => import("./orders/OrdersReports")),
});

const ordersManagerRoute = new Route({
  getParentRoute: () => ordersRoute,
  path: "orders_manager",
  component: lazyRouteComponent(() => import("./orders/OrdersManager")),
});

const newOrderRoute = new Route({
  getParentRoute: () => ordersRoute,
  path: "new",
  component: lazyRouteComponent(() => import("./orders/AddNewOrderPage")),
});

const deletedOrdersRoute = new Route({
  getParentRoute: () => ordersRoute,
  path: "deleted",
  component: lazyRouteComponent(() => import("./orders/DeletedOrders")),
});

const clientsRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: "clients",
  component: lazyRouteComponent(() => import("./clients/Clients")),
});

const clientsIndexRoute = new Route({
  getParentRoute: () => clientsRoute,
  path: "/",
  beforeLoad: async () => {
    throw redirect({ to: "/clients/clients_report" });
  },
});

const clientsReportRoute = new Route({
  getParentRoute: () => clientsRoute,
  path: "clients_report",
  component: lazyRouteComponent(() => import("./clients/ClientReports")),
});

const clientsManagerRoute = new Route({
  getParentRoute: () => clientsRoute,
  path: "clients_manager",
  component: lazyRouteComponent(() => import("./clients/ClientsManager")),
});

const newClientRoute = new Route({
  getParentRoute: () => clientsRoute,
  path: "new",
  component: lazyRouteComponent(() => import("./clients/AddNewClient")),
});

const accountsRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: "accounts",
  component: lazyRouteComponent(() => import("./accounts/Accounts")),
});

const accountsIndexRoute = new Route({
  getParentRoute: () => accountsRoute,
  path: "/",
  beforeLoad: async () => {
    throw redirect({ to: "/accounts/sellers_report" });
  },
});

const accountsReportRoute = new Route({
  getParentRoute: () => accountsRoute,
  path: "sellers_report",
  component: lazyRouteComponent(() => import("./accounts/SellerReports")),
});

const accountsManagerRoute = new Route({
  getParentRoute: () => accountsRoute,
  path: "users_manager",
  component: lazyRouteComponent(() => import("./accounts/UsersManager")),
});

const inactiveUsersRoute = new Route({
  getParentRoute: () => accountsRoute,
  path: "inactive_users",
  component: lazyRouteComponent(() => import("./accounts/InactiveUsers")),
});

const newAccountRoute = new Route({
  getParentRoute: () => accountsRoute,
  path: "new",
  component: lazyRouteComponent(() => import("./accounts/CreateAccount")),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  protectedRoute.addChildren([
    dashboardRoute,
    inboxRoute,
    tasksRoute.addChildren([tasksIndexRoute, taskRoute, newTaskRoute]),

    ordersRoute.addChildren([
      ordersIndexRoute,
      ordersReportRoute,
      ordersManagerRoute,
      newOrderRoute,
      deletedOrdersRoute,
    ]),

    clientsRoute.addChildren([
      clientsIndexRoute,
      clientsReportRoute,
      clientsManagerRoute,
      newClientRoute,
    ]),

    accountsRoute.addChildren([
      accountsIndexRoute,
      accountsReportRoute,
      accountsManagerRoute,
      inactiveUsersRoute,
      newAccountRoute,
    ]),
  ]),
]);

export const router = new Router({
  routeTree,
  defaultPreload: "intent",
  context: { queryClient },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
