import React from "react";
import { Sparkles } from "lucide-react";

export default function Footer({ t }) {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} {t.hero.name}. {t.footer.rights}.
        </p>
        <p className="mt-2 flex items-center justify-center gap-1 text-xs text-gray-600">
          {t.footer.made} <Sparkles className="h-3 w-3 text-gold" />
        </p>
      </div>
    </footer>
  );
}
