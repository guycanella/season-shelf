import type { Product } from 'apps/commerce/types.ts'

import { ProductShelfProps } from "$store/components/product/ProductShelf.tsx";
import ClimateShelf from "$store/components/product/ProductShelfClimate.tsx";


interface VariantDatetime {
  type: 'data'
  /**
   * @title Start range at date
   * @format datetime
   */
  variantStart: string
  /**
   * @title End range at date
   * @format datetime
   */
  variantEnd: string
  products: Product[] | null
}

interface VariantClimate {
  type: 'clima'
  /**
   * @title Temperature
   */
  temperature: number
  /**
   * @title Shelf specific
   */
  shelfToRender: Product[] | null
  /**
   * @title Shelf default
   */
  products: Product[] | null
}

interface VariantSeason {
  type: 'estacao'
  /**
   * @title Estação
   */
  variantActive: 'verão' | 'inverno'
  products: Product[] | null
}

export interface DynamicShelfProps extends Omit<ProductShelfProps, 'products'> {
  variations: VariantDatetime | VariantClimate | VariantSeason
}

export default function DynamicShelf({ variations, ...restOfProps }: DynamicShelfProps) {

  if ("temperature" in variations) {
    return (
      <ClimateShelf
        defaultShelf={variations.products}
        shelfToRender={variations.shelfToRender}
        temperature={variations.temperature}
        {...restOfProps}
      />
    )
  }

  return <div>teste</div>
}
