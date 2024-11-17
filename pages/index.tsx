import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useState } from 'react';

import Button from '../components/Buttons/Button';
import LinkButton from '../components/Buttons/LinkButton';
import Card from '../components/Card/Card';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Slideshow from '../components/HeroSection/Slideshow';
import OverlayContainer from '../components/OverlayContainer/OverlayContainer';
import TestiSlider from '../components/TestiSlider/TestiSlider';

import { ICatrgoryTree, ICollection, IProduct } from '../interface/product.interface';
import ourShop from '../public/bg-img/ourshop.png';
import axiosIns from '../services/api/axios.config';

type Props = {
	category: ICatrgoryTree[];
	products: IProduct[];
	collections: ICollection[];
};

const Home: React.FC<Props> = ({ products, category, collections }) => {
	const t = useTranslations('Index');
	const [isFetching, setIsFetching] = useState(false);
	const [seeAllCollectiions, setAllCollection] = useState(false);

	const handleSeemore = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		setIsFetching(true);
	};

	return (
		<>
			<Header category={category} />
			<Slideshow />
			<main id='main-content' className='-mt-20'>
				<section className='w-full h-auto py-10 border border-b-2 border-gray100'>
					<div className='app-max-width app-x-padding h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
						<div className='w-full sm:col-span-2 lg:col-span-2'>
							<OverlayContainer
								imgSrc='/bg-img/banner_minipage1.jpg'
								imgSrc2='/bg-img/banner_minipage1-tablet.jpg'
								imgAlt='New Arrivals'
							>
								<LinkButton
									href='/product-category/new-arrivals'
									extraClass='absolute bottom-10-per sm:right-10-per z-20'
								>
									{t('new_arrivals')}
								</LinkButton>
							</OverlayContainer>
						</div>
						{collections?.slice(0, seeAllCollectiions ? collections?.length : 2)?.map((collection) => (
							<div className='w-full'>
								<OverlayContainer imgSrc='/bg-img/banner_minipage3.jpg' imgAlt='Women Collection'>
									<LinkButton
										href={'/collections/' + collection?.slug}
										extraClass='absolute bottom-10-per z-20'
									>
										{collection?.name}
									</LinkButton>
								</OverlayContainer>
							</div>
						))}
						{/* <div className='w-full'>
							<OverlayContainer imgSrc='/bg-img/banner_minipage3.jpg' imgAlt='Men Collection'>
								<LinkButton href='/product-category/men' extraClass='absolute bottom-10-per z-20'>
									{t('men_collection')}
								</LinkButton>
							</OverlayContainer>
						</div> */}
						{collections?.length > 2 && (
							<div className='flex justify-center'>
								<Button
									value={seeAllCollectiions ? t('see_less') : t('see_more')}
									onClick={() => setAllCollection((prev) => !prev)}
								/>
							</div>
						)}
					</div>
				</section>

				<section className='app-max-width w-full h-full flex flex-col justify-center mt-16 mb-20'>
					<div className='flex justify-center'>
						<div className='w-3/4 sm:w-1/2 md:w-1/3 text-center mb-8'>
							<h2 className='text-3xl mb-4'>{t('best_selling')}</h2>
							<span>{t('best_selling_desc')}</span>
						</div>
					</div>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-x-4 lg:gap-x-12 gap-y-6 mb-10 app-x-padding'>
						{products.slice(0, 4)?.map((item) => (
							<Card key={item._id} item={item} />
						))}
					</div>
				</section>

				<section className='w-full hidden h-full py-16 md:flex flex-col items-center bg-lightgreen'>
					<h2 className='text-3xl'>{t('testimonial')}</h2>
					<TestiSlider />
				</section>

				<section className='app-max-width app-x-padding my-16 flex flex-col'>
					<div className='text-center mb-6'>
						<h2 className='text-3xl'>{t('featured_products')}</h2>
					</div>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6 mb-10'>
						{products.map((item) => (
							<Card key={item._id} item={item} />
						))}
					</div>
					<div className='flex justify-center'>
						<Button value={!isFetching ? t('see_more') : t('loading')} onClick={handleSeemore} />
					</div>
				</section>

				<div className='border-gray100 border-b-2'></div>

				<section className='app-max-width mt-16 mb-20 flex flex-col justify-center items-center text-center'>
					<div className='textBox w-3/4 md:w-2/4 lg:w-2/5 mb-6'>
						<h2 className='text-3xl mb-6'>{t('our_shop')}</h2>
						<span className='w-full'>{t('our_shop_desc')}</span>
					</div>
					<div className='w-full app-x-padding flex justify-center'>
						<Image src={ourShop} alt='Our Shop' />
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	let products: IProduct[] = [];
	const res = await axiosIns.post('/product/search', { meta: { limit: 20, page: 1 } });
	const categoryRes = await axiosIns.get('/product-config/category-tree?isActive=true');
	const collections = await axiosIns.get('/product-config/collections?isActive=true');

	const fetchedProducts = res.data;
	products = fetchedProducts.data.map((product: IProduct) => {
		product.img1 = product?.images?.[0] || null;
		product.img2 = product?.images?.[1] || null;
		return product;
	});

	return {
		props: {
			messages: {
				...require(`../locales/${locale}.json`),
			},
			category: categoryRes.data?.data,
			collections: collections.data?.data,
			products,
		},
	};
};

export default Home;
