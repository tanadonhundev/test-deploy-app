import { createBrowserRouter } from "react-router-dom";

import ShorturlPage from "../components/pages/shorturl-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ShorturlPage />,
  },
]);

export default router;
