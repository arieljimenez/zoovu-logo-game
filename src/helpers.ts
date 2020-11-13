const logoLettersMap: { [key: number]: LogoLetter } = {
  1: 'z',
  2: 'o',
  3: 'o2',
  4: 'v',
  5: 'u',
}

export const getLetters = (): LogoLetter[] => {
  const letters: LogoLetter[] = [];

  for (let i = 0; letters.length < 5; i++) {
    const num = Math.floor(1 + Math.random() * 5);

    const letter: LogoLetter = logoLettersMap[num];

    if (!letters.includes(letter)) {
      letters.push(letter);
    }

    if (i > 500) { // just in case
      console.log('== had to br',);
      console.log({ letters });
      break;
    }
  }
  return letters;
}

export const getEmptySocketsInfo = (): LetterObject[] => {
  const info = [];

  for (let i = 1; i < 6; i++) {
    info.push({
      id: `empty-${i}`,
      content: `empty ${i}`,
      letter: 'e' as LogoLetter,
      right: logoLettersMap[i] as LogoLetter,
      ok: false,
    });
  }

  return info;
}

export const getLetterObjects = (): LetterObject[] => {
  const letters = getLetters();

  return letters.map((letter:LogoLetter) => ({
    id: `letter-${letter}`,
    content: `letter ${letter}`,
    letter,
    ok: false,
  }));
}



