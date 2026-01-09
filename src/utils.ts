export function getDisplayDateFromIso(iso: string): string {
  return new Date(iso).toLocaleString(undefined, { dateStyle: "long" });
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
  };
  
  return GenreDisplayNames[genreId];
}
