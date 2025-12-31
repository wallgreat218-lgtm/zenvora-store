import "server-only";

import fs from "node:fs";
import path from "node:path";
import { products as rawProducts, type Product as RawProduct } from "../data/products";

export type Product = RawProduct;

function premiumPaths(slug: string) {
	return {
		image: `/products/premium/${slug}/01.webp`,
		images: [
			`/products/premium/${slug}/01.webp`,
			`/products/premium/${slug}/02.webp`,
			`/products/premium/${slug}/03.webp`
		]
	};
}

function placeholderPath(slug: string) {
	return `/products/${slug}.svg`;
}

function premiumExists(slug: string) {
	const p = path.join(process.cwd(), "public", "products", "premium", slug, "01.webp");
	return fs.existsSync(p);
}

export const products: Product[] = rawProducts.map((p) => {
	if (premiumExists(p.slug)) {
		const paths = premiumPaths(p.slug);
		return { ...p, image: paths.image, images: paths.images };
	}

	const placeholder = placeholderPath(p.slug);
	return { ...p, image: placeholder, images: [placeholder, placeholder, placeholder] };
});

export { rawProducts };
