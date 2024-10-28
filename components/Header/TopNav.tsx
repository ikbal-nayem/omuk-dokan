import { Menu } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';

import DownArrow from '../../public/icons/DownArrow';
import FacebookLogo from '../../public/icons/FacebookLogo';
import InstagramLogo from '../../public/icons/InstagramLogo';
import styles from './Header.module.css';

type LinkProps = {
	href: string;
	locale: 'en' | 'bn';
	active: boolean;
	children: React.ReactNode;
};

const MyLink: React.FC<LinkProps> = ({ href, locale, children, active, ...rest }) => {
	return (
		<Link
			href={href}
			locale={locale}
			className={`px-2 py-1 text-center ${active ? 'bg-gray200 text-gray500' : 'bg-white text-gray500'}`}
			{...rest}
		>
			{children}
		</Link>
	);
};

const TopNav = () => {
	const router = useRouter();
	const { asPath, locale } = router;
	const t = useTranslations('Navigation');

	return (
		<div className='bg-gray500 text-gray100 hidden lg:block'>
			<div className='flex justify-between app-max-width'>
				<ul className={`flex ${styles.topLeftMenu}`}>
					<li>
						<a href='#' aria-label='Omuk Dokan Facebook Page'>
							<FacebookLogo />
						</a>
					</li>
					<li>
						<a href='#' aria-label='Omuk Dokan Instagram Account'>
							<InstagramLogo />
						</a>
					</li>
					<li>
						<a href='#'>{t('about_us')}</a>
					</li>
					<li>
						<a href='#'>{t('our_policy')}</a>
					</li>
				</ul>
				<ul className={`flex ${styles.topRightMenu}`}>
					<li>
						<Menu as='div' className='relative'>
							<Menu.Button as='a' href='#' className='flex'>
								{locale === 'en' ? t('eng') : t('bn')} <DownArrow />
							</Menu.Button>
							<Menu.Items
								className='flex flex-col w-20 right-0 absolute p-1 border border-gray200 bg-white mt-2 outline-none'
								style={{ zIndex: 9999 }}
							>
								<Menu.Item>
									{({ active }) => (
										<MyLink active={active} href={asPath} locale='en'>
											{t('eng')}
										</MyLink>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<MyLink active={active} href={asPath} locale='bn'>
											{t('bn')}
										</MyLink>
									)}
								</Menu.Item>
							</Menu.Items>
						</Menu>
					</li>
					<li>
						<Menu as='div' className='relative'>
							<Menu.Button as='a' href='#' className='flex'>
								{t('usd')} <DownArrow />
							</Menu.Button>
							<Menu.Items
								className='flex flex-col w-20 right-0 absolute p-1 border border-gray200 bg-white mt-2 outline-none'
								style={{ zIndex: 9999 }}
							>
								<Menu.Item>
									{({ active }) => (
										<a
											href='#'
											className={`${
												active ? 'bg-gray100 text-gray500' : 'bg-white text-gray500'
											} px-2 py-1 text-center focus:outline-none`}
										>
											{t('usd')}
										</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<a
											href='#'
											className={`${
												active ? 'bg-gray100 text-gray500' : 'bg-white text-gray500'
											} px-2 py-1 text-center focus:outline-none`}
										>
											{t('mmk')}
										</a>
									)}
								</Menu.Item>
							</Menu.Items>
						</Menu>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default TopNav;
