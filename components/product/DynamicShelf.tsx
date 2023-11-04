import type { Product } from 'apps/commerce/types.ts'

import ProductShelf, { ProductShelfProps } from "$store/components/product/ProductShelf.tsx";
import ClimateShelf from "$store/components/product/ProductShelfClimate.tsx";
import TimeShelf from "$store/components/product/TimeShelf.tsx";


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
  variations: VariantDatetime[] | VariantClimate | VariantSeason[]
}

export default function DynamicShelf({ defaultShelf, variations, ...restOfProps }: DynamicShelfProps) {
  
  if (Array.isArray(variations)) {
    const timeShelf = variations.filter(variant => variant.type === 'data') as VariantDatetime[]
    const seasonShelf = variations.filter(variant => variant.type === 'estacao') as VariantSeason[]

    if (timeShelf.length) {
      return <TimeShelf defaultShelf={defaultShelf} variations={timeShelf} {...restOfProps} />
    }

    // if (seasonShelf.length) {
    //   return <TimeShelf />
    // }
  }

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
