import { useEffect, useMemo, useState } from "react";
import { getAllWords } from "../api.js";
import WordListItem from "../components/WordListItem.jsx";

export default function Palavras({ onEditWord }) {
  const [words, setWords] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        const data = await getAllWords();
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

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return words;
    return words.filter((word) =>
      `${word.nome} ${word.traducao}`.toLowerCase().includes(term)
    );
  }, [search, words]);

  return (
    <section className="flex flex-1 flex-col">
      <header className="mb-4">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar palavra"
          className="h-12 w-full rounded-lg border border-line bg-surface px-4 text-base text-primary placeholder:text-muted"
        />
      </header>

      {loading ? (
        <div className="flex flex-1 items-center justify-center text-muted">
          Carregando...
        </div>
      ) : filtered.length ? (
        <div>
          {filtered.map((word) => (
            <WordListItem key={word.id} word={word} onClick={onEditWord} />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center text-center text-muted">
          Nenhuma palavra encontrada.
        </div>
      )}

      {toast ? (
        <p className="mt-4 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-muted">
          {toast}
        </p>
      ) : null}
    </section>
  );
}
