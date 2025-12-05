"use client";
import { useModal } from "@/hooks/useModal";
import { useState } from "react";

import { TimerCard } from "./TimerCard";

export const MainSection = ({ bg }: { bg: string }) => {
  const modal = useModal({});
  const [count, setCount] = useState(0);

  return (
    <section id="hero" style={{ "--bg": `url(${bg})` } as React.CSSProperties}>
      <div className="container flex flex-col items-center justify-center min-h-screen">
        <TimerCard />
        <button
          className="btn-primary font-bold px-4 py-2 rounded-full"
          onClick={modal.open}
        >
          Test Button
        </button>
      </div>
      <modal.Container className="flex">
        <div className="card p-6 m-auto">
          <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
          <p>This is the content of the modal.</p>
          <div className="flex gap-2">
            <button
              className="btn-secondary mt-4 rounded-full px-4 py-2"
              onClick={() => setCount((prev) => prev + 1)}
            >
              Count: {count}
            </button>
            <button
              className="btn-tertiary mt-4 rounded-full px-4 py-2"
              onClick={modal.close}
            >
              Close
            </button>
          </div>
        </div>
      </modal.Container>
    </section>
  );
};
