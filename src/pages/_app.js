import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect} from "react";
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  const hideNavbarRoutes = ["/404", "/_error"];
  const shouldHideNavbar = hideNavbarRoutes.includes(router.pathname);
  return (
    <>
    {!shouldHideNavbar && <NavBar />}
    <Component {...pageProps}/>
    </>
  
);
}
