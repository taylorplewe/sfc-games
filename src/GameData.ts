export default interface GameData {
  id: string,

  // textual info
  titleEn: string,
  titleJp: string,
  titleJpRomaji: string,
  description: string,
  releaseDate: string,
  developer: string,
  publisher: string,
  genre: string,
  notes: string[],
  howLongToBeatHrs: number,

  // visuals
  gameplayStillUrl: string,
  gameplayGifUrl: string,
  isBoxArtPortrait: boolean,

  // technical specs
  sizeRomInMebibits: number,
  sizeSramInKibibits: number,
  isHiRom: boolean,
  isFastRom: boolean,
  specialChips: string[],

  // taylor-specific
  taylorsScore: number | null,
}