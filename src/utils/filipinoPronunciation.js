// Filipino word pronunciations using IPA (International Phonetic Alphabet)
export const filipinoPronunciation = {
  // Common words from the application
  Lakbay: "lɐkˈbaj",
  Tsina: "tʃiˈna",
  Maligayang: "mɐliˈgajaŋ",
  pagdating: "pɐgˈdatiŋ",
  palakaibigang: "pɐlɐkaɪˈbiɡaŋ",
  gabay: "ɡaˈbay",
  pagtuklas: "pɐgˈtuklɐs",
  kultura: "kulˈtuɾɐ",
  kagandahan: "kɐɡɐnˈdahan",
  Paglalakbay: "pɐɡlɐlɐkˈbaj",
  "Pag-aaral": "pɐɡʔaˈʔaɾɐl",
  Kultural: "kulˈtuɾɐl",
  Kagamitan: "kɐɡɐmiˈtan",
  Panimula: "pɐniˈmulɐ",
  Tungkol: "tuŋˈkol",
  Aralin: "ʔaˈɾalin",
  Libangan: "libaˈŋan",
  sige: "siˈɡe",
  sa: "sah",
  ng: "nang",
  na: "nah",
  mga: "ma-ngah",
  tutulungan: "tutuˈlupaŋan",
  magaling: "mɐˈɡaliŋ",
  balumbon: "bɐlumˈbon",
  sinaunang: "sinɐˈʔunaŋ",
  sikreto: "sikˈɾeto",
  magmatch: "mɐɡˈmɛtʃ",
  Kahangahanga: "kahánga-hangà",
  pakikipagsapalaran: "pɐkikipɐɡsɐpɐlɐˈɾan",
  Lupain: "luˈpaɪn",
  Dragon: "dɾɐˈɡon",
};

// Function to convert text to IPA pronunciation
export const convertToIPA = (text) => {
  let result = text;
  // Sort words by length (longest first) to avoid partial matches
  const words = Object.keys(filipinoPronunciation).sort(
    (a, b) => b.length - a.length
  );

  for (const word of words) {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    result = result.replace(
      regex,
      `<phoneme alphabet="ipa" ph="${filipinoPronunciation[word]}">${word}</phoneme>`
    );
  }

  return result;
};
