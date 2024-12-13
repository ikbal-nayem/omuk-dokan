import { NextComponentType, NextPageContext } from 'next';
import { IntlProvider } from 'next-intl';
import Router from 'next/router';
import NProgress from 'nprogress';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from '../context/App/app.context';
import { ProvideAuth } from '../context/auth.context';
import { ProvideCart } from '../context/cart/CartProvider';
import { ProvideWishlist } from '../context/wishlist/WishlistProvider';
import { ToastContainer } from 'react-toastify';

import 'animate.css';
import 'nprogress/nprogress.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

type AppCustomProps = {
	Component: NextComponentType<NextPageContext, any, {}>;
	pageProps: any;
	cartState: string;
	wishlistState: string;
};

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppCustomProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			<AppProvider>
				<IntlProvider messages={pageProps?.messages} locale='en' timeZone='Asia/Dhaka'>
					<ProvideAuth>
						<ProvideWishlist>
							<ProvideCart>
								<Component {...pageProps} />
							</ProvideCart>
						</ProvideWishlist>
					</ProvideAuth>
				</IntlProvider>
			</AppProvider>
			<ToastContainer />
		</QueryClientProvider>
	);
};

export default MyApp;
