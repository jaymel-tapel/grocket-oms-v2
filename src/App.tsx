import "./App.scss";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./pages/ErrorBoundary";
import { queryClient } from "./services/queries";

import { RouterProvider } from "@tanstack/react-router";
import { router } from "./pages/routeTree";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { SocketContextProvider } from "./context/SocketContext";

function App() {
  return (
    <ErrorBoundary>
      <Toaster position="bottom-right" reverseOrder={false} />
      <UserAuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <SocketContextProvider>
            <RouterProvider router={router} />
          </SocketContextProvider>
        </QueryClientProvider>
      </UserAuthContextProvider>
    </ErrorBoundary>
  );
}

export default App;
