type LogoLetter = 'z' | 'o' | 'v' | 'u' | 'o2' | 'e';

type BoardState = { [key: string]: LetterObject[] };

type LetterObject = {
  id: string;
  content: string;
  letter: LogoLetter;
  right?: LogoLetter;
  ok: boolean;
}

type Result = {
  logoLetters: LetterObject[];
  drop1: LetterObject[];
  drop2: LetterObject[];
  drop3: LetterObject[];
  drop4: LetterObject[];
  drop5: LetterObject[];
}

type Dropeable = {
  index: number;
  droppableId: 'logoLetters' | 'drop1' | 'drop2' | 'drop3' | 'drop4' | 'drop5';
}
