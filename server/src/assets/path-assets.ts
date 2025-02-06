import path from 'node:path';

interface PathAssets {
	readonly images: string,
	readonly logos: string,
	readonly html: string,
	readonly views: string,
}

export const pathAssets: PathAssets = {
	images: path.join(__dirname, 'images'),
	logos: path.join(__dirname, 'images/logos'),
	html: path.join(__dirname, 'html'),
	views: path.join(__dirname, 'views'),
};
