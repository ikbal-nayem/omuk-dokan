import { IObject } from './common.interface';
import { IProduct, IVariant } from './product.interface';

export interface ICartItems extends IProduct {
	qty: number;
	selectedVariant?: IVariant;
}

export type IPaymentOption = {
	code: string;
	title: string;
	img: string;
};

export type IOrderPayload = {
	items: ICartItems[];
	subTotal: number;
	shippingCost: number;
	discount: number;
	total: number;
	deliveryAddress: any;
	deliveryOption: IObject;
	paymentOption: IPaymentOption;
};

export interface IOrderDetails extends IOrderPayload {
	_id: string;
	orderNo: string;
	status: string;
	user: string;
	paymentStatus: string;
	paymentInfo: any;
	deliveryStatus: string;
	deliveryDate: string;
	createdAt: string;
	updatedAt: string;
}
