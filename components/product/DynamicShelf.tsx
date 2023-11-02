import type { Product } from 'apps/commerce/types.ts'

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
   * @title Start range at climate
   */
  variantStart: number
  /**
   * @title End range at climate
   */
  variantEnd: number
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

export interface Props {
  variations: VariantDatetime[] | VariantClimate[] | VariantSeason[]
}

export default function DaynamicShelf(props: Props) {
  return <div>teste</div>
}
