import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../views/Home";
import Movies from "../views/Movies";
import TvShows from "../views/TvShows";
import PopularPeople from "../views/PopularPeople";
import NotFound from "../components/NotFound";
import PersonDetails from "../views/Person/PersonDetails";
import Details from "../views/Details/Details";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/movie/details/:id",
        element: <Details />,
      },
      {
        path: "/tv-shows",
        element: <TvShows />,
      },
      {
        path: "/tv/details/:id",
        element: <Details />,
      },
      {
        path: "/popular-people",
        element: <PopularPeople />,
      },
      {
        path: "/person/:id",
        element: <PersonDetails />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
