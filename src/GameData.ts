export default interface GameData {
  // textual info
  titleEn: string,
  titleJp: string,
  titleJpRomaji: string,
  developer: string,
  publisher: string,
  genre: string,
  description: string,
  funFacts: string[],
  howLongToBeatHrs: number,

  // visuals
  gameplayStillUrl: string,
  gameplayGifUrl: string,
  boxArtUrl: string,
  isBoxArtPortrait: boolean,

  // technical specs
  releaseDate: string,
  sizeRomInMebibits: number,
  sizeSramInKibibits: number,
  isHiRom: boolean,
  isFastRom: boolean,
  specialChips: string[],
}