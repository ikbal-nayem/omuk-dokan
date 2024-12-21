import { IObject } from '@/interface/common.interface';
import { Dialog, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Buttons/Button';

const AddressInputModal = () => {
	const [open, setOpen] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data: IObject) => {
    console.log(data);
  };

	return (
		<div>
			<Button
				value='New Address'
				onClick={() => setOpen(true)}
				extraClass='bg-transparent text-gray500 hover:text-gray400'
				size='sm'
			/>
			<Transition show={open} as={Fragment}>
				<Dialog
					as='div'
					className='fixed inset-0 z-10 overflow-y-auto'
					style={{ zIndex: 99999 }}
					static
					open={open}
					onClose={() => setOpen(false)}
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
									onClick={() => setOpen(false)}
								>
									&#10005;
								</button>

								<DialogTitle
									as='h3'
									className='text-xl md:text-2xl whitespace-nowrap text-center font-medium'
								>
									Add New Address
								</DialogTitle>
								<form noValidate onSubmit={handleSubmit(onSubmit)} className='mt-4'>
									<label htmlFor='address'>
										Enter Address <span className='text-red'>*</span>
									</label>
									<textarea
										aria-label='Address'
										className={clsx('w-full mt-1 mb-2 border-2 border-gray400 p-2 outline-none', {
											'border-red': errors.address,
											'border-gray400': !errors.address,
										})}
										rows={4}
										{...register('address', { required: 'Address is required' })}
									/>
									<Button value='Save Address' type='submit' />
								</form>
							</div>
						</TransitionChild>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default AddressInputModal;
