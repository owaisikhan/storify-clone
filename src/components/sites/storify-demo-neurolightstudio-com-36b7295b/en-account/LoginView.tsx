"use client";

import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * /en/login — "Welcome back / Sign in".
 *
 * The target publishes demo credentials on the page itself, with a
 * "Fill & quick login" button per role; those are reproduced verbatim (they are
 * the demo's own published logins, not secrets). There is no auth backend here,
 * so signing in fills the form and says so rather than pretending to log in.
 */

const DEMO_ROLES = [
  { role: "Admin", email: "admin@storify.com", password: "Admin@123" },
  { role: "Vendor", email: "vendor@storify.com", password: "Vendor@123" },
];

const FIELD =
  "h-11 w-full rounded-lg border border-border bg-transparent px-3 text-sm text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20";

export function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState(false);

  return (
    <div className="container mx-auto grid gap-10 px-4 py-12 lg:grid-cols-2 lg:items-start">
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setNotice(true);
          }}
          className="mt-6 space-y-4"
        >
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-foreground">Email</span>
            <input
              name="email"
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className={FIELD}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="flex items-center justify-between text-sm font-medium text-foreground">
              Password
              <span className="text-xs font-normal text-primary">
                Forgot password?
              </span>
            </span>
            <input
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={FIELD}
            />
          </label>
          <button
            type="submit"
            className="h-11 w-full cursor-pointer rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Sign in
          </button>
          {notice && (
            <p role="status" className="text-center text-xs text-muted-foreground">
              There&apos;s no auth backend yet — accounts arrive with the
              backend.
            </p>
          )}
        </form>

        <p className="mt-6 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Don&apos;t have an account?
        </p>
        <Link
          href="/en/become-vendor"
          className="mt-3 flex h-11 w-full cursor-pointer items-center justify-center rounded-lg border border-border text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          Create an account
        </Link>
      </div>

      <div className="mx-auto w-full max-w-md rounded-xl border border-border p-5">
        <p className="text-sm font-bold text-foreground">
          Demo account login credentials
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Select a role to fill the login form.
        </p>
        <div className="mt-5 space-y-4">
          {DEMO_ROLES.map((d) => (
            <div key={d.role} className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-foreground">
                  {d.role}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setEmail(d.email);
                    setPassword(d.password);
                    setNotice(false);
                  }}
                  className={cn(
                    "h-8 cursor-pointer rounded-lg border border-border px-3 text-xs font-semibold text-foreground transition-colors hover:bg-muted",
                  )}
                >
                  Fill &amp; quick login
                </button>
              </div>
              <dl className="mt-3 space-y-1 text-xs">
                <div className="flex gap-2">
                  <dt className="w-16 shrink-0 text-muted-foreground">Email</dt>
                  <dd className="text-foreground">{d.email}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-16 shrink-0 text-muted-foreground">Password</dt>
                  <dd className="text-foreground">{d.password}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
