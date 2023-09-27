import { AuthProvider } from "@/Contexts/Auth";
import Footer from "@/components/Footer";
import Router from "next/router";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import NProgress from "nprogress";
import { NotificationContainer } from "react-notifications";

Router.onRouteChangeStart = () => {
  // console.log('onRouteChangeStart triggered');
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  // console.log('onRouteChangeComplete triggered');
  NProgress.done();
};

Router.onRouteChangeError = () => {
  // console.log('onRouteChangeError triggered');
  NProgress.done();
};

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="">
        <NotificationContainer />
        <div className="sticky top-0 z-[999]">
          <Navbar />
        </div>

        <div className="z-[99999]">
          {" "}
          <Toaster
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
        <div className="">
          <Component {...pageProps} />
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </AuthProvider>
  );
}
