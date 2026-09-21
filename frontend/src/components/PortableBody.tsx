import { PortableText, type PortableTextComponents } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="serif mt-10 text-4xl text-[#0a1638]">{children}</h1>,
    h2: ({ children }) => <h2 className="serif mt-10 text-3xl text-[#0a1638]">{children}</h2>,
    h3: ({ children }) => <h3 className="serif mt-8 text-2xl text-[#0a1638]">{children}</h3>,
    normal: ({ children }) => <p className="mt-4 text-[#4b5573] leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-[#e31c23] pl-4 text-[#0a1638]">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-5 text-[#4b5573]">{children}</ul>,
    number: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-[#4b5573]">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} className="text-[#e31c23] underline underline-offset-2" rel="noreferrer">
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="text-[#0a1638]">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
  types: {
    image: ({ value }) => {
      const src = typeof value?.url === "string" ? value.url : typeof value?.src === "string" ? value.src : null;
      if (!src) return null;
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={value?.alt || ""} className="mt-8 w-full border border-[#e6e9f2]" />
      );
    },
  },
};

export default function PortableBody({ value }: { value?: unknown[] }) {
  if (!value?.length) return null;
  return <PortableText value={value as never} components={components} />;
}
