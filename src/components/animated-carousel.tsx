import Image from "next/image";
import { cn } from "@/lib/utils";

function getYouTubeThumbnailFromId(id: string) {
  return `https://i3.ytimg.com/vi/${id}/maxresdefault.jpg`;
}

const youtubeThumbnails = [
  {
    id: "NbGLyPNAAG0",
    title: "25 Minutes of Arabic Listening Comprehension for Absolute Beginner",
  },
  {
    id: "0Q40SRZErhc",
    title:
      "Lessons In Arabic {SEASON 01} - Shaykh Munaf ; Conversation - Introduction ~ episode 01",
  },
  {
    id: "x9PoYFEcPPo",
    title: "4 Hours of Arabic Conversation Practice - Improve Speaking Skills",
  },
  {
    id: "w-Dvm4ANG1I",
    title: "Arabic Conversation with a Kid | + English",
  },
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
  {
    id: "4z_dHQgKYV0",
    title:
      "[Eng Sub] Real Conversation with My Next-Door Neighbor | Japanese Listening Practice",
  },
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
    title: "speaking only Spanish for 24 hours 🤎 Barcelona vlog (w subtitles)",
  },
  {
    id: "4JC4_8JRISs",
    title:
      "PRACTICE SPANISH with this VLOG | 🇪🇸 I did a school project (w/ subtitles)",
  },
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
    title: "Italy Travel Vlog: exploring Florence, Tuscany and Venice (2022)",
  },
];

function AnimatedCarousel({ className }: { className?: string }) {
  const shuffleYouTubeThumbnails = youtubeThumbnails.sort(
    () => Math.random() - 0.5
  );
  return (
    <div className={cn("flex flex-col w-full", className)}>
      {Array.from({ length: 4 }).map((_, i) => {
        return (
          <>
            <div className="w-full inline-flex flex-nowrap overflow-hidden">
              <ul className="flex items-center justify-center md:justify-start [&_img]:max-w-none animate-infinite-scroll">
                {Array.from({ length: 8 }).map((_, j) => {
                  const currentIdx = j + i * 8;
                  const currentId = shuffleYouTubeThumbnails[currentIdx].id;
                  const currentTitle =
                    shuffleYouTubeThumbnails[currentIdx].title;
                  return (
                    <li
                      key={currentIdx}
                      className="relative overlow-hidden w-[200px] md:w-[275px] aspect-video"
                    >
                      <Image
                        src={getYouTubeThumbnailFromId(currentId)}
                        alt={currentTitle}
                        fill
                      />
                    </li>
                  );
                })}
              </ul>
              {/* Need a duplicate element to take over... Could be refactored */}
              <ul
                className="flex items-center justify-center md:justify-start [&_img]:max-w-none animate-infinite-scroll"
                aria-hidden="true"
              >
                {Array.from({ length: 8 }).map((_, j) => {
                  const currentIdx = j + i * 8;
                  const currentId = shuffleYouTubeThumbnails[currentIdx].id;
                  const currentTitle =
                    shuffleYouTubeThumbnails[currentIdx].title;
                  return (
                    <li
                      key={currentIdx}
                      className="relative overlow-hidden w-[200px] md:w-[275px] aspect-video"
                    >
                      <Image
                        src={getYouTubeThumbnailFromId(currentId)}
                        alt={currentTitle}
                        fill
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default AnimatedCarousel;
