import { create } from "zustand";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FetchedSummaryData } from "@/types";

interface State {
  name: string;
  email: string;
  oauth: boolean;
  currentSummaryId: string;
  selectedWords: Map<string, [string, string]>; // word as key, (translation, definition) as value
  summariesList: FetchedSummaryData[];
  removeSummary: (id: string) => void;
  updateSummariesList: (summaries: FetchedSummaryData[]) => void;
  updateName: (name: string) => void;
  updateEmail: (email: string) => void;
  updateCurrentSummaryId: (id: string) => void;
  fetchUser: () => Promise<void>;
  addSelectedWord: (
    word: string,
    translation: string,
    definition: string
  ) => void;
  deleteWord: (word: string) => void;
  fetchSelectedWords: () => Promise<void>;
}

export const useStore = create<State>((set) => ({
  name: "",
  email: "",
  currentSummaryId: "",
  oauth: false,
  selectedWords: new Map<string, [string, string]>(),
  summariesList: [],
  updateSummariesList: (summaries) => set(() => ({ summariesList: summaries })),
  removeSummary: (id: string) =>
    set((state) => ({
      summariesList: state.summariesList.filter((summary) => summary.id !== id),
    })),

  updateName: (name: string) => set(() => ({ name })),
  updateEmail: (email: string) => set(() => ({ email })),
  updateCurrentSummaryId: (currentSummaryId: string) =>
    set(() => ({ currentSummaryId })),
  fetchUser: async () => {
    const supabase = createClientComponentClient({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    let name, oauth;

    if (user?.user_metadata.display_name) {
      name = user.user_metadata.display_name;
      oauth = false;
    } else if (user?.user_metadata.full_name) {
      name = user.user_metadata.full_name;
      oauth = true;
    }

    set({
      name: name || "",
      email: user?.email || "",
      oauth: oauth || false,
    });
  },
  addSelectedWord: (word: string, translation: string, definition: string) =>
    set((state) => ({
      selectedWords: state.selectedWords.set(word, [translation, definition]),
    })),
  deleteWord: (word: string) => {
    set((state) => {
      const selectedWords = new Map<string, [string, string]>();
      for (const [key, value] of state.selectedWords as any) {
        if (key !== word) {
          selectedWords.set(key, value);
        }
      }
      return {
        selectedWords,
      };
    });
  },
  fetchSelectedWords: async () => {
    const supabase = createClientComponentClient({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });

    const { data, error } = await supabase.from("word").select("*");
    console.log(data);
    if (error) {
      throw new Error(error.message);
    }
    if (!data) {
      throw new Error("No data found");
    }
    set({
      selectedWords: new Map(
        data.map((row: any) => [row.word, [row.translation, row.definition]])
      ),
    });
  },
}));
