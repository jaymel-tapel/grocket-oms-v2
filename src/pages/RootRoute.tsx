import React from "react";
import { Outlet, useRouterState } from "@tanstack/react-router";
import SidebarNavigation from "../components/sidebar/Sidebar";

const Root: React.FC = () => {
  const routerState = useRouterState();

  const pathname = React.useMemo(() => {
    if (routerState) return routerState.location.pathname;

    return "";
  }, [routerState]);

  const isProtectedRoute = React.useMemo(() => {
    if (pathname === "/" || pathname === "") {
      return false;
    }

    if (pathname.includes("login")) {
      return false;
    }

    if (pathname.includes("forgot_password")) {
      return false;
    }

    return true;
  }, [pathname]);

  return (
    <div>
      {isProtectedRoute && <SidebarNavigation />}
      <Outlet />
    </div>
  );
};

export default Root;
