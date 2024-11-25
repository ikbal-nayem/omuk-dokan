import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';

import clsx from 'clsx';
import Card from '../../components/Card/Card';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Pagination from '../../components/Util/Pagination';
import { PRODUCT_COLLECTION } from '../../constants/route.constanat';
import { IMeta } from '../../interface/common.interface';
import { ICatrgoryTree, IProduct } from '../../interface/product.interface';
import DownArrow from '../../public/icons/DownArrow';
import axiosIns from '../../services/api/axios.config';
import { COMMON_URL, toCapitalized } from '../../utils/util';

type OrderType = 'latest' | 'price' | 'price-desc';

type Props = {
	items: IProduct[];
	meta: IMeta;
	orderby: OrderType;
};

const ProductCollection: React.FC<Props> = ({ items, meta, orderby }) => {
	const t = useTranslations('Category');

	const router = useRouter();
	const { collection } = router.query;

	const limit = meta?.limit || 10;
	const firstIndex = (meta?.page || 1) * limit - limit + 1;

	return (
		<div>
			{/* ===== Head Section ===== */}
			<Header title={`${toCapitalized(collection as string)} - OD`} />

			<main id='main-content'>
				{/* ===== Breadcrumb Section ===== */}
				<div className='bg-lightgreen h-16 w-full flex items-center'>
					<div className='app-x-padding app-max-width w-full'>
						<div className='breadcrumb'>
							<Link href='/'>
								<span className='text-gray400'>{t('home')}</span>
							</Link>{' '}
							/ <span className='capitalize'>Collection / {collection}</span>
						</div>
					</div>
				</div>

				{/* ===== Heading & Filter Section ===== */}
				<div className='app-x-padding app-max-width w-full mt-8'>
					<h3 className='text-4xl mb-2 capitalize'>{collection}</h3>
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
	const collectionSlug = params!.collection as string;

	const reqBody = { filter: { collectionSlug }, meta: { limit, page } };
	const res = await axiosIns.post('/product/search', reqBody);
	const fetchedProducts = res.data.data?.map((product: IProduct) => ({
		...product,
		// img1: product?.images?.[0] || null,
		// img2: product?.images?.[1] || null,
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

const sortList = [
	{ name: 'Latest', orderBy: 'latest' },
	{ name: 'Price: Low to High', orderBy: 'price' },
	{ name: 'Price: High to Low', orderBy: 'price-desc' },
];

const SortMenu: React.FC<{ orderby: OrderType }> = ({ orderby }) => {
	// const t = useTranslations('Navigation');
	const router = useRouter();
	const { collection } = router.query;

	if (!collection) return;

	return (
		<Menu as='div' className='relative'>
			<MenuButton as='a' href='#' className='flex items-center capitalize'>
				Sort By {sortList.find((sort) => sort.orderBy === orderby)?.name} <DownArrow />
			</MenuButton>
			<MenuItems className='flex flex-col z-10 items-start text-xs sm:text-sm w-auto sm:right-0 absolute p-1 border border-gray200 bg-white mt-2 outline-none'>
				{sortList.map((sort) => (
					<MenuItem>
						{({ focus }) => (
							<button
								type='button'
								onClick={() =>
									router.push(`${PRODUCT_COLLECTION(collection as string)}?orderby=${sort.orderBy}`)
								}
								className={clsx(
									`${
										focus ? 'bg-gray100' : 'bg-white'
									} py-2 px-4 text-left w-full focus:outline-none whitespace-nowrap`,
									{ 'bg-gray500 text-gray100': sort.orderBy === orderby }
								)}
							>
								{sort.name}
							</button>
						)}
					</MenuItem>
				))}
			</MenuItems>
		</Menu>
	);
};

export default ProductCollection;
