// Generated by React Router

import "react-router"

declare module "react-router" {
  interface Register {
    pages: Pages
    routeFiles: RouteFiles
  }
}

type Pages = {
  "/": {
    params: {};
  };
};

type RouteFiles = {
  "root.tsx": {
    id: "root";
    page: "/";
  };
  "./routes/page.tsx": {
    id: "routes/page";
    page: "/";
  };
};