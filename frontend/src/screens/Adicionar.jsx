import { useEffect, useState } from "react";
import { createWord, updateWord } from "../api.js";

const emptyForm = { nome: "", traducao: "", frase: "" };

export default function Adicionar({ editingWord, onSaved }) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (editingWord) {
      setForm({
        nome: editingWord.nome || "",
        traducao: editingWord.traducao || "",
        frase: editingWord.frase || "",
      });
      setToast("");
      return;
    }

    setForm(emptyForm);
  }, [editingWord]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setToast("");

    const payload = {
      nome: form.nome.trim(),
      traducao: form.traducao.trim(),
      frase: form.frase.trim(),
    };

    if (!payload.nome || !payload.traducao) {
      setToast("Preencha palavra e tradução");
      return;
    }

    try {
      setSaving(true);
      if (editingWord) {
        await updateWord(editingWord.id, payload);
        setToast("Palavra atualizada.");
      } else {
        await createWord(payload);
        setForm(emptyForm);
        setToast("Palavra adicionada.");
      }
      onSaved?.();
    } catch {
      setToast("Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="flex flex-1 flex-col">
      <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm font-medium text-primary">
          Palavra
          <input
            value={form.nome}
            onChange={(event) => updateField("nome", event.target.value)}
            placeholder="Digite a palavra"
            className="h-12 rounded-lg border border-line bg-surface px-4 text-base text-primary placeholder:text-muted"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-primary">
          Tradução
          <input
            value={form.traducao}
            onChange={(event) => updateField("traducao", event.target.value)}
            placeholder="Digite a tradução"
            className="h-12 rounded-lg border border-line bg-surface px-4 text-base text-primary placeholder:text-muted"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-primary">
          Frase de exemplo
          <textarea
            value={form.frase}
            onChange={(event) => updateField("frase", event.target.value)}
            rows={4}
            placeholder="Frase em inglês, se quiser"
            className="resize-none rounded-lg border border-line bg-surface px-4 py-3 text-base leading-relaxed text-primary placeholder:text-muted"
          />
        </label>

        <button
          type="submit"
          disabled={saving}
          className="mt-2 h-12 w-full rounded-lg bg-blue text-base font-medium text-primary disabled:opacity-60"
        >
          {saving ? "Salvando..." : "Salvar"}
        </button>
      </form>

      {toast ? (
        <p className="mt-4 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-muted">
          {toast}
        </p>
      ) : null}
    </section>
  );
}
