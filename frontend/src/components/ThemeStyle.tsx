import type { AppearanceColors } from "@/lib/appearance";

export default function ThemeStyle({ colors }: { colors: AppearanceColors }) {
  const css = `
    :root {
      --background: ${colors.background};
      --foreground: ${colors.navy};
      --nt-navy: ${colors.navy};
      --nt-red: ${colors.red};
      --nt-cyan: ${colors.cyan};
      --nt-muted: ${colors.muted};
    }
  `;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
