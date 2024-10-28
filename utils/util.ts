export const COMMON_URL = {
	DUMMY_URL: 'https://i.pinimg.com/736x/42/28/a7/4228a706f1342c2a887c12bf1ca8576c.jpg',
	ERROR_IMAGE: 'https://i.pinimg.com/736x/3e/15/6c/3e156c469fa0aeaed8bfdaa819454edd.jpg'
};

export const makePreviewURL = (url: string) => {
	if (!url || url.includes('http')) return url;

	return !!url ? process.env.NEXT_PUBLIC_FILE_BASE_URL + '/' + url : '';
};
