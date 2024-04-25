export interface DiscoverVideo {
  id: string;
  title: string;
}
type DiscoverVideos = {
  [key: string]: { [category: string]: DiscoverVideo[] };
};
export const discoverVideos: DiscoverVideos = {
  ar: {
    educational: [
      {
        id: "NbGLyPNAAG0",
        title:
          "25 Minutes of Arabic Listening Comprehension for Absolute Beginner",
      },
      {
        id: "0Q40SRZErhc",
        title:
          "Lessons In Arabic {SEASON 01} - Shaykh Munaf ; Conversation - Introduction ~ episode 01",
      },
      {
        id: "x9PoYFEcPPo",
        title:
          "4 Hours of Arabic Conversation Practice - Improve Speaking Skills",
      },
      {
        id: "w-Dvm4ANG1I",
        title: "Arabic Conversation with a Kid | + English",
      },
    ],
    vlogs: [
      {
        id: "8NwY38zylII",
        title: "day in my life in beirut *arabic vlog* | يوم في حياتي في بيروت",
      },
      {
        id: "ldyVW2RvEo0",
        title: "VLOG IN ARABIC # 1 Walking in Chechnya | Intermediate",
      },
      {
        id: "ZYe0coEsUVU",
        title: "Learn Arabic (Foods) | Vlog for Intermediate",
      },
      {
        id: "ENZE1Knq3nU",
        title: "ARABIC LANGUAGE / DAILY RUTINE. Listening for Beginners.",
      },
    ],
  },
  ko: {
    educational: [
      {
        id: "5deZWjGA4es",
        title: "Korean Conversation for beginners 🇰🇷 - Hello | Easy & Slow",
      },
      {
        id: "uuXDOYNuqh8",
        title: "[Vlog Korean] Korean Conversations at a Traditional Market",
      },
      {
        id: "7Jp3M6Vu0wA",
        title: "Basic Conversation in Korean",
      },
      {
        id: "6HFzeknPi2A",
        title: "Slow & Basic Conversation Practice",
      },
      {
        id: "Ux-TMWnmntM",
        title: "Natural Korean Conversation with 태웅쌤 | 이렇게 귀하신 분이 ①",
      },
    ],
    vlogs: [
      {
        id: "nxUY_QXyFes",
        title:
          "[VLOG] 12개월 아들 애교에 녹는다..🫠🩷 (콘서트 데이트, 친구 부모님댁 가기, 베트남 여행준비)",
      },
      {
        id: "z2hFOhqQZTw",
        title: "[CAFE VLOG] 사장이라 다행인 디저트카페브이로그",
      },
      {
        id: "2HgTM0yqieY",
        title:
          "미국 일상 🇺🇸 마트 장보고, 네버엔딩 리모델링 인생... 😇 지하실 가구 조립하고, 얼큰 떡만두국, 코스트코 장보기, 브런치, 언박싱 l 미국 브이로그",
      },
      {
        id: "84t1H0lfKF8",
        title: "[연애브이로그] 오랜만에 낮에 데이트해서 너무 신나쟈나🫶",
      },
      {
        id: "ixDEM9Algdo",
        title:
          "[워킹맘 브이로그] 개빡센 하루들|🤰🏻벌써 12kg 증량|🏡전원주택 마당 개시|🌸벚꽃.. 봄..🌱|집안일 뫼비우스♾…😵‍💫",
      },
    ],
  },

  "zh-CN": {
    educational: [
      {
        id: "V-zIW9s4DFQ",
        title:
          "100 Daily Chinese Conversations (Part 1) - Learn Mandarin Chinese Listening & Speaking",
      },
      {
        id: "2ZA6M9EsSlM",
        title:
          "Basic Chinese Greetings - Beginner Conversational Mandarin - Yoyo Chinese",
      },
      {
        id: "eNv8saOz1Qk",
        title: "15 Chinese Phrases that Natives use ALL THE TIME",
      },
      {
        id: "64V9KIbykLQ",
        title:
          "Seeing a friend on the street - Mandarin Chinese Dialogue (Pinyin and English in description field)",
      },
    ],
    vlogs: [
      {
        id: "MGTSs_GmkfE",
        title: "【VLOG in Chinese】A Day with Me | Grace Mandarin Chinese",
      },
      {
        id: "MnYyAdatuSM",
        title: "成都一日游｜中国 vlog 🇨🇳",
      },
      {
        id: "xlMBzIwAOlI",
        title:
          "【HSK2/HSK3 Friendly to beginners】Walk around in Chengdu｜Eng Sub & pinyin｜Learn Chinese through Vlogs",
      },
      {
        id: "JsWaczZOLMg",
        title: "24 HOURS SPEAKING CHINESE ONLY | Miki & Kev",
      },
    ],
  },
  ja: {
    educational: [
      {
        id: "GUqFU5u7rLQ",
        title:
          "Japanese Listening Practice With A Story #1 | Family [Beginner Level 1]",
      },
      {
        id: "-9eA4IgS2oQ",
        title:
          "[Eng Sub] Walk around in Yoyogi Park in Tokyo | Japanese Listening Practice",
      },
      {
        id: "3Ia0Qz-QVQ8",
        title:
          "Japanese Listening Practice With A Story #9 |Travel Phrases (+Free PDF:)",
      },
      {
        id: "2xrd8DwBtG0",
        title:
          "Japanese Listening Practice With A Story #8 | Restaurant (+Free PDF :)",
      },
      {
        id: "jiKnI3rjx54",
        title:
          "Japanese Listening Practice With A Story #4 | Japanese Home [Beginner Level 2]",
      },
    ],
    vlogs: [
      {
        id: "4z_dHQgKYV0",
        title:
          "[Eng Sub] Real Conversation with My Next-Door Neighbor | Japanese Listening Practice",
      },
      {
        id: "tC8bc-VX96A",
        title:
          "JAPAN VLOG🍥✩°｡kyoto & osaka, universal nintendo world, arashiyama, kimono, miffy, ghibli, what i eat",
      },
      {
        id: "2rf0xpYwdEs",
        title:
          "【N5-N4】京都 Exploring an old town in Kyoto / Easy Japanese Vlog - Japanese listening practice",
      },
      {
        id: "3Ia0Qz-QVQ8",
        title:
          "Japanese Listening Practice With A Story #9 |Travel Phrases (+Free PDF:)",
      },
      {
        id: "2xrd8DwBtG0",
        title:
          "Japanese Listening Practice With A Story #8 | Restaurant (+Free PDF :)",
      },
      {
        id: "jiKnI3rjx54",
        title:
          "Japanese Listening Practice With A Story #4 | Japanese Home [Beginner Level 2]",
      },
    ],
  },
  hi: {
    educational: [
      {
        id: "YCkY_yo_wgU",
        title: "How To Learn Hindi Faster Than I Did! #RocksLearnHindi",
      },
      {
        id: "noFNLGRUUCQ",
        title: "30 Minutes of Hindi Listening Comprehension for Beginner",
      },
      {
        id: "Ps0OiTpCZD8",
        title:
          "2 Hours of Daily Hindi Conversations - Hindi Practice for ALL Learners",
      },
      {
        id: "NLlEKIMM7yQ",
        title: "Daily Conversations #1 - Learn Hindi through English",
      },
    ],
    vlogs: [
      {
        id: "IbiykRE8PLw",
        title:
          "Every Indian should visit this city | Antalya Vlog Hindi | | Hidden Gem in Turkey ! |",
      },
      {
        id: "ZAehIXCijnw",
        title:
          "I Spent A Day In A Farm In America | American Farm Life | Amish Village Pennsylvania | Hindi Vlog",
      },
      {
        id: "LCv1_IiwjtM",
        title: "Weekend Trip to Hiils | Solan Vacation Vlog | Perkymegs Hindi",
      },
      {
        id: "NLlEKIMM7yQ",
        title: "Daily Conversations #1 - Learn Hindi through English",
      },
    ],
  },
  es: {
    educational: [
      {
        id: "AXQZu10h29U",
        title:
          "Spanish Conversation Listening Comprehension Practice | Learn Spanish",
      },
      {
        id: "Hbu8HvhYj98",
        title:
          "Basic Conversation Practice in Spanish for Beginners | HOLA SPANISH | BRENDA & ROMINA ROMANIELLO",
      },
      {
        id: "3nb_hjv5Y24",
        title: "LEARN SPANISH with This VLOG 🇪🇸 (w/ subtitles!)",
      },
      {
        id: "hyCMWklv5gA",
        title:
          "speaking only Spanish for 24 hours 🤎 Barcelona vlog (w subtitles)",
      },
      {
        id: "4JC4_8JRISs",
        title:
          "PRACTICE SPANISH with this VLOG | 🇪🇸 I did a school project (w/ subtitles)",
      },
    ],
    vlogs: [
      {
        id: "3nb_hjv5Y24",
        title: "LEARN SPANISH with This VLOG 🇪🇸 (w/ subtitles!)",
      },
      {
        id: "hyCMWklv5gA",
        title:
          "speaking only Spanish for 24 hours 🤎 Barcelona vlog (w subtitles)",
      },
      {
        id: "4JC4_8JRISs",
        title:
          "PRACTICE SPANISH with this VLOG | 🇪🇸 I did a school project (w/ subtitles)",
      },
    ],
  },
  it: {
    educational: [
      {
        id: "o-WZBRPcK80",
        title:
          "Italian language short and easy dialogue practice (Subtitles) (Very Beginners)",
      },
      {
        id: "MtJd6i4RM1w",
        title: "11 Minute Conversation in Slow Italian | Super Easy Italian 44",
      },
      {
        id: "VxnPd0PgqjU",
        title:
          "Easy Italian 1 - Cosa ti piace di più mangiare? | Italians favourite food",
      },
      {
        id: "BqgXc2AT6C0",
        title: "Italian Conversation at the Bar (Conversazione al bar)",
      },
    ],
    vlogs: [
      {
        id: "TK3XaE0d5iI",
        title:
          "🇮🇹 life in Italy diaries | a *realistic* weekend at home 🏠🍳🧹✨ (Italian Vlog)",
      },
      {
        id: "yVr3x91NJQI",
        title: "What I eat in a week at my NONNA's house in ITALY 🐟",
      },
      {
        id: "AZmBKInxtXE",
        title:
          "what i eat in a week in italy 🍝 (aka what my nonna cooks for me lol)",
      },
      {
        id: "uYFtWVv5F3E",
        title:
          "Italy Travel Vlog: exploring Florence, Tuscany and Venice (2022)",
      },
    ],
  },
};
