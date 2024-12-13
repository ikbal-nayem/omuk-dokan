export type IUser = {
	firstName: string;
	lastName: string;
	email: string;
	mobile: string;
	isAdmin: boolean;
	isSuperAdmin: boolean;
	roles: Array<[]>;
	isDeleted: boolean;
	isActive: boolean;
	_id: string;
	createdAt: string;
	updatedAt: string;
};
