import GameData from "./GameData";

export function getDisplayDateFromIso(iso: string): string {
  return new Date(iso).toLocaleString(undefined, { dateStyle: "long" });
}

export function getTitleDisplayName(game: GameData): string {
  return game.titleEn || game.titleJpRomaji;
}

function getTitleUrlName(game: GameData): string {
  return getTitleDisplayName(game).toLowerCase().replace(/ /g, "+");
}

export function getGenreDisplayName(genreId: string): string {
  const GenreDisplayNames = {
    "rpg_turn": "Turn-based RPG",
    "rpg_tact": "Tactical RPG",
    "rpg_action": "Action RPG",
    "action_adventure": "Action/Adventure",
    "survival_horror": "Survival Horror",
    "side_scrolling_shooter": "Side-scrolling Shooter",
    "adventure": "Adventure",
    "platformer": "Platformer",
    "visual_novel": "Visual Novel",
    "rougelike": "Rougelike",
  };
  
  return GenreDisplayNames[genreId];
}

export function getFullImageAssetUrl(gameId: string, dir: string, ext: string): string {
  return `https://tplewe.com/sfc-games/src/assets/${dir}/${gameId}.${ext}`;
}

export function getUsdDisplayText(value: number): string {
  switch (value) {
    case 0:
      return "Never received a standalone physical release";
    default:
      return value.toLocaleString(undefined, { style: "currency", currency: "USD" });
  }
}

export function getEbaySearchUrl(game: GameData): string {
  return `https://www.ebay.com/sch/i.html?_nkw=${getTitleUrlName(game)}+super+famicom`;
}
