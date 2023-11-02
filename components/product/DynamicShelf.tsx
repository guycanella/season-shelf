import type { Product } from "apps/commerce/types.ts";

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
}

export default function DynamicShelf(props: Props) {
  const currentYear = new Date().getFullYear();
  const currentDate = new Date()

  // Seasons date
const autumnSeason = new Date(currentDate.getFullYear(), 2,21)
const winterSeason = new Date(currentDate.getFullYear(), 5,21)
const springSeason = new Date(currentDate.getFullYear(), 8,23)
const summerSeason = new Date(currentDate.getFullYear(), 11,21)

// Check seasons
function checkSeason(date:Date){
  if(date >= autumnSeason && date < winterSeason){
    return "outono"
  } else if (date >= winterSeason && date < springSeason){
    return "inverno"
  } else if (date >= springSeason && date < summerSeason) {
    return "primavera"
  } else {
    return "verão"
  }
}

// Check range
function checkRange (date:Date, start:Date, end:Date){
  return date >= start && date < end
}

// Find seasons
function findSeason(date:Date, seasonName:string, start:Date, end:Date){
  const season = checkSeason(date)
  const isSeason = season === seasonName
  const isRange = checkRange(date, start, end)
  return isSeason && isRange
}

if(findSeason(currentDate, "outono", autumnSeason, winterSeason)){
  console.log('Estamos no outono')
} else {
  console.log('Não estamos no outono, fora do intervalo')
}

if(findSeason(currentDate, "inverno", winterSeason, springSeason)){
  console.log('Estamos no inverno')
} else {
  console.log('Não estamos no inverno, fora do intervalo')
}

if(findSeason(currentDate, "primavera", springSeason, summerSeason)){
  console.log('Estamos no primavera')
} else {
  console.log('Não estamos no primavera, fora do intervalo')
}

if(findSeason(currentDate, "verão", summerSeason, autumnSeason)){
  console.log('Estamos no verão')
} else {
  console.log('Não estamos no verão, fora do intervalo')
}

  


  console.log(props);
  return (
    <>
      <section>
        <div>
          <h1>Estações do ano {currentYear}</h1>
        </div>
      </section>
    </>
  );
}