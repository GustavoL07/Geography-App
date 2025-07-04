const ROUTES = {
  HOME: "/",
  COUNTRY: (id: string = ":id") => `/country/${id}`,
  WORLDMAP: "/world-map",
  COMPARE: "/compare",
  FAVORITES: "/favorites",
};

export default ROUTES;
