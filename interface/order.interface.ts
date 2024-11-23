import { IObject } from "./common.interface";
import { ICatrgoryTree, ICollection, IVariant } from "./product.interface";

export interface IProduct {
	_id: string;
	name: string;
	summary: string;
	description: string;
  category: ICatrgoryTree;
	collections: ICollection[];
	hasVariants: boolean;
	price: number;
	discountPrice: number;
	costPrice: number;
	height: number;
	heightUnit: string;
	width: number;
	widthUnit: string;
	weight: number;
	weightUnit: string;
	options: [
		{
			_id: string;
			id: number;
			name: string;
			values: IObject[];
		}
	];
  selectedVariant: IVariant;
	sku: string;
	stock: number;
	images: string[];
	img1?: string | null;
	img2?: string | null;
	isActive: boolean;
}