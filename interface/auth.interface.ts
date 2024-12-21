export type IUser = {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	mobile: string;
	address: {
		_id?: string;
		isDefault: boolean;
		address: string;
	}[];
	isAdmin: boolean;
	isSuperAdmin: boolean;
	roles: string[];
	isDeleted: boolean;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};
