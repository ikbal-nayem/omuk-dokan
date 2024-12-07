import { DialogTitle } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { IObject } from '@/interface/common.interface';
import { isValidEmail, isValidMobileNo } from '@/utils/check-validation';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/auth.context';
import Button from '../Buttons/Button';
import Input from '../Input/Input';

type Props = {
	onLogin: () => void;
	errorMsg: string;
	setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
	setSuccessMsg: React.Dispatch<React.SetStateAction<string>>;
};

const Register: React.FC<Props> = ({ onLogin, errorMsg, setErrorMsg, setSuccessMsg }) => {
	const auth = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const t = useTranslations('LoginRegister');

	// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	const regResponse = await auth.register!(email, name, password, address, phone);
	// 	if (regResponse.success) {
	// 		setSuccessMsg('register_successful');
	// 	} else {
	// 		if (regResponse.message === 'alreadyExists') {
	// 			setErrorMsg('email_already_exists');
	// 		} else {
	// 			setErrorMsg('error_occurs');
	// 		}
	// 	}
	// };

	const onSubmit = (data: IObject) => {
		console.log(data);
	};

	// auth.user ? console.log(auth.user) : console.log('No User');

	return (
		<>
			<DialogTitle as='h3' className='text-4xl text-center my-8 font-medium leading-6 text-gray-900'>
				{t('register')}
			</DialogTitle>
			<form onSubmit={handleSubmit(onSubmit)} className='mt-2' noValidate>
				<Input
					type='name'
					placeholder={`First Name *`}
					className='mb-4'
					autoFocus
					required
					registerProperty={{ ...register('firstName', { required: 'First name is required' }) }}
					color={errors.firstName ? 'danger' : 'primary'}
					message={errors.firstName?.message as string}
				/>
				<Input
					type='name'
					placeholder={`Last Name`}
					className='mb-4'
					registerProperty={{ ...register('lastName') }}
				/>
				<Input
					type='email'
					placeholder={`${t('email_address')} *`}
					required
					className='mb-4'
					registerProperty={{
						...register('email', { required: 'Email is required', validate: isValidEmail }),
					}}
					color={errors.email ? 'danger' : 'primary'}
					message={errors.email?.message as string}
				/>
				<Input
					type='phone'
					placeholder={`${t('phone')} *`}
					className='mb-4'
					registerProperty={{
						...register('mobile', { required: 'Mobile is required', validate: isValidMobileNo }),
					}}
					color={errors.mobile ? 'danger' : 'primary'}
					message={errors.mobile?.message as string}
				/>
				<Input
					type='password'
					placeholder={`${t('password')} *`}
					required
					className='mb-4'
					registerProperty={{ ...register('password', { required: 'Password is required' }) }}
					color={errors.password ? 'danger' : 'primary'}
					message={errors.password?.message as string}
				/>
				{errorMsg !== '' && <div className='text-red text-sm mb-2 whitespace-nowrap'>{t(errorMsg)}</div>}
				<Button type='submit' value={t('register')} extraClass='w-full text-center text-xl mb-4' size='lg' />
				<div className='text-center text-gray400'>
					{t('already_member')}{' '}
					<span
						onClick={onLogin}
						className='text-gray500 focus:outline-none focus:underline cursor-pointer hover:underline'
					>
						{t('login')}
					</span>
				</div>
			</form>
		</>
	);
};

export default Register;
