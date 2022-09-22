import Main from "layouts/main"
const routes = [
  {
    type: "collapse",
    name: "Main",
    key: "main",
    route: "/",
    component: <Main />,
    noCollapse: true,
  },
]

export default routes
