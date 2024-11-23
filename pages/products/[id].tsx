import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import Button from '../../components/Buttons/Button';
import GhostButton from '../../components/Buttons/GhostButton';
import Card from '../../components/Card/Card';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import DownArrow from '../../public/icons/DownArrow';
import FacebookLogo from '../../public/icons/FacebookLogo';
import Heart from '../../public/icons/Heart';
import InstagramLogo from '../../public/icons/InstagramLogo';

import { Swiper, SwiperSlide } from 'swiper/react';

import clsx from 'clsx';
import { useCart } from '../../context/cart/CartProvider';
import { useWishlist } from '../../context/wishlist/WishlistProvider';
import { IObject } from '../../interface/common.interface';
import { IProduct, IVariant } from '../../interface/product.interface';
import HeartSolid from '../../public/icons/HeartSolid';
import { isNull } from '../../utils/check-validation';
import { COMMON_URL } from '../../utils/util';

type Props = {
	product: IProduct;
	products: IProduct[];
};

const Product: React.FC<Props> = ({ product, products }) => {
	const img1 = product.img1;
	const img2 = product.img2;

	const { addItem } = useCart();
	const { wishlist, addToWishlist, deleteWishlistItem } = useWishlist();
	const [selectedVariant, setSelectedVariant] = useState<IVariant>(product?.variants?.[0]);
	const [currentQty, setCurrentQty] = useState(1);
	const [swiper, setSwiper] = useState<any>();
	const t = useTranslations('Category');

	const alreadyWishlisted = wishlist.filter((wItem) => wItem._id === product._id).length > 0;

	const handleVeriantSelect = (type: string, value: string) => {
		const sv = selectedVariant?.options?.filter((op) => op?.key !== type);
		sv.push({ key: type, value });
		const newSelected = product.variants.find((pv) =>
			pv?.options?.map((o) => sv.findIndex((v) => v.key == o.key && v.value == o.value) > -1).every((v) => v)
		);
		setSelectedVariant(newSelected!);
	};

	const currentItem: IProduct = {
		...product,
		stock: currentQty,
	};

	const handleWishlist = () => {
		alreadyWishlisted ? deleteWishlistItem!(currentItem) : addToWishlist!(currentItem);
	};

	return (
		<div>
			<Header title={`${product.name} - Omuk Dokan`} />

			<main id='main-content'>
				<div className='bg-lightgreen h-16 w-full flex items-center border-t-2 border-gray200'>
					<div className='app-x-padding app-max-width w-full'>
						<div className='breadcrumb'>
							<Link href='/' className='text-gray400'>
								{t('home')}
							</Link>{' '}
							/ Category / {product.category?.name} / <span>{product?.name}</span>
						</div>
					</div>
				</div>
				<div className='itemSection app-max-width app-x-padding flex flex-col md:flex-row'>
					<div className='imgSection w-full md:w-1/2 h-full flex'>
						<div className='hidden sm:block w-full sm:w-1/4 h-full space-y-4 my-4'>
							<Image
								className={`cursor-pointer ${
									swiper?.activeIndex === 0 ? 'opacity-100 border border-gray300' : 'opacity-50'
								}`}
								onClick={() => swiper?.slideTo(0)}
								src={img1 as string}
								alt={product.name}
								width={1000}
								height={1282}
							/>
							<Image
								className={`cursor-pointer ${
									swiper?.activeIndex === 1 ? 'opacity-100 border border-gray300' : 'opacity-50'
								}`}
								onClick={() => swiper?.slideTo(1)}
								src={img2 as string}
								alt={product.name}
								width={1000}
								height={1282}
							/>
						</div>
						<div className='w-full sm:w-3/4 h-full m-0 sm:m-4'>
							<Swiper slidesPerView={1} spaceBetween={0} className='mySwiper sm:hidden' onSwiper={setSwiper}>
								<SwiperSlide>
									<Image
										className='each-slide w-full'
										src={img1 as string}
										width={1000}
										height={1282}
										alt={product.name}
									/>
								</SwiperSlide>
								<SwiperSlide>
									<Image
										className='each-slide w-full'
										src={img2 as string}
										width={1000}
										height={1282}
										alt={product.name}
									/>
								</SwiperSlide>
							</Swiper>
							{/* <div className='hidden sm:block h-full'>
								<Image
									className='w-full'
									src={mainImg as string}
									width={1000}
									height={1282}
									alt={product.name}
								/>
							</div> */}
						</div>
					</div>
					<div className='infoSection w-full md:w-1/2 h-auto py-8 sm:pl-4 flex flex-col'>
						<h1 className='text-3xl mb-4'>{product.name}</h1>
						<span className='text-2xl text-gray400 mb-2'>
							৳ {product.hasVariants ? selectedVariant.price : product.price}
						</span>
						<span className='mb-2 text-justify'>{product?.summary}</span>
						<span className='mb-2'>
							{clsx({
								[`⚬ Weight: ${product?.weight}${product?.weightUnit} `]: product?.weight,
								[`⚬ Height: ${product?.height}${product?.heightUnit} `]: product?.height,
								[`⚬ Width: ${product?.width}${product?.widthUnit}`]: product?.width,
							})}
						</span>
						<span className='mb-2'>
							{t('availability')}:{' '}
							<span className={'font-bold ' + (product.stock > 0 ? 'text-green' : 'text-red')}>
								{(product.hasVariants ? selectedVariant.stock > 0 : product.stock > 0)
									? 'In Stock'
									: 'Out of Stock'}
							</span>
						</span>

						{product?.hasVariants &&
							product?.options?.map((op) => {
								const sVal = selectedVariant?.options?.find((o: IObject) => o.key === op?.name)?.value;
								return (
									<div key={op?.name}>
										{!isNull(selectedVariant) ? (
											<span className='mb-2'>
												{op?.name}: <strong>{sVal}</strong>
											</span>
										) : null}
										<div className='sizeContainer flex space-x-4 text-sm mb-4'>
											{op?.values?.map((val) => (
												<div
													key={val?.name}
													onClick={() => handleVeriantSelect(op?.name, val?.name)}
													className={`w-8 h-8 flex items-center justify-center border ${
														sVal === val?.name ? 'border-gray500 bg-gray200' : 'border-gray300 text-gray400'
													} cursor-pointer hover:bg-gray500 hover:text-gray100`}
												>
													{val?.name}
												</div>
											))}
										</div>
									</div>
								);
							})}
						<div className='addToCart flex flex-col sm:flex-row md:flex-col lg:flex-row space-y-4 sm:space-y-0 mb-4'>
							<div className='plusOrMinus h-12 flex border justify-center border-gray300 divide-x-2 divide-gray300 mb-4 mr-0 sm:mr-4 md:mr-0 lg:mr-4'>
								<div
									onClick={() => setCurrentQty((prevState) => prevState - 1)}
									className={`${
										currentQty === 1 && 'pointer-events-none opacity-70 bg-gray100'
									} h-full w-full sm:w-12 flex justify-center items-center cursor-pointer hover:bg-gray500 hover:text-gray100`}
								>
									-
								</div>
								<div className='h-full w-28 sm:w-12 flex justify-center items-center pointer-events-none'>
									{currentQty}
								</div>
								<div
									onClick={() => setCurrentQty((prevState) => prevState + 1)}
									className={clsx(
										'h-full w-full sm:w-12 flex justify-center items-center cursor-pointer hover:bg-gray500 hover:text-gray100',
										{
											'pointer-events-none opacity-70 bg-gray100': currentQty === product.stock,
										}
									)}
								>
									+
								</div>
							</div>
							<div className='flex h-12 space-x-4 w-full'>
								<Button
									value={t('add_to_cart')}
									size='lg'
									extraClass={`flex-grow text-center whitespace-nowrap`}
									onClick={() => addItem!(currentItem)}
								/>
								<GhostButton onClick={handleWishlist}>
									{alreadyWishlisted ? <HeartSolid extraClass='inline' /> : <Heart extraClass='inline' />}
								</GhostButton>
							</div>
						</div>
						<Disclosure>
							{({ open }) => (
								<>
									<DisclosureButton className='py-2 focus:outline-none text-left mb-4 border-b-2 border-gray200 flex items-center justify-between'>
										<span>{t('details')}</span>
										<DownArrow extraClass={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500`} />
									</DisclosureButton>
									<DisclosurePanel className={`text-gray400 animate__animated animate__bounceIn`}>
										<div dangerouslySetInnerHTML={{ __html: product.description }} />
									</DisclosurePanel>
								</>
							)}
						</Disclosure>
						<div className='flex items-center space-x-4 mt-4'>
							<span>{t('share')}</span>
							<FacebookLogo extraClass='h-4 cursor-pointer text-gray400 hover:text-gray500' />
							<InstagramLogo extraClass='h-4 cursor-pointer text-gray400 hover:text-gray500' />
						</div>
					</div>
				</div>
				{/* ===== Horizontal Divider ===== */}
				<div className='border-b-2 border-gray200'></div>

				{/* ===== You May Also Like Section ===== */}
				<div className='recSection my-8 app-max-width app-x-padding'>
					<h2 className='text-3xl mb-6'>{t('you_may_also_like')}</h2>
					<Swiper
						slidesPerView={2}
						// centeredSlides={true}
						spaceBetween={10}
						loop={true}
						grabCursor={true}
						pagination={{
							clickable: true,
							type: 'bullets',
						}}
						className='mySwiper card-swiper sm:hidden'
					>
						{products.map((item) => (
							<SwiperSlide key={item._id}>
								<div className='mb-6'>
									<Card key={item._id} item={item} />
								</div>
							</SwiperSlide>
						))}
					</Swiper>
					<div className='hidden sm:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6 mb-10'>
						{products.map((item) => (
							<Card key={item._id} item={item} />
						))}
					</div>
				</div>
			</main>

			{/* ===== Footer Section ===== */}
			<Footer />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
	const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/get/${params!.id as string}`);
	const fetchedProduct: IProduct = res.data.data;

	fetchedProduct.img1 = COMMON_URL.DUMMY_URL;
	fetchedProduct.img2 = COMMON_URL.SHIRT_IMG;

	// Might be temporary solution for suggested products
	const randomProductRes = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/search`, {
		filter: { category: fetchedProduct.category?._id },
		meta: { limit: 5, page: 1 },
	});
	const fetchedProducts: IProduct[] = randomProductRes.data.data;

	// Shuffle array
	const shuffled = fetchedProducts.sort(() => 0.5 - Math.random());

	// Get sub-array of first 5 elements after shuffled
	let randomFetchedProducts = shuffled.slice(0, 5);

	randomFetchedProducts.forEach((randomProduct) => {
		randomProduct.img1 = COMMON_URL.SHIRT_IMG;
		randomProduct.img2 = COMMON_URL.SHIRT_IMG;
	});

	// Pass data to the page via props
	return {
		props: {
			product: fetchedProduct,
			products: randomFetchedProducts,
			messages: (await import(`../../locales/${locale}.json`)).default,
		},
	};
};

export default Product;
