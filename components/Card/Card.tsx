import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';

import { useCart } from '../../context/cart/CartProvider';
import { useWishlist } from '../../context/wishlist/WishlistProvider';
import { IProduct } from '../../interface/product.interface';
import Heart from '../../public/icons/Heart';
import HeartSolid from '../../public/icons/HeartSolid';
import { COMMON_URL, makePreviewURL } from '../../utils/util';
import styles from './Card.module.css';

type Props = {
	item: IProduct;
};

const Card: FC<Props> = ({ item }) => {
	const t = useTranslations('CartWishlist');
	const { wishlist, addToWishlist, deleteWishlistItem } = useWishlist();
	const { addOne } = useCart();
	const [isHovered, setIsHovered] = useState(false);
	const [isWLHovered, setIsWLHovered] = useState(false);

	const itemLink = `/products/${encodeURIComponent(item?._id)}`;

	const alreadyWishlisted = wishlist.filter((wItem) => wItem._id === item?._id).length > 0;

	const handleWishlist = () => {
		alreadyWishlisted ? deleteWishlistItem!(item) : addToWishlist!(item);
	};

	return (
		<div className={styles.card}>
			<div className={styles.imageContainer}>
				<Link href={itemLink}>
					<span tabIndex={-1} onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
						<Image
							className='transition-transform transform hover:scale-110 duration-1000'
							src={
								(isHovered
									? item?.img2 && makePreviewURL(item?.img2 as string)
									: item?.img1 && makePreviewURL(item?.img1 as string)) || COMMON_URL.DUMMY_URL
							}
							alt={item?.name}
							width={230}
							height={300}
							layout='responsive'
							onError={() => COMMON_URL.ERROR_IMAGE}
						/>
					</span>
				</Link>
				<button
					type='button'
					className='absolute top-2 right-2 p-1 rounded-full'
					aria-label='Wishlist'
					onClick={handleWishlist}
					onMouseOver={() => setIsWLHovered(true)}
					onMouseLeave={() => setIsWLHovered(false)}
				>
					{isWLHovered || alreadyWishlisted ? <HeartSolid /> : <Heart />}
				</button>
				<button type='button' onClick={() => addOne!(item)} className={styles.addBtn}>
					{t('add_to_cart')}
				</button>
			</div>

			<div className='content'>
				<Link href={itemLink}>
					<span className={styles.itemName}>{item?.name}</span>
				</Link>
				<div className='text-gray400'>৳ {item?.price}</div>
				<button type='button' onClick={() => addOne!(item)} className='uppercase font-bold text-sm sm:hidden'>
					{t('add_to_cart')}
				</button>
			</div>
		</div>
	);
};

export default Card;
