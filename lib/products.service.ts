/**
 * PRODUCTS
 */
export async function getProducts(url: string) {
	console.log('products')
    return await fetch(`${ url }/payments/products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}
