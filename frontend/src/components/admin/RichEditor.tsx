"use client";

import { useEffect, useRef, useState } from "react";
import { Bold, Italic, Link2, List, ListOrdered, Pilcrow, Quote, Underline } from "lucide-react";
import { cn } from "@/lib/utils";
import { isHtml, plainToHtml, sanitizeHtml } from "@/lib/html";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
};

export default function RichEditor({ label, value, onChange, hint }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  useEffect(() => {
    if (!ref.current) return;
    const html = isHtml(value) ? value : plainToHtml(value);
    ref.current.innerHTML = html || "<p><br></p>";
    // initial paint only — later edits stay in the DOM
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function emit() {
    const html = sanitizeHtml(ref.current?.innerHTML ?? "");
    onChange(html);
    refresh();
  }

  function run(command: string, arg?: string) {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    emit();
  }

  function heading(tag: "h1" | "h2" | "h3" | "p" | "blockquote") {
    run("formatBlock", `<${tag}>`);
  }

  function refresh() {
    try {
      setActive({
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
      });
    } catch {
      /* ignore */
    }
  }

  function link() {
    const current = document.queryCommandValue("createLink");
    const href = window.prompt("Adresse du lien", current || "https://");
    if (!href) return;
    run("createLink", href);
  }

  function onPaste(event: React.ClipboardEvent<HTMLDivElement>) {
    event.preventDefault();
    const html = event.clipboardData.getData("text/html");
    const text = event.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, sanitizeHtml(html || plainToHtml(text)));
    emit();
  }

  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.16em] text-[#8b91a5]">{label}</p>
      <p className="mt-1 mb-2 text-xs text-[#8b91a5]">
        {hint || "Comme WordPress : sélectionnez un mot, puis Gras, Italique, H1 ou H2."}
      </p>
      <div className="border border-[#e6e9f2] bg-white">
        <div className="flex flex-wrap gap-1 border-b border-[#e6e9f2] bg-[#f8f9fc] p-2">
          <Tool active={active.bold} label="Gras" onClick={() => run("bold")}>
            <Bold size={15} />
            <span className="ml-1 hidden text-[11px] sm:inline">Gras</span>
          </Tool>
          <Tool active={active.italic} label="Italique" onClick={() => run("italic")}>
            <Italic size={15} />
            <span className="ml-1 hidden text-[11px] sm:inline">Italique</span>
          </Tool>
          <Tool active={active.underline} label="Souligné" onClick={() => run("underline")}>
            <Underline size={15} />
          </Tool>
          <Sep />
          <Tool label="Paragraphe" onClick={() => heading("p")}>
            <Pilcrow size={15} />
          </Tool>
          <Tool label="Titre H1" onClick={() => heading("h1")}>
            <span className="text-[12px] font-semibold">H1</span>
          </Tool>
          <Tool label="Titre H2" onClick={() => heading("h2")}>
            <span className="text-[12px] font-semibold">H2</span>
          </Tool>
          <Tool label="Titre H3" onClick={() => heading("h3")}>
            <span className="text-[12px] font-semibold">H3</span>
          </Tool>
          <Sep />
          <Tool label="Liste" onClick={() => run("insertUnorderedList")}>
            <List size={15} />
          </Tool>
          <Tool label="Liste numérotée" onClick={() => run("insertOrderedList")}>
            <ListOrdered size={15} />
          </Tool>
          <Tool label="Citation" onClick={() => heading("blockquote")}>
            <Quote size={15} />
          </Tool>
          <Tool label="Lien" onClick={link}>
            <Link2 size={15} />
          </Tool>
        </div>
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-label={label}
          className="cms-editor min-h-[280px] px-4 py-3 text-sm text-[#0a1638] outline-none"
          onInput={emit}
          onKeyUp={refresh}
          onMouseUp={refresh}
          onPaste={onPaste}
        />
      </div>
    </div>
  );
}

function Sep() {
  return <span className="mx-1 h-7 w-px bg-[#e6e9f2]" />;
}

function Tool({
  label,
  onClick,
  active,
  children,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={cn(
        "inline-flex h-8 min-w-8 items-center justify-center px-2 text-[#0a1638] hover:bg-white",
        active && "bg-white text-[#e31c23]"
      )}
    >
      {children}
    </button>
  );
}
