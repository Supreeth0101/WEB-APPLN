import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

// Root URL: send logged-in users home, everyone else to login
export default async function Index() {
  const session = await getSession();
  redirect(session ? "/home" : "/login");
}
