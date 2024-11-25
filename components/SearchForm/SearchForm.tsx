import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import React, { Fragment, useEffect, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';
import { IProduct } from '../../interface/product.interface';
import Loading from '../../public/icons/Loading';
import SearchIcon from '../../public/icons/SearchIcon';
import { COMMON_URL } from '../../utils/util';
import GhostButton from '../Buttons/GhostButton';
import Card from '../Card/Card';

export default function SearchForm() {
	const t = useTranslations('Navigation');
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [searchItems, setSearchItems] = useState<IProduct[]>([]);
	const [isFetching, setIsFetching] = useState(false);
	const [noResult, setNoResult] = useState(false);
	const [moreThanFour, setMoreThanFour] = useState(false);

	function closeModal() {
		setOpen(false);
		setSearchItems([]);
		setNoResult(false);
		setMoreThanFour(false);
	}

	function openModal() {
		setOpen(true);
	}

	useEffect(() => {
		if (!isFetching) return;
		const fetchData = async () => {
			const res = await axios.post(`${process.env.NEXT_PUBLIC_PROD_BACKEND_URL}/product/search`, {
				filter: { searchKey: searchValue },
				meta: { page: 1, limit: 10 },
			});
			const fetchedProducts: IProduct[] = res.data.data.map((product: IProduct) => ({
				...product,
				img1: product.images?.[0] || COMMON_URL.DUMMY_URL,
				img2: product.images?.[1] || COMMON_URL.DUMMY_URL,
			}));
			if (fetchedProducts.length < 1) setNoResult(true);
			fetchedProducts.map((product, index) => {
				if (index < 4) {
					setSearchItems((prevProduct) => [...prevProduct, product]);
				} else {
					setMoreThanFour(true);
				}
			});
			setIsFetching(false);
		};
		fetchData();
	}, [isFetching, searchValue]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSearchItems([]);
		setIsFetching(true);
	};

	const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		setSearchValue((e.target as HTMLInputElement).value);
		setSearchItems([]);
		setNoResult(false);
		setMoreThanFour(false);
	};

	return (
		<>
			<div className=''>
				<button type='button' aria-label='Search' onClick={openModal}>
					<SearchIcon />
				</button>
			</div>
			<Transition show={open} as={Fragment}>
				<Dialog
					as='div'
					className='fixed inset-0 overflow-y-auto'
					style={{ zIndex: 99999 }}
					static
					open={open}
					onClose={closeModal}
				>
					<div className='min-h-screen text-center'>
						<TransitionChild
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0'
							enterTo='opacity-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'
						>
							<div className='fixed inset-0 bg-gray500 opacity-50' />
						</TransitionChild>

						{/* This element is to trick the browser into centering the modal contents. */}
						{/* <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span> */}
						<TransitionChild
							as={Fragment}
							enter='ease-linear duration-400'
							enterFrom='-translate-y-full'
							enterTo='translate-y-0'
							leave='ease-linear duration-300'
							leaveFrom='translate-y-0'
							leaveTo='-translate-y-full'
						>
							<div className='relative translate-y inline-block w-full pt-6 pb-12 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl'>
								<div className='app-max-width app-x-padding'>
									<div className='w-3/5 m-auto'>
										<div className='flex justify-end mb-8'>
											<button
												type='button'
												className='outline-none focus:outline-none text-2xl'
												onClick={closeModal}
											>
												&#10005;
											</button>
										</div>
										<form className='mt-2 flex items-center' onSubmit={handleSubmit}>
											{isFetching ? <Loading /> : <SearchIcon extraClass='text-gray300 w-8 h-8' />}
											<input
												type='search'
												placeholder={t('search_anything')}
												className='px-4 py-2 w-full focus:outline-none text-2xl'
												onChange={handleChange}
											/>
										</form>
										<div className='border-t-2 border-gray300'></div>
									</div>
									{noResult ? (
										<div className='flex justify-center mt-8'>
											<span>{t('no_result')}</span>
										</div>
									) : (
										<div className='text-center'>
											<div
												className='grid gap-x-4 justify-center my-8'
												style={{
													gridTemplateColumns: 'repeat( auto-fit, minmax(120px, 170px) )',
												}}
											>
												{searchItems.map((item) => (
													<Card key={item._id} item={item} />
												))}
											</div>
											{moreThanFour && (
												<GhostButton onClick={() => router.push(`/search?q=${searchValue}`)}>
													{t('view_all')}
												</GhostButton>
											)}
										</div>
									)}
								</div>
							</div>
						</TransitionChild>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
