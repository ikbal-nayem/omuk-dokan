import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { useWishlist } from '../../context/wishlist/WishlistProvider';
import UserIcon from '../../public/icons/UserIcon';
import WhistlistIcon from '../../public/icons/WhistlistIcon';
import AuthForm from '../Auth/AuthForm';
import CartItem from '../CartItem/CartItem';
import SearchForm from '../SearchForm/SearchForm';
import AppHeader from './AppHeader';
import { Menu } from './Menu';
import TopNav from './TopNav';

import { ICatrgoryTree } from '../../interface/product.interface';
import axiosIns from '../../services/api/axios.config';
import { COMMON_URL } from '../../utils/util';
import styles from './Header.module.css';

type Props = {
	title?: string;
};

const Header: React.FC<Props> = ({ title }) => {
	const t = useTranslations('Navigation');
	const [categoryTree, setCategoryTree] = useState<ICatrgoryTree[]>([]);
	const { wishlist } = useWishlist();
	const [animate, setAnimate] = useState('');
	const [scrolled, setScrolled] = useState<boolean>(false);
	const [didMount, setDidMount] = useState<boolean>(false); // to disable Can't perform a React state Warning

	// Calculate Number of Wishlist
	let noOfWishlist = wishlist.length;

	// Animate Wishlist Number
	const handleAnimate = useCallback(() => {
		if (noOfWishlist === 0) return;
		setAnimate('animate__animated animate__headShake');
	}, [noOfWishlist, setAnimate]);

	// Set animate when no of wishlist changes
	useEffect(() => {
		handleAnimate();
		setTimeout(() => {
			setAnimate('');
		}, 1000);
	}, [handleAnimate]);

	useEffect(() => {
		axiosIns.get('/product-config/category-tree?isActive=true', { withCredentials: false }).then((res) => {
			setCategoryTree(res.data.data);
		});
	}, []);

	const handleScroll = useCallback(() => {
		const offset = window.scrollY;
		if (offset > 30) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
	}, [setScrolled]);

	useEffect(() => {
		setDidMount(true);
		window.addEventListener('scroll', handleScroll);
		return () => setDidMount(false);
	}, [handleScroll]);

	if (!didMount) return null;

	return (
		<>
			<AppHeader title={title} />
			{/* ===== Skip to main content button ===== */}
			<a
				href='#main-content'
				className='whitespace-nowrap absolute z-50 left-4 opacity-90 rounded-md bg-white px-4 py-3 transform -translate-y-40 focus:translate-y-0 transition-all duration-300'
			>
				{t('skip_to_main_content')}
			</a>

			{/* ===== Top Navigation ===== */}
			<TopNav />

			{/* ===== Main Navigation ===== */}
			<nav
				className={`${
					scrolled ? 'bg-white sticky top-0 shadow-md z-50' : 'bg-transparent'
				} w-full z-50 h-20 relative`}
			>
				<div className='app-max-width w-full'>
					<div className={`flex justify-between align-baseline app-x-padding ${styles.mainMenu}`}>
						{/* Hamburger Menu and Mobile Nav */}
						<div className='flex-1 lg:flex-0 lg:hidden'>
							<Menu categoryTree={categoryTree} />
						</div>

						{/* Left Nav */}
						<ul className={`flex-0 lg:flex-1 flex ${styles.leftMenu}`}>
							{categoryTree?.map((c) => (
								<li>
									<Link key={c._id} href={`/category/${c.slug}`}>
										<span>{c.name}</span>
									</Link>
								</li>
							))}
						</ul>

						{/* Haru Logo */}
						<div className='flex-1 flex justify-center items-center cursor-pointer'>
							<div className='w-12 h-auto'>
								<Link href='/'>
									<Image
										className='justify-center'
										src={COMMON_URL.LOGO_DARK}
										alt='Company logo'
										width={80}
										height={80}
										layout='responsive'
									/>
								</Link>
							</div>
						</div>

						{/* Right Nav */}
						<ul className={`flex-1 flex justify-end ${styles.rightMenu}`}>
							<li>
								<SearchForm />
							</li>
							<li>
								<AuthForm>
									<UserIcon />
								</AuthForm>
							</li>
							<li>
								<Link href='/wishlist' passHref>
									{/* <a className="relative" aria-label="Wishlist"> */}
									<button type='button' className='relative' aria-label='Wishlist'>
										<WhistlistIcon />
										{noOfWishlist > 0 && (
											<span
												className={`${animate} absolute text-xs -top-3 -right-3 bg-gray500 text-gray100 py-1 px-2 rounded-full`}
											>
												{noOfWishlist}
											</span>
										)}
									</button>
									{/* </a> */}
								</Link>
							</li>
							<li>
								<CartItem />
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Header;
