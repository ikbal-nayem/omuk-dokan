import { IObject } from "./common.interface";

export interface ICatrgory {
	_id: string;
	name: string;
	parent?: string;
	slug: string;
	description: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	image: string;
}

export interface ICatrgoryTree extends ICatrgory {
	subcategories: Array<ICatrgoryTree>;
}

export interface ICollection {
	_id: string;
	name: string;
	description: string;
	image: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	slug: string;
}

interface IVariantOption {
	key: string;
	value: string;
}

export interface IVariant {
	_id?: string;
	options: IVariantOption[];
	sku: string;
	stock: number;
	price: number;
	discountPrice?: number;
	costPrice?: number;
	image?: string;
	isActive?: boolean;
	isDeleted?: boolean;
}

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
	variants: IVariant[];
	sku: string;
	trackStock: boolean;
	stock: number;
	tags: string[];
	images: string[];
	img1?: string | null;
	img2?: string | null;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}
