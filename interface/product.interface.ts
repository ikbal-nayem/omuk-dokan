import { IObject } from './common.interface';

export interface ICatrgoryTree {
	_id: string;
	name: string;
	parent?: string;
	slug: string;
	description: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	image: '';
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

export interface IProduct {
	_id: string;
	name: string;
	description: string;
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
			id: number | string;
			name: string;
			_id: string;
			values: IObject[];
		}
	];
	variants: IObject[];
	sku: string;
	trackStock: boolean;
	stock: number;
	category: ICatrgoryTree;
	collections: ICollection[];
	tags: string[];
	images: string[];
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}
