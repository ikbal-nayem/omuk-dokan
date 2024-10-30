export const COMMON_URL = {
	DUMMY_URL: '/dummy-product.png',
	ERROR_IMAGE: 'https://i.pinimg.com/736x/3e/15/6c/3e156c469fa0aeaed8bfdaa819454edd.jpg',
	LOGO: '/logo.png',
	LOGO_DARK: '/logo-dark.png',
};

export const toCapitalized = (str: string) => {
	if (!str) return '';
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const makePreviewURL = (url: string) => {
	if (!url || url.includes('http')) return url;
	return !!url ? process.env.NEXT_PUBLIC_FILE_BASE_URL + '/' + url : '';
};
