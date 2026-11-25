"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Mode = "login" | "register";

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isRegister = mode === "register";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries()) as Record<string, string>;

    if (isRegister && data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error ?? "Request failed.");
        return;
      }
      router.push("/home");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      {!isRegister && <div className="company-name">database.com</div>}
      <form className="card" onSubmit={handleSubmit} noValidate>
        <h1>{isRegister ? "Create an account" : "Welcome back"}</h1>
        <p className="muted">
          {isRegister ? "Register to get started." : "Log in to continue."}
        </p>

        {error && <div className="error" role="alert">{error}</div>}

        {isRegister && (
          <label>
            Full name
            <input name="name" type="text" autoComplete="name" required maxLength={100} />
          </label>
        )}

        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            autoComplete={isRegister ? "new-password" : "current-password"}
            required
            minLength={isRegister ? 8 : undefined}
          />
        </label>

        {isRegister && (
          <label>
            Confirm password
            <input name="confirmPassword" type="password" autoComplete="new-password" required />
          </label>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Please wait…" : isRegister ? "Register" : "Log in"}
        </button>

        <p className="switch">
          {isRegister ? (
            <>Already have an account? <Link href="/login">Log in</Link></>
          ) : (
            <>Don&apos;t have an account? <Link href="/register">Register</Link></>
          )}
        </p>
      </form>
    </main>
  );
}
