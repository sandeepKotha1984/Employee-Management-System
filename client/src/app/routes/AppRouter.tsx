import { Suspense } from "react";
import routes from "./routes";  
import { RouterProvider,createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(routes);

const AppRouter = () => {


  return (
    <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
    </Suspense>
  );
}

export default AppRouter;