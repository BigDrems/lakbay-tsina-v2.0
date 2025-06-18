export const websitePurpose =
  "<strong>Maligayang pagdating sa Lakbay Tsina! <br><br> </strong> Ako si <strong>Kuya Pao</strong>, ang iyong gabay. Halina't tuklasin natin ang makulay na kasaysayan at mahahalagang aral ng Sinaunang Tsina.";

export const pages = [
  {
    name: "Kultura",
    purpose:
      "Tuklasin ang mga kamangha-manghang tradisyon at kultura ng China.",
    path: "/",
  },
  {
    name: "Patungkol",
    purpose: "Tuklasin ang mga tagalikha at nilalaman ng website.",
    path: "/about",
  },
  {
    name: "Aralin",
    purpose: "Tuklasin ang mga aralin at aktibidad ng website.",
    path: "/lessons",
  },
  {
    name: "Libangan",
    purpose: "Tuklasin ang mga libangan at kasiyahan ng website.",
    path: "/entertainment",
  },
];

export const conversation = [
  {
    text: `${websitePurpose} Kaya tara na, at sabay-sabay nating lakbayin ang nakaraan upang mas maunawaan ang kasalukuyan!`,
    options: [{ label: "Magpatuloy", nextStep: 1 }],
  },
  {
    text: "Nakakita ako ng isang kapana-panabik na lugar na may mga lihim tungkol sa kulturang Tsino. Maaari mo ba akong tulungang matukoy ang lugar na ito?",
    options: [
      { label: "Opo, Tutulungan Kita!", nextStep: 2 },
      { label: "Sabihin mo muna sa akin ang mga detalye!", nextStep: 3 },
    ],
  },
  {
    text: "Tingnan natin ang mapa ng mundo at tuklasin kung saan matatagpuan ang bansang ito!",
    type: "puzzle",
  },
  {
    text: "Sige! Ang bansang ito ay isa sa pinakamalaking bansa sa mundo. Mayroon itong mahaba at mayamang kasaysayan na umaabot ng libu-libong taon. Kilala ito sa mga sinaunang dinastiya, magagandang templo, at kamangha-manghang kultura. Ngayon, tingnan natin kung saan ito matatagpuan sa mapa!",
    options: [{ label: "Tingnan ang Mapa", nextStep: 2 }],
  },
  {
    text: "Magaling! Natukoy mo ang China sa mapa! Bago tayo magpatuloy sa mga landas, gusto kong malaman kung gaano na kalawak ang iyong kaalaman tungkol sa sinaunang kabihasnang Tsina. May maliit na pagsusulit tayo!",
    options: [{ label: "Sige, subukan natin!", nextStep: 5 }],
  },
  {
    text: "🧠 Pagsusulit sa Sinaunang Tsina<br><br>May 25 masayang tanong tayo tungkol sa sinaunang Tsina! Hindi ito graded, kaya huwag kang mag-alala. Gusto mo bang subukan?",
    options: [
      { label: "Opo, handa na ako! 🚀", nextStep: "pretest" },
      { label: "Hindi pa, may tanong ako 🤔", nextStep: 6 },
    ],
  },
  {
    text: "Ano ang iyong tanong? Ang pagsusulit na ito ay para malaman natin kung gaano na kalawak ang iyong kaalaman tungkol sa sinaunang Tsina. Hindi ito graded, kaya huwag kang mag-alala!",
    options: [{ label: "Sige, simulan na natin! 🎯", nextStep: "pretest" }],
  },
  {
    text: "🎉 Napakahusay! Natapos mo ang pagsusulit! Ngayon na alam na natin ang iyong kaalaman, may apat na kamangha-manghang landas na maaari mong tuklasin. Bawat landas ay naglalaman ng mga kapanapanabik at kawili-wiling impormasyon tungkol sa Tsina!",
    options: [{ label: "Ipakita mo sa akin ang mga daan! 🗺️", nextStep: 8 }],
  },
  {
    text: "Aling landas ang nais mong pag-aralan muna?",
    options: pages.map((page) => ({
      label: `${page.name}`,
      nextStep: page.path,
    })),
  },
];
