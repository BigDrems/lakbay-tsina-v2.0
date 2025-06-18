export const websitePurpose =
  "Maligayang pagdating sa Lakbay Tsina!! Ako si Kuya Pao ang inyong kaibigang gabay sa paglalakbay na ito. Hali na’t tuklasin natin ang makulay na kasaysayan at mahahalagang aral mula sa Sinaunang Kabihasnan ng Tsina.";

export const pages = [
  {
    name: "Cultural",
    purpose: "Discover the amazing traditions and culture of China.",
    path: "/",
  },
  {
    name: "About",
    purpose: "Discover the creator and content of the website.",
    path: "/about",
  },
  {
    name: "Lessons",
    purpose: "Discover the lessons and activities of the website.",
    path: "/lessons",
  },
  {
    name: "Entertainment",
    purpose: "Discover the entertainment and fun of the website.",
    path: "/entertainment",
  },
];

export const characterPuzzle = [
  {
    character: "文",
    meaning: "Culture",
    hint: "Discover the beauty and elegance of China.",
    id: "char1",
  },
  {
    character: "化",
    meaning: "Change",
    hint: "Change and development",
    id: "char2",
  },
  {
    character: "旅",
    meaning: "Journey",
    hint: "Travel and discovery",
    id: "char3",
  },
  {
    character: "学",
    meaning: "Learning",
    hint: "Learning and information",
    id: "char4",
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
    text: "Sagutin mo ang mga tanong at ika'y aking gagabayan sa tamang landas!",
    type: "puzzle",
    options: [],
  },
  {
    text: "Magaling! Ipinapakita ng scroll ang apat na kamangha-manghang landas na maaari mong tuklasin. Bawat landas ay naglalaman ng mga kapanapanabik at kawili-wiling impormasyon tungkol sa Tsina!",
    options: [{ label: "Ipakita mo sa akin ang mga daan!", nextStep: 4 }],
  },
  {
    text: "Aling landas ang nais mong malaman muna?",
    options: pages.map((page) => ({
      label: `Tuklasin ${page.name}`,
      nextStep: page.path,
    })),
  },
];
