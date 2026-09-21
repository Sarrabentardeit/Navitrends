import { Suspense } from "react";
import LoginForm from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-[#fbfbfd] px-6">
      <div className="w-full max-w-md border border-[#e6e9f2] bg-white p-10">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#8b91a5]">Navitrends UK</p>
        <h1 className="serif mt-2 text-4xl text-[#0a1638]">Back-office</h1>
        <p className="mt-3 text-sm text-[#4b5573]">Espace interne pour gérer le site, les Insights et les pages.</p>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
