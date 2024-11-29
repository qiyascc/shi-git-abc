import ContactLayout from "@/components/layouts/ContactLayout";
import MainLayout from "@/components/layouts/MainLayout";
import About from "@/pages/about";
import BecomePartner from "@/pages/becomePartner";
import Contact from "@/pages/contact";
import Home from "@/pages/home";
import JoinTeam from "@/pages/joinTeam";
import NotFound from "@/pages/notFound";
import Premium from "@/pages/premium";
import ReachOut from "@/pages/reachOut";
import Services from "@/pages/services";
import Works from "@/pages/works";
import WorksInnerPage from "@/pages/worksInnerPage";
import WorkTogether from "@/pages/workTogether";
import { Navigate } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "works",
        element: <Works />,
      },
      {
        path: "premium",
        element: <Premium />,
      },
      {
        path: "book-a-call",
        element: <ReachOut />,
      },
      {
        path: "contact",
        element: <ContactLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="contact-us" />,
          },
          {
            path: "contact-us",
            element: <Contact />,
          },
          {
            path: "work-together",
            element: <WorkTogether />,
          },
          {
            path: "join-our-team",
            element: <JoinTeam />,
          },
          {
            path: "become-our-partner",
            element: <BecomePartner />,
          },
        ],
      },
      {
        path: "works/:id",
        element: <WorksInnerPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
