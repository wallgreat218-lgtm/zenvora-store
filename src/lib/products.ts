import { products as rawProducts, type Product as RawProduct } from "../data/products";

export type Product = RawProduct;

function premiumImagePaths(slug: string) {
	return {
		image: `/products/premium/${slug}/01.webp`,
		images: [
			`/products/premium/${slug}/01.webp`,
			`/products/premium/${slug}/02.webp`,
			`/products/premium/${slug}/03.webp`
		]
	};
}

export const products: Product[] = rawProducts.map((p) => {
	const paths = premiumImagePaths(p.slug);
	// Always point to the premium unbranded image set.
	return {
		...p,
		image: paths.image,
		images: paths.images
	};
});

export { rawProducts };
