import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { getStudyWords, reviewWord } from "../api.js";
import FlashCard from "../components/FlashCard.jsx";

export default function Estudar() {
  const [words, setWords] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [reviewing, setReviewing] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        const data = await getStudyWords();
        if (active) setWords(Array.isArray(data) ? data : []);
      } catch {
        if (active) setToast("Nao foi possivel conectar");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  async function handleReview(nota) {
    const word = words[index];
    if (!word) return;

    try {
      setReviewing(true);
      await reviewWord(word.id, nota);
      setWords((current) => current.filter((item) => item.id !== word.id));
      setIndex(0);
    } catch {
      setToast("Erro ao avaliar");
    } finally {
      setReviewing(false);
    }
  }

  const remaining = words.length;
  const current = words[index];

  return (
    <div className="flex min-h-[calc(100vh-7rem)] flex-1 flex-col">
      <header className="mb-4">
        <p className="text-sm text-muted">
          {loading ? "carregando" : `${remaining} restantes hoje`}
        </p>
      </header>

      {loading ? (
        <div className="flex flex-1 items-center justify-center text-muted">
          Carregando...
        </div>
      ) : current ? (
        <FlashCard
          key={current.id}
          word={current}
          onReview={handleReview}
          disabled={reviewing}
        />
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <Flame size={34} className="text-muted" />
          <p className="max-w-xs text-base text-primary">
            Nenhuma palavra pra revisar agora. Volta mais tarde.
          </p>
        </div>
      )}

      {toast ? (
        <p className="mt-4 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-muted">
          {toast}
        </p>
      ) : null}
    </div>
  );
}
