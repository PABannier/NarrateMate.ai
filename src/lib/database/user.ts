"use server";
import {
  createClientComponentClient,
  createServerActionClient,
} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateUser({
  email,
  password,
  data,
}: {
  email?: string;
  password?: string;
  data?: { display_name: string };
}) {
  try {
    // const supabase = createClientComponentClient({
    //   supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    //   supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    // });
    const cookieStore = cookies();
    const supabase = createServerActionClient({ cookies: () => cookieStore });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (email && user?.email !== email) {
      const {
        data: { user },
        error,
      } = await supabase.auth.updateUser({ email, password, data });
      if (error) throw new Error(error.message);
    } else {
      const {
        data: { user },
        error,
      } = await supabase.auth.updateUser({ password, data });
      if (error) throw new Error(error.message);
    }

    revalidatePath("/learning/practice");
    return { data: { success: true } };
  } catch (error) {
    return {
      error,
    };
  }
}
