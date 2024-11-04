import { queryOptions } from '@tanstack/react-query';
import axiosIns from '../services/api/axios.config';

export function QCategoryTree() {
	return queryOptions({
		queryKey: ['category-tree'],
		queryFn: async () => {
			return await axiosIns.get('/product-config/category-tree?isActive=true');
		},
		select: (data) => data?.data,
	});
}
