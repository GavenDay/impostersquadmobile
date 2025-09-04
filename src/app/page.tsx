import dynamic from "next/dynamic";
import { LoadingComponent } from "@/components/LoadingComponent";

const ImposterAppComponent = dynamic(
  () => import("@/components/ImposterAppComponent").then((mod) => mod.ImposterAppComponent),
  {
    ssr: false,
    loading: () => <LoadingComponent />,
  }
);

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-28">
      <ImposterAppComponent />
    </main>
  );
}
