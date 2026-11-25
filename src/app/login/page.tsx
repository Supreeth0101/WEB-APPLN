import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { getSession } from "@/lib/session";

export default async function LoginPage() {
  if (await getSession()) redirect("/home");
  return <AuthForm mode="login" />;
}
