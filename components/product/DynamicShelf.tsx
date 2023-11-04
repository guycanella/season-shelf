import type { Product } from 'apps/commerce/types.ts'

import ClimateShelf from "../ui/ProductShelfClimate.tsx";
import ProductShelf, { ProductShelfProps } from "$store/components/product/ProductShelf.tsx";


export interface VariantDatetime {
  type: 'data'
  /**
   * @title Start range at date
   * @format time
   */
  variantStart: string
  /**
   * @title End range at date
   * @format time
   */
  variantEnd: string
  products: Product[] | null
}

export interface VariantClimate {
  type: 'clima'
  /**
   * @title Temperature
   */
  temperature: number
  /**
   * @title Shelf specific
   */
  shelfToRender: Product[] | null
}

export interface VariantSeason {
  type: 'estacao'
  /**
   * @title Estação
   */
  variantActive: 'verão' | 'inverno'
  products: Product[] | null
}

export interface DynamicShelfProps extends Omit<ProductShelfProps, 'products'> {
  /**
   * @title Pratilheira padrão
   * @description Sera exibidos esses produtos para caso não ouver variações validas para exibição
   */
  defaultShelf: Product[]
  variations: VariantDatetime[] | VariantClimate | VariantSeason
}

export default function DynamicShelf({ defaultShelf, variations, ...restOfProps }: DynamicShelfProps) {
  
  console.log('typeof: ', typeof variations)
  if ("temperature" in variations) {
    return (
      <ClimateShelf
        defaultShelf={defaultShelf}
        shelfToRender={variations.shelfToRender}
        temperature={variations.temperature}
        {...restOfProps}
      />
    )
  }

  return <ProductShelf products={defaultShelf} {...restOfProps} />
}
