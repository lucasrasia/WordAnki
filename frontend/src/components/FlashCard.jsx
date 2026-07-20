import { useState } from "react";

export default function FlashCard({ word, onReview, disabled }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <section className="flex flex-1 flex-col justify-center gap-5">
      <button
        type="button"
        onClick={() => setFlipped(true)}
        className="h-[58vh] min-h-[360px] w-full rounded-2xl border border-line bg-surface p-0 text-left [perspective:1000px]"
        aria-label={flipped ? "Verso do card" : "Virar card"}
      >
        <div
          className={`relative h-full w-full rounded-2xl transition-transform duration-[400ms] ease-out [transform-style:preserve-3d] ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center [backface-visibility:hidden]">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              {word.nome}
            </h1>
            <p className="text-sm text-muted">toque para virar</p>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p className="text-3xl font-semibold leading-tight">
              {word.traducao}
            </p>
            {word.frase ? (
              <p className="max-w-sm text-base leading-relaxed text-muted">
                {word.frase}
              </p>
            ) : null}
          </div>
        </div>
      </button>

      {flipped ? (
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onReview("errei")}
            disabled={disabled}
            className="h-12 rounded-lg border border-muted bg-surface-alt text-sm font-medium text-primary disabled:opacity-60"
          >
            Errei
          </button>
          <button
            type="button"
            onClick={() => onReview("dificil")}
            disabled={disabled}
            className="h-12 rounded-lg bg-blue-dim text-sm font-medium text-primary disabled:opacity-60"
          >
            Dificil
          </button>
          <button
            type="button"
            onClick={() => onReview("facil")}
            disabled={disabled}
            className="h-12 rounded-lg bg-blue text-sm font-medium text-primary disabled:opacity-60"
          >
            Facil
          </button>
        </div>
      ) : null}
    </section>
  );
}
