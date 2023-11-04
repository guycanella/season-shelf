import type { Product } from 'apps/commerce/types.ts'

import ProductShelf, { ProductShelfProps } from "$store/components/product/ProductShelf.tsx";
import GeolocationIsland from "$store/islands/GeolocationIsland.tsx";

export interface ClimateShelfProps extends Omit<ProductShelfProps, 'products'> {
    defaultShelf: Product[] | null
    shelfToRender: Product[] | null
    temperature: number
}

function ClimateShelf ({ defaultShelf, shelfToRender, temperature, ...restOfProps }: ClimateShelfProps) {
    return (
        <>
            <GeolocationIsland temperature={temperature} />
            <div class="shelfToRender">
                <ProductShelf products={shelfToRender} {...restOfProps}  />
            </div>
            <div class="defaultShelf">
                <ProductShelf products={defaultShelf} {...restOfProps} />
            </div>
        </>
    )
}

export default ClimateShelf