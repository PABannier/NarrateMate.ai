import { create } from "zustand";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface State {
  name: string;
  email: string;
  oauth: boolean;
  currentSummaryId: string;
  updateName: (name: string) => void;
  updateEmail: (email: string) => void;
  updateCurrentSummaryId: (id: string) => void;
  fetchUser: () => Promise<void>;
}

export const useStore = create<State>((set) => ({
  name: "",
  email: "",
  currentSummaryId: "",
  oauth: false,
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
}));
