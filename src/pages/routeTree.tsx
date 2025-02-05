import {
  redirect,
  lazyRouteComponent,
  // NotFoundRoute,
  createRootRouteWithContext,
  createRouter,
  createRoute,
} from "@tanstack/react-router";
import Root from "./RootRoute";
import { queryClient } from "../services/queries";
import { UserLocalInfo, getUserInfo, isAuth } from "../utils/utils";
import { getTaskOption } from "../services/queries/taskQueries";
import {
  getDeletedOrderOption,
  getOrderOption,
} from "../services/queries/orderQueries";
import {
  getAllUsersOptions,
  getUserOption,
} from "../services/queries/accountsQueries";
import { getClientOption } from "../services/queries/clientsQueries";
import { getBrandOption } from "../services/queries/brandsQueries";
import {
  clientsSearchSchema,
  newOrderSearchSchema,
  ordersSearchSchema,
  taskDashboardSchema,
  taskSearchParams,
  usersSearchSchema,
} from "./routeSearchSchemas";
import {
  getEmailTemplateOptions,
  getProspectDetailsOption,
} from "../services/queries/prospectsQueries";
import toast from "react-hot-toast";
import NotFoundPage from "./NotFoundPage";

const rootRoute = createRootRouteWithContext<{
  queryClient: typeof queryClient;
}>()({
  component: Root,
  notFoundComponent: NotFoundPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: async ({ search, context: { queryClient } }) => {
    if (isAuth()) {
      throw redirect({ to: "/dashboard" });
    } else {
      if ("login" in search && search.login === "expired") {
        toast("Login has expired");
      }
      queryClient.clear();
    }
  },
  component: lazyRouteComponent(() => import("./login/Login")),
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "forgot-password/reset",
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

const newPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "forgot-password/$code",
  beforeLoad: async ({ context: { queryClient } }) => {
    if (isAuth()) {
      throw redirect({ to: "/dashboard" });
    } else {
      queryClient.clear();
    }
  },
  component: lazyRouteComponent(() => import("./forgotPassword/ResetPassword")),
});

const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "logged",
  beforeLoad: async () => {
    if (!isAuth()) {
      throw redirect({ to: "/" });
    }
  },
});

const protectedAdminRoute = createRoute({
  getParentRoute: () => protectedRoute,
  id: "adminOnly",
  beforeLoad: async () => {
    const user = getUserInfo() as UserLocalInfo;
    if (user.role !== "ADMIN") {
      throw redirect({ to: "/dashboard" });
    }
  },
});

const profileRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "profile",
  component: lazyRouteComponent(() => import("./user/Profile")),
});

const changePasswordRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "change-password",
  component: lazyRouteComponent(() => import("./user/ChangePassword")),
});

const dashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "dashboard",
  beforeLoad: async () => {
    const user = getUserInfo() as UserLocalInfo;
    if (user.role === "SELLER") {
      throw redirect({ to: "/dashboard/seller" });
    } else {
      throw redirect({ to: "/dashboard/admin" });
    }
  },
  // component: lazyRouteComponent(() => import("./dashboard/Dashboard")),
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "dashboard/admin",
  component: lazyRouteComponent(() => import("./dashboard/DashboardAdmin")),
});

const sellerDashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "dashboard/seller",
  component: lazyRouteComponent(() => import("./dashboard/DashboardSeller")),
});

const inboxRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "inbox",
  component: lazyRouteComponent(() => import("./dashboard/Inbox")),
});

const selectChatRoute = createRoute({
  getParentRoute: () => inboxRoute,
  path: "/",
  component: lazyRouteComponent(
    () => import("../components/dashboard/inbox/SelectChat")
  ),
});

export const chatRoute = createRoute({
  getParentRoute: () => inboxRoute,
  path: "$chatId",
  parseParams: ({ chatId }) => ({ chatId: Number(chatId) }),
  stringifyParams: ({ chatId }) => ({ chatId: `${chatId}` }),
  // loader: async ({ context: { queryClient }, params: { chatId } }) => {
  //   queryClient.ensureQueryData(getOrderOption(chatId));
  // },
  component: lazyRouteComponent(
    () => import("../components/dashboard/inbox/Chat")
  ),
});

const tasksRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "tasks",
  beforeLoad: async () => {
    const user = getUserInfo() as UserLocalInfo;
    if (user.role === "ADMIN") {
      throw redirect({ to: "/dashboard" });
    }
  },
  validateSearch: taskDashboardSchema,
  component: lazyRouteComponent(() => import("./dashboard/Tasks")),
});

export const tasksIndexRoute = createRoute({
  getParentRoute: () => tasksRoute,
  path: "/",
  component: lazyRouteComponent(() => import("./dashboard/Index")),
});

export const taskRoute = createRoute({
  getParentRoute: () => tasksRoute,
  path: "$taskId",
  parseParams: ({ taskId }) => ({ taskId: Number(taskId) }),
  stringifyParams: ({ taskId }) => ({ taskId: `${taskId}` }),
  loader: async ({ context: { queryClient }, params: { taskId } }) => {
    queryClient.ensureQueryData(getTaskOption(taskId)).catch(console.log);
  },
  component: lazyRouteComponent(() => import("./dashboard/Task")),
});

export const newTaskRoute = createRoute({
  getParentRoute: () => tasksRoute,
  path: "new",
  component: lazyRouteComponent(() => import("./dashboard/NewTask")),
  validateSearch: taskSearchParams,
});

const ordersRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "orders",
  component: lazyRouteComponent(() => import("./orders/Orders")),
});

const ordersIndexRoute = createRoute({
  getParentRoute: () => ordersRoute,
  path: "/",
  beforeLoad: async () => {
    throw redirect({ to: "/orders/order-report" });
  },
});

const ordersReportRoute = createRoute({
  getParentRoute: () => ordersRoute,
  path: "order-report",
  component: lazyRouteComponent(() => import("./orders/OrdersReports")),
});

export const ordersManagerRoute = createRoute({
  getParentRoute: () => ordersRoute,
  path: "orders-manager",
  validateSearch: ordersSearchSchema,
  preSearchFilters: [
    (search) => ({
      ...search,
      showDeleted: false,
    }),
  ],
  component: lazyRouteComponent(
    () => import("./orders/ordersManager/OrdersManager")
  ),
});

export const ordersManagerIndexRoute = createRoute({
  getParentRoute: () => ordersManagerRoute,
  path: "/",
  component: lazyRouteComponent(() => import("./orders/ordersManager/Index")),
});

export const newOrderRoute = createRoute({
  getParentRoute: () => ordersManagerRoute,
  path: "new",
  component: lazyRouteComponent(
    () => import("./orders/ordersManager/NewOrderPage")
  ),
  validateSearch: newOrderSearchSchema,
});

export const orderRoute = createRoute({
  getParentRoute: () => ordersManagerRoute,
  path: "$orderId",
  parseParams: ({ orderId }) => ({ orderId: Number(orderId) }),
  stringifyParams: ({ orderId }) => ({ orderId: `${orderId}` }),
  loader: async ({ context: { queryClient }, params: { orderId } }) => {
    queryClient.ensureQueryData(getOrderOption(orderId));
  },
  component: lazyRouteComponent(() => import("./orders/ordersManager/Order")),
});

export const deletedOrdersRoute = createRoute({
  getParentRoute: () => ordersRoute,
  path: "deleted",
  validateSearch: ordersSearchSchema,
  preSearchFilters: [
    (search) => ({
      ...search,
      showDeleted: true,
    }),
  ],
  component: lazyRouteComponent(
    () => import("./orders/deletedOrders/DeletedOrdersManager")
  ),
});

export const deletedOrdersIndexRoute = createRoute({
  getParentRoute: () => deletedOrdersRoute,
  path: "/",
  component: lazyRouteComponent(() => import("./orders/deletedOrders/index")),
});

export const deletedOrderRoute = createRoute({
  getParentRoute: () => deletedOrdersRoute,
  path: "$orderId",
  parseParams: ({ orderId }) => ({ orderId: Number(orderId) }),
  stringifyParams: ({ orderId }) => ({ orderId: `${orderId}` }),
  loader: async ({ context: { queryClient }, params: { orderId } }) => {
    queryClient.ensureQueryData(getDeletedOrderOption(orderId));
  },
  component: lazyRouteComponent(
    () => import("./orders/deletedOrders/DeletedOrder")
  ),
});

const clientsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "clients",
  component: lazyRouteComponent(() => import("./clients/Clients")),
});

const clientsIndexRoute = createRoute({
  getParentRoute: () => clientsRoute,
  path: "/",
  beforeLoad: async () => {
    throw redirect({ to: "/clients/clients-report" });
  },
});

const clientsReportRoute = createRoute({
  getParentRoute: () => clientsRoute,
  path: "clients-report",
  component: lazyRouteComponent(() => import("./clients/ClientReports")),
});

const clientsManagerRoute = createRoute({
  getParentRoute: () => clientsRoute,
  path: "clients-manager",
  validateSearch: clientsSearchSchema,
  preSearchFilters: [
    (search) => ({
      ...search,
    }),
  ],
  // loaderDeps: ({ search }) => ({
  //   searchClients: search.searchClients,
  // }),
  // loader: async ({ context: { queryClient }, deps }) => {
  //   queryClient.ensureQueryData(getAllClientsOptions(deps.searchClients));
  // },
  component: lazyRouteComponent(
    () => import("./clients/clientsManager/ClientsManager")
  ),
});

export const clientsManagerIndexRoute = createRoute({
  getParentRoute: () => clientsManagerRoute,
  path: "/",
  component: lazyRouteComponent(() => import("./clients/clientsManager/Index")),
});

export const clientRoute = createRoute({
  getParentRoute: () => clientsManagerRoute,
  path: "$clientId",
  parseParams: ({ clientId }) => ({ clientId: Number(clientId) }),
  stringifyParams: ({ clientId }) => ({ clientId: `${clientId}` }),
  loader: async ({ context: { queryClient }, params: { clientId } }) => {
    queryClient.ensureQueryData(getClientOption(clientId));
  },
  component: lazyRouteComponent(
    () => import("./clients/clientsManager/Client")
  ),
});

const newClientRoute = createRoute({
  getParentRoute: () => clientsManagerRoute,
  path: "new",
  component: lazyRouteComponent(
    () => import("./clients/clientsManager/Client")
  ),
});

const accountsRoute = createRoute({
  getParentRoute: () => protectedAdminRoute,
  path: "accounts",
  component: lazyRouteComponent(() => import("./accounts/Accounts")),
});

const accountsIndexRoute = createRoute({
  getParentRoute: () => accountsRoute,
  path: "/",
  beforeLoad: async () => {
    throw redirect({ to: "/accounts/sellers-report" });
  },
});

const sellersReport = createRoute({
  getParentRoute: () => accountsRoute,
  path: "sellers-report",
  component: lazyRouteComponent(() => import("./accounts/SellerReports")),
});

export const usersManagerRoute = createRoute({
  getParentRoute: () => accountsRoute,
  path: "users-manager",
  validateSearch: usersSearchSchema,
  preSearchFilters: [
    (search) => ({
      ...search,
    }),
  ],
  loaderDeps: (search) => search,
  loader: async ({ context: { queryClient }, deps }) => {
    queryClient.ensureQueryData(getAllUsersOptions(deps.search));
  },
  component: lazyRouteComponent(
    () => import("./accounts/usersManager/UsersManager")
  ),
});

export const usersManagerIndexRoute = createRoute({
  getParentRoute: () => usersManagerRoute,
  path: "/",
  component: lazyRouteComponent(() => import("./accounts/usersManager/Index")),
});

export const userRoute = createRoute({
  getParentRoute: () => usersManagerRoute,
  path: "$userId",
  parseParams: ({ userId }) => ({ userId: Number(userId) }),
  stringifyParams: ({ userId }) => ({ userId: `${userId}` }),
  loader: async ({ context: { queryClient }, params: { userId } }) => {
    queryClient.ensureQueryData(getUserOption(userId));
  },
  component: lazyRouteComponent(() => import("./accounts/usersManager/User")),
});

const newAccountRoute = createRoute({
  getParentRoute: () => usersManagerRoute,
  path: "new",
  component: lazyRouteComponent(() => import("./accounts/usersManager/User")),
});

export const inactiveUsersRoute = createRoute({
  getParentRoute: () => accountsRoute,
  path: "inactive-users",
  validateSearch: usersSearchSchema,
  preSearchFilters: [
    (search) => ({
      ...search,
      showInactive: true,
    }),
  ],
  component: lazyRouteComponent(() => import("./accounts/InactiveUsers")),
});

const prospectsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "prospects",
  component: lazyRouteComponent(() => import("./prospects/Prospects")),
});

const prospectsIndexRoute = createRoute({
  getParentRoute: () => prospectsRoute,
  path: "/",
  component: lazyRouteComponent(() => import("./prospects/Index")),
});

export const prospectRoute = createRoute({
  getParentRoute: () => prospectsRoute,
  path: "$prospectId",
  parseParams: ({ prospectId }) => ({ prospectId: Number(prospectId) }),
  stringifyParams: ({ prospectId }) => ({ prospectId: `${prospectId}` }),
  loader: async ({ context: { queryClient }, params: { prospectId } }) => {
    queryClient.ensureQueryData(getProspectDetailsOption(prospectId));
  },
  component: lazyRouteComponent(() => import("./prospects/Prospect")),
});

const findProspectsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "find-prospects",
  component: lazyRouteComponent(() => import("./prospects/FindProspects")),
});

const prospectEmailTemplateRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "prospect-email-templates",
  component: lazyRouteComponent(
    () => import("./prospects/emailTemplates/EmailTemplates")
  ),
});

const prospectEmailTemplateIndexRoute = createRoute({
  getParentRoute: () => prospectEmailTemplateRoute,
  path: "/",
  component: lazyRouteComponent(
    () => import("./prospects/emailTemplates/Index")
  ),
});

const newProspectEmailTemplateRoute = createRoute({
  getParentRoute: () => prospectEmailTemplateRoute,
  path: "new",
  component: lazyRouteComponent(
    () => import("./prospects/emailTemplates/EmailTemplate")
  ),
});

export const editProspectEmailTemplateRoute = createRoute({
  getParentRoute: () => prospectEmailTemplateRoute,
  path: "$templateId",
  parseParams: ({ templateId }) => ({ templateId: Number(templateId) }),
  stringifyParams: ({ templateId }) => ({ templateId: `${templateId}` }),
  loader: async ({ context: { queryClient }, params: { templateId } }) => {
    queryClient.ensureQueryData(getEmailTemplateOptions(templateId));
  },
  component: lazyRouteComponent(
    () => import("./prospects/emailTemplates/EmailTemplate")
  ),
});

const brandsRoute = createRoute({
  getParentRoute: () => protectedAdminRoute,
  path: "brands",
  component: lazyRouteComponent(() => import("./brands/Brands")),
});

const brandsManagerRoute = createRoute({
  getParentRoute: () => brandsRoute,
  path: "brands-manager",
  component: lazyRouteComponent(
    () => import("./brands/brandsManager/BrandsManager")
  ),
});

export const brandsManagerIndexRoute = createRoute({
  getParentRoute: () => brandsManagerRoute,
  path: "/",
  component: lazyRouteComponent(() => import("./brands/brandsManager/Index")),
});

export const brandRoute = createRoute({
  getParentRoute: () => brandsManagerRoute,
  path: "$brandId",
  parseParams: ({ brandId }) => ({ brandId: Number(brandId) }),
  stringifyParams: ({ brandId }) => ({ brandId: `${brandId}` }),
  loader: async ({ context: { queryClient }, params: { brandId } }) => {
    queryClient.ensureQueryData(getBrandOption(brandId));
  },
  component: lazyRouteComponent(
    () => import("./brands/brandsManager/CreateBrands")
  ),
});

const newBrandsRoute = createRoute({
  getParentRoute: () => brandsManagerRoute,
  path: "new",
  component: lazyRouteComponent(
    () => import("./brands/brandsManager/CreateBrands")
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  forgotPasswordRoute,
  newPasswordRoute,

  protectedRoute.addChildren([
    protectedAdminRoute.addChildren([
      accountsRoute.addChildren([
        accountsIndexRoute,
        sellersReport,
        usersManagerRoute,
        usersManagerIndexRoute,
        userRoute,
        newAccountRoute,
        inactiveUsersRoute,
      ]),
      brandsRoute.addChildren([
        brandsManagerRoute,
        brandsManagerIndexRoute,
        newBrandsRoute,
        brandRoute,
      ]),
    ]),

    profileRoute,
    changePasswordRoute,
    dashboardRoute,
    adminDashboardRoute,
    sellerDashboardRoute,
    inboxRoute.addChildren([selectChatRoute, chatRoute]),
    tasksRoute.addChildren([tasksIndexRoute, taskRoute, newTaskRoute]),

    ordersRoute.addChildren([
      ordersIndexRoute,
      ordersReportRoute,
      ordersManagerRoute,
      ordersManagerIndexRoute,
      newOrderRoute,
      orderRoute,
      deletedOrdersRoute,
      deletedOrdersIndexRoute,
      deletedOrderRoute,
    ]),

    clientsRoute.addChildren([
      clientsIndexRoute,
      clientsReportRoute,
      clientsManagerRoute,
      clientsManagerIndexRoute,
      clientRoute,
      newClientRoute,
    ]),

    prospectsRoute.addChildren([prospectsIndexRoute, prospectRoute]),
    findProspectsRoute,
    prospectEmailTemplateRoute.addChildren([
      prospectEmailTemplateIndexRoute,
      newProspectEmailTemplateRoute,
      editProspectEmailTemplateRoute,
    ]),
  ]),
]);

// const notFoundRoute = new NotFoundRoute({
//   getParentRoute: () => rootRoute,
//   beforeLoad: async () => {
//     if (isAuth()) {
//       throw redirect({ to: "/dashboard" });
//     } else {
//       throw redirect({ to: "/" });
//     }
//   },
// });

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: { queryClient },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
