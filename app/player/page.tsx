"use client";
import { Suspense } from "react";
import PlayerClient from "./PlayerClient";

export default function PlayerPage() {
  return (
    <Suspense fallback={<div>Loading player...</div>}>
      <PlayerClient />
    </Suspense>
  );
}
