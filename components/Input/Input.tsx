import clsx from 'clsx';
import { FC, FormEvent } from 'react';

type Props = {
	type?: string;
	name?: string;
	placeholder?: string;
	className?: string;
	required?: boolean;
	label?: string;
	onChange?: (e: FormEvent<HTMLInputElement>) => void;
	value?: string;
	readOnly?: boolean;
	autoFocus?: boolean;
	message?: string;
	color?: 'primary' | 'danger' | 'success' | 'warning';
	registerProperty?: any;
};

const Input: FC<Props> = ({
	type = 'text',
	name,
	placeholder,
	className,
	required = false,
	label = '',
	onChange,
	value,
	readOnly = false,
	autoFocus,
	message,
	color = 'primary',
	registerProperty,
}) => (
	<div className={clsx(className)}>
		<input
			type={type}
			readOnly={readOnly}
			className={clsx(`border-2 py-2 px-4 outline-none w-full`, {
				'border-gray300 focus:border-gray500': color === 'primary',
				'border-red': color === 'danger',
				'border-green': color === 'success',
				'border-yellow': color === 'warning',
			})}
			name={name}
			placeholder={placeholder}
			required={required}
			onChange={onChange}
			value={value}
			aria-label={label}
			autoFocus={autoFocus}
			{...registerProperty}
		/>
		<small
			className={clsx({
				'text-gray400': color === 'primary',
				'text-red': color === 'danger',
				'text-green': color === 'success',
				'text-yellow': color === 'warning',
			})}
		>
			{message}
		</small>
	</div>
);

export default Input;
