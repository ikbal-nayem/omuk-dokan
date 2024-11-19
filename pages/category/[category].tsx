import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Card from '../../components/Card/Card';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Pagination from '../../components/Util/Pagination';
import { apiProductsType } from '../../context/cart/cart-types';
import { IMeta } from '../../interface/common.interface';
import { ICatrgoryTree, IProduct } from '../../interface/product.interface';
import DownArrow from '../../public/icons/DownArrow';
import axiosIns from '../../services/api/axios.config';
import { COMMON_URL, toCapitalized } from '../../utils/util';

type OrderType = 'latest' | 'price' | 'price-desc';

type Props = {
	items: IProduct[];
	categoryTree: ICatrgoryTree[];
	meta: IMeta;
	orderby: OrderType;
};

const ProductCategory: React.FC<Props> = ({ items, meta, orderby }) => {
	const t = useTranslations('Category');

	const router = useRouter();
	const { category } = router.query;

	const limit = meta?.limit || 10;
	const firstIndex = (meta?.page || 1) * limit - limit + 1;

	return (
		<div>
			{/* ===== Head Section ===== */}
			<Header title={`${toCapitalized(category as string)} - OD`} />

			<main id='main-content'>
				{/* ===== Breadcrumb Section ===== */}
				<div className='bg-lightgreen h-16 w-full flex items-center'>
					<div className='app-x-padding app-max-width w-full'>
						<div className='breadcrumb'>
							<Link href='/'>
								<span className='text-gray400'>{t('home')}</span>
							</Link>{' '}
							/ <span className='capitalize'>Category / {category}</span>
						</div>
					</div>
				</div>

				{/* ===== Heading & Filter Section ===== */}
				<div className='app-x-padding app-max-width w-full mt-8'>
					<h3 className='text-4xl mb-2 capitalize'>Category - {category}</h3>
					<div className='flex flex-col-reverse sm:flex-row gap-4 sm:gap-0 justify-between mt-4 sm:mt-6'>
						<span>
							{t('showing_from_to', {
								from: firstIndex,
								to: firstIndex + (meta?.currentPageTotal || 0) - 1,
								all: meta?.totalRecords,
							})}
						</span>
						<SortMenu orderby={orderby} />
					</div>
				</div>

				{/* ===== Main Content Section ===== */}
				<div className='app-x-padding app-max-width mt-3 mb-14'>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6 mb-10'>
						{items?.map((item) => (
							<Card key={item._id} item={item} />
						))}
					</div>
					<Pagination currentPage={meta?.page || 1} lastPage={meta?.totalPages || 1} orderby={orderby} />
				</div>
			</main>

			<Footer />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({
	params,
	locale,
	query: { page = 1, limit = 20 },
}) => {
	const categorySlug = params!.category as string;

	const reqBody = { filter: { categorySlug }, meta: { limit, page } };
	const res = await axiosIns.post('/product/search', reqBody);
	const fetchedProducts = res.data.data?.map((product: apiProductsType) => ({
		...product,
		img1: COMMON_URL.SHIRT_IMG,
		img2: COMMON_URL.SHIRT_IMG,
	}));	

	return {
		props: {
			messages: (await import(`../../locales/${locale}.json`)).default,
			items: fetchedProducts,
			meta: res.data?.meta,
			orderby: 'latest',
		},
	};
};

const SortMenu: React.FC<{ orderby: OrderType }> = ({ orderby }) => {
	const t = useTranslations('Navigation');
	const router = useRouter();
	const { category } = router.query;

	let currentOrder: string;

	if (orderby === 'price') {
		currentOrder = 'sort_by_price';
	} else if (orderby === 'price-desc') {
		currentOrder = 'sort_by_price_desc';
	} else {
		currentOrder = 'sort_by_latest';
	}
	return (
		<Menu as='div' className='relative'>
			<MenuButton as='a' href='#' className='flex items-center capitalize'>
				{t(currentOrder)} <DownArrow />
			</MenuButton>
			<MenuItems className='flex flex-col z-10 items-start text-xs sm:text-sm w-auto sm:right-0 absolute p-1 border border-gray200 bg-white mt-2 outline-none'>
				<MenuItem>
					{({ active }) => (
						<button
							type='button'
							onClick={() => router.push(`/product-category/${category}?orderby=latest`)}
							className={`${
								active ? 'bg-gray100 text-gray500' : 'bg-white'
							} py-2 px-4 text-left w-full focus:outline-none whitespace-nowrap ${
								currentOrder === 'sort_by_latest' && 'bg-gray500 text-gray100'
							}`}
						>
							{t('sort_by_latest')}
						</button>
					)}
				</MenuItem>
				<MenuItem>
					{({ active }) => (
						<button
							type='button'
							onClick={() => router.push(`/product-category/${category}?orderby=price`)}
							className={`${
								active ? 'bg-gray100 text-gray500' : 'bg-white'
							} py-2 px-4 text-left w-full focus:outline-none whitespace-nowrap ${
								currentOrder === 'sort_by_price' && 'bg-gray500 text-gray100'
							}`}
						>
							{t('sort_by_price')}
						</button>
					)}
				</MenuItem>
				<MenuItem>
					{({ active }) => (
						<button
							type='button'
							onClick={() => router.push(`/product-category/${category}?orderby=price-desc`)}
							className={`${
								active ? 'bg-gray100 text-gray500' : 'bg-white'
							} py-2 px-4 text-left w-full focus:outline-none whitespace-nowrap ${
								currentOrder === 'sort_by_price_desc' && 'bg-gray500 text-gray100'
							}`}
						>
							{t('sort_by_price_desc')}
						</button>
					)}
				</MenuItem>
			</MenuItems>
		</Menu>
	);
};

export default ProductCategory;
