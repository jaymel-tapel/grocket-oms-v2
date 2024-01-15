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
import { getOrderQuery } from "../services/queries/orderQueries";
import { z } from "zod";
import {
  getAllUsersOptions,
  getUserOption,
} from "../services/queries/accountsQueries";

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
        filter: z.string().optional(),
        first: z.number().optional(),
        last: z.number().optional(),
        before: z.number().optional(),
        after: z.number().optional(),
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
  // loaderDeps: ({ search }) => ({
  //   searchUsers: search.searchUsers,
  // }),
  // loader: async ({ context: { queryClient }, deps }) => {
  //   queryClient.ensureQueryData(getAllUsersOptions(deps.searchUsers));
  // },
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

const inactiveUsersRoute = new Route({
  getParentRoute: () => accountsRoute,
  path: "inactive_users",
  component: lazyRouteComponent(() => import("./accounts/InactiveUsers")),
});

const newAccountRoute = new Route({
  getParentRoute: () => accountsRoute,
  path: "new",
  component: lazyRouteComponent(() => import("./accounts/usersManager/User")),
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
      clientsManagerRoute,
      newClientRoute,
    ]),

    accountsRoute.addChildren([
      accountsIndexRoute,
      sellersReport,
      usersManagerRoute.addChildren([usersManagerIndexRoute, userRoute]),
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
