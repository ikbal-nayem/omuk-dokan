import { Dialog, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import { FC, Fragment, useState } from 'react';

import { useAuth } from '@/context/auth.context';
import Button from '../Buttons/Button';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Register from './Register';

type CurrentPage = 'login' | 'register' | 'forgot-password';

type Props = {
	extraClass?: string;
	children: any;
};

const LoginForm: FC<Props> = ({ extraClass, children }) => {
	const auth = useAuth();
	const [currentPage, setCurrentPage] = useState<CurrentPage>('login');
	const [open, setOpen] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [successMsg, setSuccessMsg] = useState('');

	let modalBox: JSX.Element;
	if (auth.user) {
		modalBox = <SuccessModal successMsg={successMsg} />;
	} else {
		if (currentPage === 'login') {
			modalBox = (
				<Login
					onRegister={() => setCurrentPage('register')}
					onForgotPassword={() => setCurrentPage('forgot-password')}
					errorMsg={errorMsg}
					setErrorMsg={setErrorMsg}
					setSuccessMsg={setSuccessMsg}
				/>
			);
		} else if (currentPage === 'register') {
			modalBox = (
				<Register
					onLogin={() => setCurrentPage('login')}
					errorMsg={errorMsg}
				/>
			);
		} else {
			modalBox = (
				<ForgotPassword
					onLogin={() => setCurrentPage('login')}
					errorMsg={errorMsg}
					setErrorMsg={setErrorMsg}
					setSuccessMsg={setSuccessMsg}
				/>
			);
		}
	}

	const closeModal = () => {
		setOpen(false);
		setErrorMsg('');
		setTimeout(() => {
			setSuccessMsg('profile');
		}, 100);
	};

	const openModal = () => {
		setOpen(true);
	};

	return (
		<>
			<div className={`${extraClass}`}>
				<button type='button' onClick={openModal} aria-label='Account' className={`${extraClass}`}>
					{children}
				</button>
			</div>
			<Transition show={open} as={Fragment}>
				<Dialog
					as='div'
					className='fixed inset-0 z-10 overflow-y-auto'
					style={{ zIndex: 99999 }}
					static
					open={open}
					onClose={closeModal}
				>
					<div className='min-h-screen px-4 text-center'>
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
						<span className='inline-block h-screen align-middle' aria-hidden='true'>
							&#8203;
						</span>
						<TransitionChild
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<div className='relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl'>
								<button
									type='button'
									className='absolute right-5 top-2 outline-none focus:outline-none text-2xl'
									onClick={closeModal}
								>
									&#10005;
								</button>
								{modalBox}
							</div>
						</TransitionChild>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

const SuccessModal = ({ successMsg }: { successMsg: string }) => {
	const t = useTranslations('LoginRegister');
	const auth = useAuth();

	const handleLogout = () => {
		auth.logout!();
	};

	return (
		<>
			<DialogTitle
				as='h3'
				className='text-xl md:text-2xl whitespace-nowrap text-center my-8 font-medium leading-6 text-gray-900'
			>
				{successMsg !== '' ? t(successMsg) : t('profile')}
			</DialogTitle>
			<div className='mb-12'>
				<div>
					{t('name')} - {auth.user?.firstName} {auth.user?.lastName}
				</div>
				<div>
					{t('email_address')} - {auth.user?.email}
				</div>
			</div>
			<div className='flex justify-center items-center'>
				<Button value={t('logout')} onClick={handleLogout} />
			</div>
		</>
	);
};

export default LoginForm;
