import Image from "next/image";
import Link from "next/link";

export default function Logo({ height = 40 }: { height?: number }) {
  const width = Math.round(height * (520 / 180));

  return (
    <Link href="/" className="inline-flex items-center" aria-label="Navitrends UK">
      <Image
        src="/logo.png"
        alt="Navitrends"
        width={width}
        height={height}
        priority
        style={{ height, width: "auto" }}
      />
    </Link>
  );
}
