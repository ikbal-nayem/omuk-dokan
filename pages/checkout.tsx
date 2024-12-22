import AddressDelete from '@/components/Address/delete-address';
import AddressInputModal from '@/components/Address/input-modal';
import AuthForm from '@/components/Auth/AuthForm';
import Button from '@/components/Buttons/Button';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { useApp } from '@/context/App/app.context';
import { useAuth } from '@/context/auth.context';
import { useCart } from '@/context/cart/CartProvider';
import { ICartItems, IOrderDetails, IOrderPayload, IPaymentOption } from '@/interface/order.interface';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { deliveryOptions, paymentOptions } from '../components/Util/temp-data';

const ShoppingCart = () => {
	const t = useTranslations('CartWishlist');
	const a = useTranslations('LoginRegister');
	const { cart, clearCart } = useCart();
	const { isLoggedIn, user, isLoading } = useAuth();
	const { deliveryOption, dispatchApp } = useApp();

	const [paymentMethod, setPaymentMethod] = useState<IPaymentOption>(
		paymentOptions.find((op) => op.isDefault)!
	);
	const [selectedAddress, setAddress] = useState<string>(
		user?.address?.find((op) => op.isDefault)!.address || ''
	);
	const [sendEmail, setSendEmail] = useState(false);

	const [isOrdering, setIsOrdering] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [completedOrder, setCompletedOrder] = useState<IOrderDetails | null>(null);
	const [orderError, setOrderError] = useState('');

	useEffect(() => {
		if (!isLoggedIn) return;
		let address = user?.address?.find((op) => op.address === selectedAddress)!.address;
		if (!address) address = user?.address?.find((op) => op.isDefault)!.address;
		if (!address) address = user?.address?.[0]?.address || '';
		setAddress(address);
	}, [user?.address]);

	let subtotal: number | string = 0;

	subtotal = cart
		.reduce(
			(accumulator: number, currentItem: ICartItems) => accumulator + currentItem.price * currentItem!.qty!,
			0
		)
		.toFixed(2);

	const grandTotal = parseInt(subtotal) + deliveryOption.charge;

	const onOrderPlace = () => {
		const orderData: IOrderPayload = {
			items: cart,
			deliveryAddress: selectedAddress,
			deliveryOption: deliveryOption,
			discount: 0,
			paymentOption: paymentMethod,
			subTotal: parseInt(subtotal),
			shippingCost: deliveryOption.charge,
			total: grandTotal,
		};
		console.log(orderData);
	};

	return (
		<div>
			{/* ===== Head Section ===== */}
			<Header title={`Checkout - OD`} />

			<main id='main-content'>
				{/* ===== Heading & Continue Shopping */}
				<div className='app-max-width px-4 sm:px-8 md:px-20 w-full border-t-2 border-gray100'>
					<h1 className='text-2xl sm:text-4xl text-center sm:text-left mt-6 mb-2 animatee__animated animate__bounce'>
						{t('checkout')}
					</h1>
				</div>

				{/* ===== Form Section ===== */}
				{!completedOrder ? (
					<div className='app-max-width px-4 sm:px-8 md:px-20 mb-14 flex flex-col lg:flex-row'>
						<div className='h-full w-full lg:w-7/12 mr-8'>
							{errorMsg !== '' && <span className='text-red text-sm font-semibold'>- {t(errorMsg)}</span>}

							{!isLoggedIn ? (
								isLoading ? (
									<div>Loading user information...</div>
								) : (
									<div className='p-4 border border-gray300 my-4'>
										<p className='text-gray-200 text-center mb-5 font-bold'>
											Please login to complete your order.
										</p>
										<AuthForm extraClass='w-full bg-gray500 text-white font-bold py-1'>{a('login')}</AuthForm>
									</div>
								)
							) : (
								<div>
									<div className='my-4'>
										<div>
											<span className='text-gray400'>{t('name')}</span>
											<br />
											<span className='text-lg'>
												{user?.firstName} {user?.lastName}
											</span>
										</div>
										<div className='mt-3'>
											<span className='text-gray400'>Email</span>
											<br />
											<span className='text-lg'>{user?.email}</span>
										</div>
										<div className='mt-3'>
											<span className='text-gray400'>Mobile</span>
											<br />
											<span className='text-lg'>{user?.mobile || '-'}</span>
										</div>
										<div className='mt-3'>
											<span className='text-gray400'>Address</span>
											{user?.address?.map((add, idx) => (
												<div
													className='border border-gray200 rounded-lg p-2 flex justify-between items-center mb-3'
													key={idx}
												>
													<div className='flex items-center space-x-2'>
														<input
															type='radio'
															className='h-4 w-4'
															value={add?.address}
															id={idx?.toString()}
															checked={add?.address === selectedAddress}
															onChange={() => setAddress(add?.address)}
														/>
														<label htmlFor={idx?.toString()} className='cursor-pointer'>
															{add?.address}
														</label>
														{add?.isDefault && (
															<span className='rounded-xl bg-gray200 px-2 text-gray400 text-sm'>Default</span>
														)}
													</div>
													<div className='flex space-x-2'>
														{/* <EditIcon extraClass='w-4 h-4 cursor-pointer' /> */}
														<AddressDelete address={add} />
													</div>
												</div>
											))}
										</div>
									</div>
									<AddressInputModal />
								</div>
							)}
						</div>
						<div className='h-full w-full lg:w-5/12 mt-10 lg:mt-4'>
							{/* Cart Totals */}
							<div className='border border-gray500 p-6 divide-y-2 divide-gray200'>
								<div className='flex justify-between'>
									<span className='text-base uppercase mb-3'>{t('product')}</span>
									<span className='text-base uppercase mb-3'>{t('subtotal')}</span>
								</div>

								<div className='pt-2'>
									{cart.map((item) => (
										<div className='flex justify-between mb-2' key={item._id}>
											<span className='text-base font-medium'>
												{item.name} <span className='text-gray400'>x {item.qty}</span>
											</span>
											<span className='text-base'>৳ {(item.price * item!.qty!).toFixed(2)}</span>
										</div>
									))}
								</div>

								<div className='py-3 flex justify-between'>
									<span className='uppercase'>{t('subtotal')}</span>
									<span>৳ {subtotal}</span>
								</div>

								<div className='py-3'>
									<span className='uppercase'>{t('delivery')}</span>
									<div className='mt-3 space-y-2'>
										{deliveryOptions.map((option) => (
											<div className='flex justify-between' key={option.code}>
												<div className='flex items-center space-x-2'>
													<input
														type='radio'
														className='h-4 w-4'
														name={option.code}
														value={option?.code}
														id={option?.code}
														checked={deliveryOption.code === option.code}
														onChange={() => dispatchApp({ type: 'SET_DELIVERY_OPTION', payload: option })}
													/>
													<label htmlFor={option.code} className='cursor-pointer'>
														{option.title}
													</label>
												</div>
												<span>{option?.charge || 0}</span>
											</div>
										))}
									</div>
								</div>

								<div>
									<div className='flex justify-between py-3'>
										<span>{t('grand_total')}</span>
										<span>৳ {grandTotal?.toFixed(2)}</span>
									</div>

									<div className='grid gap-4 mt-2 mb-4'>
										{paymentOptions.map((option) => (
											<label
												htmlFor={option.code}
												className='relative flex flex-col bg-white p-5 rounded-lg shadow-md border border-gray300 cursor-pointer'
											>
												<span className='font-semibold text-gray-500 text-base leading-tight capitalize'>
													{option.title}
												</span>
												{/* <span className='text-gray400 text-sm mt-1'>{t('bank_transfer_desc')}</span> */}
												<input
													type='radio'
													name='plan'
													id={option.code}
													value={option.code}
													className='absolute h-0 w-0 appearance-none'
													onChange={() => setPaymentMethod(option)}
												/>
												<span
													aria-hidden='true'
													className={`${
														paymentMethod?.code === option.code ? 'block' : 'hidden'
													} absolute inset-0 border-2 border-gray500 bg-opacity-10 rounded-lg`}
												>
													<span className='absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-gray100'>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															viewBox='0 0 20 20'
															fill='currentColor'
															className='h-5 w-5 text-green-600'
														>
															<path
																fillRule='evenodd'
																d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
																clipRule='evenodd'
															/>
														</svg>
													</span>
												</span>
											</label>
										))}
									</div>

									<div className='my-8'>
										<div className='relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in'>
											<input
												type='checkbox'
												name='send-email-toggle'
												id='send-email-toggle'
												checked={sendEmail}
												onChange={() => setSendEmail(!sendEmail)}
												className='toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray300 appearance-none cursor-pointer'
											/>
											<label
												htmlFor='send-email-toggle'
												className='toggle-label block overflow-hidden h-6 rounded-full bg-gray300 cursor-pointer'
											></label>
										</div>
										<label htmlFor='send-email-toggle' className='text-xs text-gray-700'>
											{t('send_order_email')}
										</label>
									</div>
								</div>

								<Button
									value={t('place_order')}
									size='xl'
									extraClass={`w-full`}
									onClick={onOrderPlace}
									disabled={!isLoggedIn}
								/>
							</div>

							{orderError !== '' && <span className='text-red text-sm font-semibold'>- {orderError}</span>}
						</div>
					</div>
				) : (
					<div className='app-max-width px-4 sm:px-8 md:px-20 mb-14 mt-6'>
						<div className='text-gray400 text-base'>{t('thank_you_note')}</div>
						<div className='flex flex-col md:flex-row'>
							<div className='h-full w-full md:w-1/2 mt-2 lg:mt-4'>
								<div className='border border-gray500 p-6 divide-y-2 divide-gray200'>
									<div className='flex justify-between'>
										<span className='text-base uppercase mb-3'>{t('order_id')}</span>
										<span className='text-base uppercase mb-3'>{completedOrder.orderNo}</span>
									</div>

									<div className='pt-2'>
										<div className='flex justify-between mb-2'>
											<span className='text-base'>{t('email_address')}</span>
											<span className='text-base'>{user?.email}</span>
										</div>
										<div className='flex justify-between mb-2'>
											<span className='text-base'>{t('order_date')}</span>
											<span className='text-base'>
												{new Date(completedOrder.createdAt).toLocaleDateString()}
											</span>
										</div>
										<div className='flex justify-between mb-2'>
											<span className='text-base'>{t('delivery_date')}</span>
											<span className='text-base'>
												{new Date(completedOrder.deliveryDate).toLocaleDateString()}
											</span>
										</div>
									</div>

									<div className='py-3'>
										<div className='flex justify-between mb-2'>
											<span className=''>{t('payment_method')}</span>
											<span>{completedOrder.paymentOption?.title}</span>
										</div>
										<div className='flex justify-between'>
											<span className=''>{t('delivery_method')}</span>
											<span>{completedOrder.deliveryOption?.title}</span>
										</div>
									</div>

									<div className='pt-2 flex justify-between mb-2'>
										<span className='text-base uppercase'>{t('total')}</span>
										<span className='text-base'>৳ {completedOrder.total}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</main>

			{/* ===== Footer Section ===== */}
			<Footer />
		</div>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			messages: (await import(`../locales/${locale}.json`)).default,
		},
	};
};

export default ShoppingCart;
