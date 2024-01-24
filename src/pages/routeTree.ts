import {
  Route,
  Router,
  redirect,
  lazyRouteComponent,
  rootRouteWithContext,
  NotFoundRoute,
} from "@tanstack/react-router";
import Root from "./RootRoute";
import { queryClient } from "../services/queries";
import { isAuth } from "../utils/utils";
import { getTaskOption } from "../services/queries/taskQueries";
import { getOrderQuery } from "../services/queries/orderQueries";
import { z } from "zod";
import {
  getAllUsersOptions,
  getUserOption,
} from "../services/queries/accountsQueries";
import {
  getAllClientsOptions,
  getClientOption,
} from "../services/queries/clientsQueries";

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

const forgotPasswordRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "forgot_password/reset",
  beforeLoad: async ({ context: { queryClient } }) => {
    if (isAuth()) {
      throw redirect({ to: "/dashboard" });
    } else {
      queryClient.clear();
    }
  },
  component: lazyRouteComponent(
    () => import("./forgotPassword/ForgotPassword")
  ),
});

const newPasswordRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "forgot_password/$code",
  beforeLoad: async ({ context: { queryClient } }) => {
    if (isAuth()) {
      throw redirect({ to: "/dashboard" });
    } else {
      queryClient.clear();
    }
  },
  component: lazyRouteComponent(() => import("./forgotPassword/ResetPassword")),
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

export const tasksIndexRoute = new Route({
  getParentRoute: () => tasksRoute,
  path: "/",
  component: lazyRouteComponent(
    () => import("../components/dashboard/tasks/DashboardTasks")
  ),
});

export const taskRoute = new Route({
  getParentRoute: () => tasksRoute,
  path: "$taskId",
  parseParams: ({ taskId }) => ({ taskId: Number(taskId) }),
  stringifyParams: ({ taskId }) => ({ taskId: `${taskId}` }),
  loader: async ({ context: { queryClient }, params: { taskId } }) => {
    queryClient.ensureQueryData(getTaskOption(taskId)).catch(console.log);
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

export const orderRoute = new Route({
  getParentRoute: () => ordersRoute,
  path: "$orderId",
  beforeLoad: async ({ params: { orderId } }) => {
    // if (isNaN(+orderId)) throw redirect({ to: "/orders" });
    return { queryOptions: getOrderQuery(orderId) };
  },
  loader: async ({ context: { queryClient, queryOptions } }) => {
    queryClient.ensureQueryData(queryOptions).catch(console.log);
  },
  component: lazyRouteComponent(() => import("./orders/OrderInformation")),
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
  validateSearch: z.object({
    searchClients: z
      .object({
        keyword: z.string().optional(),
        from: z.string().optional(),
        to: z.string().optional(),
        filter: z.enum(["id", "email"]).optional(),
        page: z.number().optional().catch(1),
        perPage: z.number().optional().catch(10),
      })
      .optional(),
  }).parse,
  preSearchFilters: [
    (search) => ({
      ...search,
      searchClients: {
        ...search.searchClients,
      },
    }),
  ],
  loaderDeps: ({ search }) => ({
    searchClients: search.searchClients,
  }),
  loader: async ({ context: { queryClient }, deps }) => {
    queryClient.ensureQueryData(getAllClientsOptions(deps.searchClients));
  },
  component: lazyRouteComponent(
    () => import("./clients/clientsManager/ClientsManager")
  ),
});

export const clientsManagerIndexRoute = new Route({
  getParentRoute: () => clientsManagerRoute,
  path: "/",
  component: lazyRouteComponent(() => import("./clients/clientsManager/Index")),
});

export const clientRoute = new Route({
  getParentRoute: () => clientsManagerRoute,
  path: "$clientId",
  parseParams: ({ clientId }) => ({ clientId: Number(clientId) }),
  stringifyParams: ({ clientId }) => ({ clientId: `${clientId}` }),
  loader: async ({ context: { queryClient }, params: { clientId } }) => {
    queryClient.ensureQueryData(getClientOption(clientId));
  },
  component: lazyRouteComponent(() => import("./accounts/usersManager/User")),
});

const newClientRoute = new Route({
  getParentRoute: () => clientsManagerRoute,
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

const sellersReport = new Route({
  getParentRoute: () => accountsRoute,
  path: "sellers_report",
  component: lazyRouteComponent(() => import("./accounts/SellerReports")),
});

export const usersManagerRoute = new Route({
  getParentRoute: () => accountsRoute,
  path: "users_manager",
  validateSearch: z.object({
    searchUsers: z
      .object({
        keyword: z.string().optional(),
        from: z.string().optional(),
        to: z.string().optional(),
        filter: z.enum(["id", "email"]).optional(),
        page: z.number().optional().catch(1),
        perPage: z.number().optional().catch(10),
      })
      .optional(),
  }).parse,
  preSearchFilters: [
    (search) => ({
      ...search,
      searchUsers: {
        ...search.searchUsers,
      },
    }),
  ],
  loaderDeps: ({ search }) => ({
    searchUsers: search.searchUsers,
  }),
  loader: async ({ context: { queryClient }, deps }) => {
    queryClient.ensureQueryData(getAllUsersOptions(deps.searchUsers));
  },
  component: lazyRouteComponent(
    () => import("./accounts/usersManager/UsersManager")
  ),
});

export const usersManagerIndexRoute = new Route({
  getParentRoute: () => usersManagerRoute,
  path: "/",
  component: lazyRouteComponent(() => import("./accounts/usersManager/Index")),
});

export const userRoute = new Route({
  getParentRoute: () => usersManagerRoute,
  path: "$userId",
  parseParams: ({ userId }) => ({ userId: Number(userId) }),
  stringifyParams: ({ userId }) => ({ userId: `${userId}` }),
  loader: async ({ context: { queryClient }, params: { userId } }) => {
    queryClient.ensureQueryData(getUserOption(userId));
  },
  component: lazyRouteComponent(() => import("./accounts/usersManager/User")),
});

const newAccountRoute = new Route({
  getParentRoute: () => usersManagerRoute,
  path: "new",
  component: lazyRouteComponent(() => import("./accounts/usersManager/User")),
});

const inactiveUsersRoute = new Route({
  getParentRoute: () => accountsRoute,
  path: "inactive_users",
  component: lazyRouteComponent(() => import("./accounts/InactiveUsers")),
});

const prospectsRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: "prospects",
  component: lazyRouteComponent(() => import("./prospects/Prospects")),
});

const prospectsIndexRoute = new Route({
  getParentRoute: () => prospectsRoute,
  path: "/",
  component: lazyRouteComponent(() => import("./prospects/Index")),
});

const findProspectsRoute = new Route({
  getParentRoute: () => prospectsRoute,
  path: "find",
  component: lazyRouteComponent(() => import("./prospects/FindProspects")),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  forgotPasswordRoute,
  newPasswordRoute,

  protectedRoute.addChildren([
    dashboardRoute,
    inboxRoute,
    tasksRoute.addChildren([tasksIndexRoute, taskRoute, newTaskRoute]),

    ordersRoute.addChildren([
      ordersIndexRoute,
      ordersReportRoute,
      ordersManagerRoute,
      newOrderRoute,
      orderRoute,
      deletedOrdersRoute,
    ]),

    clientsRoute.addChildren([
      clientsIndexRoute,
      clientsReportRoute,
      clientsManagerRoute.addChildren([
        clientsManagerIndexRoute,
        clientRoute,
        newClientRoute,
      ]),
    ]),

    accountsRoute.addChildren([
      accountsIndexRoute,
      sellersReport,
      usersManagerRoute.addChildren([
        usersManagerIndexRoute,
        userRoute,
        newAccountRoute,
      ]),
      inactiveUsersRoute,
    ]),

    prospectsRoute.addChildren([prospectsIndexRoute, findProspectsRoute]),
  ]),
]);

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  beforeLoad: async () => {
    if (isAuth()) {
      throw redirect({ to: "/dashboard" });
    } else {
      throw redirect({ to: "/" });
    }
  },
});

export const router = new Router({
  routeTree,
  notFoundRoute,
  defaultPreload: "intent",
  context: { queryClient },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
