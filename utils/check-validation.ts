import { IObject } from '../interface/common.interface';

export const isNull = (val: string | number | boolean | null | undefined | Array<any> | IObject) => {
	return (
		val === null ||
		val === undefined ||
		val === '' ||
		val === 'null' ||
		val === 'undefined' ||
		(val instanceof Object && Object.keys(val || {}).length === 0) ||
		(Array.isArray(val) && val?.length === 0)
	);
};

export const isValidEmail = (e: string) => {
	const patt = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return patt.test(e) ? true : 'Please provide a valid email address';
};

export const isValidMobileNo = (e: string) => {
	const patt = /^(?:(?:\+|00)88|01)?\d{11}$/;
	return patt.test(e) ? true : 'Please provide a valid mobile No.';
};
