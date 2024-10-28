import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import axios from 'axios';
import Card from '../components/Card/Card';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { apiProductsType, itemType } from '../context/cart/cart-types';
import { COMMON_URL } from '../utils/util';

type Props = {
	items: itemType[];
	searchWord: string;
};

const Search: React.FC<Props> = ({ items, searchWord }) => {
	const t = useTranslations('Search');

	return (
		<div>
			{/* ===== Head Section ===== */}
			<Header title={`Haru Fashion`} />

			<main id='main-content'>
				{/* ===== Breadcrumb Section ===== */}
				<div className='bg-lightgreen h-16 w-full flex items-center'>
					<div className='app-x-padding app-max-width w-full'>
						<div className='breadcrumb'>
							<Link href='/'>
								<span className='text-gray400'>{t('home')}</span>
							</Link>{' '}
							/ <span>{t('search_results')}</span>
						</div>
					</div>
				</div>

				{/* ===== Heading & Filter Section ===== */}
				<div className='app-x-padding app-max-width w-full mt-8'>
					<h1 className='text-3xl mb-2'>
						{t('search_results')}: &quot;{searchWord}&quot;
					</h1>
					{items.length > 0 && (
						<div className='flex justify-between mt-6'>
							<span>
								{t('showing_results', {
									products: items.length,
								})}
							</span>
						</div>
					)}
				</div>

				{/* ===== Main Content Section ===== */}
				<div className='app-x-padding app-max-width mt-3 mb-14'>
					{items.length < 1 ? (
						<div className='flex justify-center items-center h-72'>{t('no_result')}</div>
					) : (
						<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6 mb-10'>
							{items.map((item) => (
								<Card key={item.id} item={item} />
							))}
						</div>
					)}
				</div>
			</main>

			{/* ===== Footer Section ===== */}
			<Footer />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ locale, query: { q = '' } }) => {
	const res = await axios.post(`${process.env.NEXT_PUBLIC_PROD_BACKEND_URL}/product/search?q=${q}`);
	const fetchedProducts: apiProductsType[] = res.data.data.map((product: apiProductsType) => ({
		...product,
		img1: product.images?.[0] || COMMON_URL.DUMMY_URL,
		img2: product.images?.[1] || COMMON_URL.DUMMY_URL,
	}));

	let items: apiProductsType[] = [];
	fetchedProducts.forEach((product: apiProductsType) => {
		items.push(product);
	});

	return {
		props: {
			messages: (await import(`../locales/${locale}.json`)).default,
			items,
			searchWord: q,
		},
	};
};

export default Search;
