// Course content data

// Utility function to extract YouTube video ID
export const getYouTubeVideoId = (url) => {
  if (!url) return null;

  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*$/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

export const courseContent = [
  {
    id: 1,
    title:
      "Araling Panlipunan 8 MATATAG Q1 Week 2-4 Sinaunang Kabihasnan sa llog Huang He at Yangtze w/ PPT/DLL",
    duration: "12:32 min",
    owner: `Ma'am Eve`,
    videoUrl: "https://youtu.be/AeJZArR2d8g?si=Vix7qstuqeQzqmh7",
    embedId: getYouTubeVideoId(
      "https://youtu.be/AeJZArR2d8g?si=Vix7qstuqeQzqmh7"
    ),
  },
  {
    id: 2,
    title:
      "MGA DINASTIYANG TSINO: ANU-ANO ANG MGA DINASTIYANG UMUSBONG SA TSINA?",
    duration: "15:25 min",
    owner: `Ser Ian's Class`,
    videoUrl: "https://youtu.be/-JM_m0FykTo?si=E8NAYCCI687FHeLw",
    embedId: getYouTubeVideoId(
      "https://youtu.be/-JM_m0FykTo?si=E8NAYCCI687FHeLw"
    ),
  },
  {
    id: 3,
    title: "AP 8 WEEK 7 ARALIN 1 : SINAUNANG KABIHASNAN NG CHINA (MELC-BASED)",
    duration: "15:02 min",
    owner: `Sir Mike's Class`,
    videoUrl: "https://youtu.be/-wMAmk3UXK0?si=3mMtVbzie5srqifw",
    embedId: getYouTubeVideoId(
      "https://youtu.be/-wMAmk3UXK0?si=3mMtVbzie5srqifw"
    ),
  },
  {
    id: 4,
    title:
      "MGA DINASTIYA SA KABIHASNANG TSINA AMBAG AT KONTRIBUSYON ARALING PANLIPUNAN",
    duration: "14:52 min",
    owner: "Eu Sunt",
    videoUrl: "https://youtu.be/Xj6tfh7bEQY?si=FNCu8vPQy9Z6t-LS",
    embedId: getYouTubeVideoId(
      "https://youtu.be/Xj6tfh7bEQY?si=FNCu8vPQy9Z6t-LS"
    ),
  },
];
