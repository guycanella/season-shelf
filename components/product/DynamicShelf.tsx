import type { Product } from "apps/commerce/types.ts";
import { SeasonType } from './SeasonType.tsx'

interface VariantDatetime {
  type: "data";
  /**
   * @title Start range at date
   * @format datetime
   */
  variantStart: string;
  /**
   * @title End range at date
   * @format datetime
   */
  variantEnd: string;
  products: Product[] | null;
}

interface VariantClimate {
  type: "clima";
  /**
   * @title Start range at climate
   */
  variantStart: number;
  /**
   * @title End range at climate
   */
  variantEnd: number;
  products: Product[] | null;
}

interface VariantSeason {
  type: "estacao";
  /**
   * @title Estação
   */
  variantActive:
    | "outono - 21 de março a 21 de junho"
    | "inverno - 21 de junho a 23 de setembro"
    | "primavera - 23 de setembro a 21 de dezembro"
    | "verão - 21 de dezembro a 21 de março";

  products: Product[] | null;
}
export interface Props {
  variations: VariantDatetime[] | VariantClimate[] | VariantSeason[];
  type: "prateleira padrao";
    /**
   * @title Prateleira padrão
   * @description A prateleira será exibida quando não houver variações válidas
   */
    products: Product[] | null;
}

export default function DynamicShelf(props: Props) {
  console.log('PROPS ->',props);
  return (
    <>
      <section>
          <SeasonType variations={props}/>
      </section>
    </>
  );
}