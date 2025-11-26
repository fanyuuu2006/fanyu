"use client";
import { useModal } from "@/hooks/useModal";
import { TimerCard } from "./TimerCard";
import { useState } from "react";

export const MainSection = () => {
  const modal = useModal({});
  const [count, setCount] = useState(0);
  return (
    <section
      id="hero"
      style={
        {
          "--bg": 'url("/cbg.jpg")',
        } as React.CSSProperties
      }
    >
      <div className="container flex flex-col items-center justify-center min-h-154">
        <TimerCard />
        <button
          className="btn-primary font-bold px-4 py-2 rounded-full"
          onClick={modal.open}
        >
          Test Button
        </button>
      </div>
      <modal.Container>
        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
          <p>This is the content of the modal.</p>
          <div className="flex gap-1">
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
