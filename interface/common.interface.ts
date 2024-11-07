export interface IMeta {
	currentPageTotal?: number;
	totalRecords?: number;
	totalPages?: number;
	nextPage?: number;
	prevPage?: number;
	page?: number;
	limit?: number;
}
export interface IObject {
	[key: string]: string | number | boolean | any;
}

export interface IReducerAction {
	type: string;
	payload?: any;
}
