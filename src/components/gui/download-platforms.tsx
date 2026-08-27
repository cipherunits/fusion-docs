import Image from "next/image";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GuiMessages } from "@/lib/common-messages";

type DownloadPlatformsProps = {
  messages: GuiMessages;
};

function ArchChip({ label }: { label: string }) {
  return (
    <Button type="button" variant="outline" size="xs" className="min-w-12">
      {label}
    </Button>
  );
}

function OptionRow({
  label,
  arches,
}: {
  label: string;
  arches: string[];
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground text-sm">{label}</span>
      <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
        {arches.map((arch) => (
          <ArchChip key={arch} label={arch} />
        ))}
      </div>
    </div>
  );
}

export function DownloadPlatforms({ messages }: DownloadPlatformsProps) {
  const m = messages;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
        <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {m.downloadTitle}
        </h1>
        <p className="text-muted-foreground mt-4 text-base text-pretty sm:text-lg">
          {m.downloadDescription}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
        <section
          aria-labelledby="download-windows"
          className="flex flex-col items-center gap-8"
        >
          <Image
            src="/images/gui/windows-logo.png"
            alt={m.windows}
            width={80}
            height={80}
            className="size-16 object-contain sm:size-20"
            priority
          />

          <h2 id="download-windows" className="sr-only">
            {m.windows}
          </h2>

          <Button
            type="button"
            size="lg"
            className="h-auto min-h-14 w-full max-w-xs flex-col gap-0.5 px-6 py-3"
          >
            <span className="inline-flex items-center gap-2 text-base font-semibold">
              <Download className="size-4" />
              {m.windows}
            </span>
            <span className="text-primary-foreground/70 text-xs font-normal">
              {m.windowsVersions}
            </span>
          </Button>

          <div className="flex w-full max-w-sm flex-col gap-3">
            <OptionRow label={m.userInstaller} arches={["x64", "Arm64"]} />
            <OptionRow label={m.systemInstaller} arches={["x64", "Arm64"]} />
            <OptionRow label={m.zip} arches={["x64", "Arm64"]} />
            <OptionRow label={m.cli} arches={["x64", "Arm64"]} />
          </div>
        </section>

        <section
          aria-labelledby="download-linux"
          className="flex flex-col items-center gap-8"
        >
          <Image
            src="/images/gui/linux-logo.png"
            alt={m.linux}
            width={80}
            height={80}
            className="size-16 object-contain sm:size-20"
            priority
          />

          <h2 id="download-linux" className="sr-only">
            {m.linux}
          </h2>

          <div className="grid w-full max-w-xs grid-cols-2 gap-2">
            <Button
              type="button"
              size="lg"
              className="h-auto min-h-14 flex-col gap-0.5 px-3 py-3"
            >
              <span className="text-base font-semibold">{m.deb}</span>
              <span className="text-primary-foreground/70 text-xs font-normal">
                {m.debDistros}
              </span>
            </Button>
            <Button
              type="button"
              size="lg"
              className="h-auto min-h-14 flex-col gap-0.5 px-3 py-3"
            >
              <span className="text-base font-semibold">{m.rpm}</span>
              <span className="text-primary-foreground/70 text-xs font-normal">
                {m.rpmDistros}
              </span>
            </Button>
          </div>

          <div className="flex w-full max-w-sm flex-col gap-3">
            <OptionRow label={m.deb} arches={["x64", "Arm32", "Arm64"]} />
            <OptionRow label={m.rpm} arches={["x64", "Arm32", "Arm64"]} />
            <OptionRow label={m.tarGz} arches={["x64", "Arm32", "Arm64"]} />
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground text-sm">{m.snap}</span>
              <Button type="button" variant="link" size="sm" className="h-auto px-0">
                {m.snapStore}
              </Button>
            </div>
            <OptionRow label={m.cli} arches={["x64", "Arm32", "Arm64"]} />
          </div>
        </section>
      </div>
    </main>
  );
}
