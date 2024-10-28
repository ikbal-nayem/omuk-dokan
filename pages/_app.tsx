import { NextComponentType, NextPageContext } from "next";
import Router from "next/router";
import NProgress from "nprogress";
import { IntlProvider } from "next-intl";

import { ProvideCart } from "../context/cart/CartProvider";
import { ProvideWishlist } from "../context/wishlist/WishlistProvider";
import { ProvideAuth } from "../context/AuthContext";

import "../styles/globals.css";
import "animate.css";
import "nprogress/nprogress.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

type AppCustomProps = {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
  cartState: string;
  wishlistState: string;
};

const MyApp = ({ Component, pageProps }: AppCustomProps) => {
  return (
    <IntlProvider messages={pageProps?.messages} locale="en" timeZone="Asia/Dhaka">
      <ProvideAuth>
        <ProvideWishlist>
          <ProvideCart>
            <Component {...pageProps} />
          </ProvideCart>
        </ProvideWishlist>
      </ProvideAuth>
    </IntlProvider>
  );
};

export default MyApp;
