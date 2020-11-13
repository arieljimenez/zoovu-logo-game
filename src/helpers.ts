const logoLettersMap: { [key: number]: LogoLetter } = {
  1: 'z',
  2: 'o',
  3: 'v',
  4: 'u'
}

export const getLetters = (): LogoLetter[] => {
  const letters: LogoLetter[] = [];
  let oCount = 0;

  for (let i = 0; letters.length < 5; i++) {
    const num = Math.floor(1 + Math.random() * 4);

    const letter: LogoLetter = logoLettersMap[num];

    if (!letters.includes(letter)) {
      letters.push(letter);
    } else if (letter === 'o' && oCount === 1) {
      letters.push('o2');
      oCount++;
    }

    if (letter === 'o') {
      oCount++;
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

  for (let i = 0; i < 5; i++) {
    info.push({
      id: `empty-${i}`,
      content: `empty ${i}`,
      letter: 'e' as LogoLetter,
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
  }));
}



