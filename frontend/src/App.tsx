import React, {useMemo} from 'react'
import './App.sass'
import {QueryClient, QueryClientProvider} from "react-query";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import RootPage from "./components/routes/RootPage";
import ErrorPage from "./components/routes/ErrorPage";
import RoomBrowserPage from "./components/routes/RoomBrowserPage";
import RoomPage from "./components/routes/RoomPage";

const App = () => {
  const queryClient = new QueryClient();

  const router = useMemo(
    () => (
      createBrowserRouter([
        {
          path: "/",
          element: <RootPage />,
          errorElement: <ErrorPage />,
          children: [
            {
              path: "/browse",
              element: <RoomBrowserPage />,
            },
            {
              path: "/room",
              element: <RoomPage />,
            }
          ]
        },
      ])
    ),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
};

export default App
