import { DialogTitle } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { useAuth } from '@/context/auth.context';
import { IObject } from '@/interface/common.interface';
import nProgress from 'nprogress';
import { useForm } from 'react-hook-form';
import axiosIns from 'services/api/axios.config';
import { toast } from 'services/utils/toastr.service';
import Button from '../Buttons/Button';
import Input from '../Input/Input';

type Props = {
	onRegister: () => void;
	onForgotPassword: () => void;
	errorMsg: string;
	setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
	setSuccessMsg: React.Dispatch<React.SetStateAction<string>>;
};

const Login: React.FC<Props> = ({ onRegister, onForgotPassword, errorMsg }) => {
	const [isLoading, setLoading] = useState(false);
	const { setAuthUser } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const t = useTranslations('LoginRegister');

	const onSubmit = (data: IObject) => {
		nProgress.start();
		setLoading(true);
		axiosIns
			.post('/user/login', data)
			.then((res: any) => {
				toast.success('Successfully logged in');
				setAuthUser(res.data);
			})
			.catch((err) => toast.error(err.message))
			.finally(() => {
				nProgress.done();
				setLoading(false);
			});
	};

	return (
		<>
			<DialogTitle as='h3' className='text-4xl text-center my-8 font-medium leading-6 text-gray-900'>
				{t('login')}
			</DialogTitle>
			<form onSubmit={handleSubmit(onSubmit)} className='mt-2'>
				<Input
					type='email'
					placeholder={`${t('email_address')} *`}
					required
					className='mb-4'
					autoFocus
					registerProperty={{ ...register('email', { required: 'Please provide email or mobile number' }) }}
					color={errors.email ? 'danger' : 'primary'}
					message={errors.email?.message as string}
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
				{errorMsg !== '' && <div className='text-red text-sm mb-4 whitespace-nowrap'>{t(errorMsg)}</div>}
				<div className='flex justify-between mb-4'>
					<div className='flex items-center text-gray400 focus:outline-none'>
						<input type='checkbox' id='remember' className='w-4 h-4 mb-0 mr-2' {...register('remember')} />
						<label htmlFor='remember' className='text-sm'>
							{t('remember_me')}
						</label>
					</div>
					<span
						onClick={onForgotPassword}
						className='text-gray400 text-sm hover:text-gray500 focus:outline-none focus:text-gray500 cursor-pointer'
					>
						{t('forgot_password')}
					</span>
				</div>
				<Button
					type='submit'
					value={t('login')}
					extraClass='w-full text-center text-xl mb-4'
					disabled={isLoading}
					size='lg'
				/>
				<div className='text-center text-gray400'>
					{t('not_member')}{' '}
					<span
						onClick={onRegister}
						className='text-gray500 focus:outline-none focus:underline hover:underline cursor-pointer'
					>
						{t('register')}
					</span>
				</div>
			</form>
		</>
	);
};

export default Login;
