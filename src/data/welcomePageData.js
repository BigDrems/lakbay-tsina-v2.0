export const websitePurpose =
  "<strong>Maligayang pagdating sa Lakbay Tsina! <br> </strong> Ako si <strong>Kuya Pao</strong>, ang iyong gabay. Halina't tuklasin natin ang makulay na kasaysayan at mahahalagang aral ng Sinaunang Tsina. Tara, lakbayin natin ang nakaraan!";

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
    text: "Magaling! Natukoy mo ang China sa mapa! Ang bansang ito ay talagang napakalaki at mayaman sa kasaysayan. Ngayon, may apat na kamangha-manghang landas na maaari mong tuklasin. Bawat landas ay naglalaman ng mga kapanapanabik at kawili-wiling impormasyon tungkol sa Tsina!",
    options: [{ label: "Ipakita mo sa akin ang mga daan!", nextStep: 5 }],
  },
  {
    text: "Aling landas ang nais mong malaman muna?",
    options: pages.map((page) => ({
      label: `${page.name}`,
      nextStep: page.path,
    })),
  },
];
