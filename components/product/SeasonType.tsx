import type { Product } from "apps/commerce/types.ts";
interface ContentArrayProps {
  type: string;
  props: {
    children: string;
    className: string;
    class: string;
  };
}

interface ProductProps {
  type: string;
  variantActive: string;
  products: Product[] | null;
}
interface VariationProps {
  variations: {
    variations: ProductProps[];
    type: string;
    products: Product[] | null;
  };
}

export const SeasonType = (variations: VariationProps) => {

  const getSeasonVariant: string[] = variations.variations.variations.map(
    (item: ProductProps) => item.variantActive,
  );

  const contentArray: ContentArrayProps[] = [];
  let hasAutumn = false;
  let hasWinter = false;
  let hasSpring = false;
  let hasSummer = false;
  getSeasonVariant?.forEach((item: string) => {
    const firstWord = item.split(" ")[0].toLowerCase();
    let content = null;
    switch (firstWord) {
      case "outono":
        console.log("Renderizar produto de outono");
        content = <div className="produto-outono">Produto de Outono</div>;
        hasAutumn = true;
        break;
      case "inverno":
        console.log("Renderizar produto de inverno");
        content = <div className="produto-inverno">Produto de Inverno</div>;
        hasWinter = true;
        break;
      case "primavera":
        console.log("Renderizar produto de primavera");
        content = <div className="produto-primavera">Produto de Primavera</div>;
        hasSpring = true;
        break;
      case "verão":
        console.log("Renderizar produto de verao");
        content = <div className="produto-verao">Produto de Verão</div>;
        hasSummer = true;
        break;
      default:
    }

    if (content) {
      contentArray.push(content as ContentArrayProps);
    }
  });
  if (!hasAutumn || !hasWinter || !hasSpring || !hasSummer) {
    contentArray.push(<div className="produto-padrao">Produto Padrão</div>);
  }

  return (
    <section>
      <div>
        <h1>Conteúdo = {contentArray}</h1>
      </div>
    </section>
  );
};