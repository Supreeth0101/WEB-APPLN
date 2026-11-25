import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { findUserById } from "@/lib/db";
import LogoutButton from "@/components/LogoutButton";

export default async function HomePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await findUserById(session.userId);
  if (!user) redirect("/login");

  const joined = new Date(user.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <header className="topbar">
        <span className="brand">Web App</span>
        <LogoutButton />
      </header>
      <main className="home">
        <h1>Hello, {user.name} 👋</h1>
        <p className="muted">You are logged in.</p>

        <section className="card info">
          <h2>Your account</h2>
          <dl>
            <dt>Name</dt>
            <dd>{user.name}</dd>
            <dt>Email</dt>
            <dd>{user.email}</dd>
            <dt>Member since</dt>
            <dd>{joined}</dd>
          </dl>
        </section>
      </main>
    </>
  );
}
