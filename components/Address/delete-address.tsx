import { useAuth } from '@/context/auth.context';
import { IUserAddress } from '@/interface/auth.interface';
import { Dialog, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import DeleteIcon from 'public/icons/Delete';
import { Fragment, useState } from 'react';
import axiosIns from 'services/api/axios.config';
import { toast } from 'services/utils/toastr.service';
import Button from '../Buttons/Button';
import nProgress from 'nprogress';

const AddressDelete = ({ address }: { address: IUserAddress }) => {
	const [open, setOpen] = useState<boolean>(false);
	const [isDeleting, setDeleting] = useState<boolean>(false);
	const { setUserAddress } = useAuth();

	const onSubmit = () => {
		nProgress.start();
		setDeleting(true);
		axiosIns
			.delete('/user/address/' + address?._id)
			.then((resp) => {
				toast.success(resp?.data?.message);
				setUserAddress(resp?.data?.data?.address);
				setOpen(false);
			})
			.catch((err) => toast.error(err?.message))
			.finally(() => {
				setDeleting(false);
				nProgress.done();
			});
	};

	return (
		<div>
			<span onClick={() => setOpen(true)}>
				<DeleteIcon extraClass='w-4 h-4 cursor-pointer text-red' />
			</span>
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
									Delete Address
								</DialogTitle>
								<div className='text-center mt-4'>
									<p>
										Are you sure you want to delete this address?
										<br />
										<b>"{address?.address}"</b>
									</p>
									<Button
										value='Yes, Delete'
										extraClass='border-red bg-red text-white mt-5'
										onClick={onSubmit}
										disabled={isDeleting}
									/>
								</div>
							</div>
						</TransitionChild>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default AddressDelete;
