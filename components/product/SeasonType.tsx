export const SeasonType = (variations: any) => {
  const currentDate = new Date();

  // Seasons date
  const autumnSeason = new Date(currentDate.getFullYear(), 2, 21);
  const winterSeason = new Date(currentDate.getFullYear(), 5, 21);
  const springSeason = new Date(currentDate.getFullYear(), 8, 23);
  const summerSeason = new Date(currentDate.getFullYear(), 11, 21);

  // Check seasons
  function checkSeason(date: Date) {
    if (date >= autumnSeason && date < winterSeason) {
      return "outono";
    } else if (date >= winterSeason && date < springSeason) {
      return "inverno";
    } else if (date >= springSeason && date < summerSeason) {
      return "primavera";
    } else {
      return "verão";
    }
  }

  // Check range
  function checkRange(date: Date, start: Date, end: Date) {
    return date >= start && date < end;
  }

  // Find seasons
  function findSeason(date: Date, seasonName: string, start: Date, end: Date) {
    const season = checkSeason(date);
    const isSeason = season === seasonName;
    const isRange = checkRange(date, start, end);
    return isSeason && isRange;
  }

  if (findSeason(currentDate, "outono", autumnSeason, winterSeason)) {
    console.log("Estamos no outono");
  } else {
    console.log("Não estamos no outono, fora do intervalo");
  }

  if (findSeason(currentDate, "inverno", winterSeason, springSeason)) {
    console.log("Estamos no inverno");
  } else {
    console.log("Não estamos no inverno, fora do intervalo");
  }

  if (findSeason(currentDate, "primavera", springSeason, summerSeason)) {
    console.log("Estamos no primavera");
  } else {
    console.log("Não estamos no primavera, fora do intervalo");
  }

  if (findSeason(currentDate, "verão", summerSeason, autumnSeason)) {
    console.log("Estamos no verão");
  } else {
    console.log("Não estamos no verão, fora do intervalo");
  }

  const getSeasonVariant = variations.variations.variations.map(
    (item: string) => item.variantActive,
  );

  let contentArray: any[] = [];
  let hasAutumn = false;
  let hasWinter = false;
  let hasSpring = false;
  let hasSummer = false;
  getSeasonVariant.forEach((item: any) => {
    const firstWord = item.split(" ")[0].toLowerCase();
    let content;
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
      contentArray.push(content);
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