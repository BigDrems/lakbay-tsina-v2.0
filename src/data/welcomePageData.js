export const websitePurpose =
  "Maligayang pagdating sa Lakbay China! Ako si Li Mei, ang iyong masiglang gabay sa pagtuklas sa kultura at kasaysayan ng Tsina.";

export const pages = [
  {
    name: "Kultural na Paglalakbay",
    purpose: "Pagtuklas ng kamangha-manghang tradisyon at kultura ng Tsina.",
    path: "/",
  },
  {
    name: "Kagamitan na Paglalakbay",
    purpose: "Pagtuklas ng mga kagamitan na may kagandahan at kagandahan.",
    path: "/",
  },
  {
    name: "Modern Marvels",
    purpose: "Pagtuklas ng kagandahan at kagandahan ng Tsina.",
    path: "/",
  },
  {
    name: "Paglalakbay na Pag-aaral",
    purpose: "Pagtuklas ng kagandahan at kagandahan ng Tsina.",
    path: "/",
  },
];

export const characterPuzzle = [
  {
    character: "文",
    meaning: "Kultura",
    hint: "Nakakita ng kagandahan at kagandahan ng Tsina.",
    id: "char1",
  },
  {
    character: "化",
    meaning: "Pagbabago",
    hint: "Pagbabago at pag-unlad",
    id: "char2",
  },
  {
    character: "旅",
    meaning: "Paglalakbay",
    hint: "Paglalakbay at pagtuklas",
    id: "char3",
  },
  {
    character: "学",
    meaning: "Pag-aaral",
    hint: "Pag-aaral at impormasyon",
    id: "char4",
  },
];

export const conversation = [
  {
    text: `${websitePurpose} Handa ka na bang simulan ang isang di malilimutang paglalakbay sa Tsina?`,
    options: [{ label: "Tara at tuklasin na!", nextStep: 1 }],
  },
  {
    text: "Nakahanap ako ng isang kapana-panabik sinaunang balumbon na may mga sikreto tungkol sa kulturang Tsino. Gusto mo ba akong tulungan na alamin kung ano ang ibig sabihin nito?",
    options: [
      { label: "Sige, tutulungan kita!", nextStep: 2 },
      { label: "Sabihin mo muna sa akin ang mga detalye!", nextStep: 3 },
    ],
  },
  {
    text: "Ipares ang mga gamit mula sa Tsina! Kapag tama ang pagpapareho, makakakuha ka ng isang piraso!",
    type: "puzzle",
    options: [],
  },
  {
    text: "Magaling! Ang balumbon ay nagpapakita ng apat na kahanga-hangang landas na maaari mong i-explore. Bawat landas ay nagpapakita ng isang cool at interesanteng impormasyon tungkol sa Tsina!",
    options: [{ label: "Ipakita mo sa akin ang mga landas", nextStep: 4 }],
  },
  {
    text: "Aling landas mo nais na malaman muna?",
    options: pages.map((page) => ({
      label: `Alamin ang ${page.name}`,
      nextStep: page.path,
    })),
  },
];
