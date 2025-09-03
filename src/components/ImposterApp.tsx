"use client";

import dynamic from "next/dynamic";
import { LoadingComponent } from "./LoadingComponent";

const ImposterAppComponent = dynamic(
  () =>
    import("./ImposterAppComponent").then((mod) => mod.ImposterAppComponent),
  {
    ssr: false,
    loading: () => <LoadingComponent />,
  }
);

export function ImposterApp() {
  return <ImposterAppComponent />;
}
