import { PresentationShell } from "@/components/presentation/PresentationShell";

type PageProps = {
  searchParams: Promise<{ export?: string; scene?: string; chrome?: string }>;
};

export default async function V4Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const exportMode = params.export === "1";
  const hideChrome = exportMode && params.chrome !== "1";
  const initialScene =
    params.scene !== undefined && !Number.isNaN(Number(params.scene))
      ? Number(params.scene)
      : 0;

  return (
    <PresentationShell
      theme="v4"
      exportMode={exportMode}
      initialScene={initialScene}
      hideChrome={hideChrome}
    />
  );
}
