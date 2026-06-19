import { PresentationShell } from "@/components/presentation/PresentationShell";

type PageProps = {
  searchParams: Promise<{ export?: string; scene?: string; chrome?: string }>;
};

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const exportMode = params.export === "1";
  const exportScene = exportMode ? Number(params.scene ?? "0") : 0;
  const hideChrome = exportMode && params.chrome !== "1";

  return (
    <PresentationShell
      exportMode={exportMode}
      exportScene={exportScene}
      hideChrome={hideChrome}
    />
  );
}
