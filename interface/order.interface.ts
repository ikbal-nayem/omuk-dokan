import { IProduct, IVariant } from './product.interface';

export interface ICartItems extends IProduct {
	qty: number;
	selectedVariant?: IVariant;
}
