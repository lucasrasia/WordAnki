import { useEffect, useState } from "react";
import { createWord, deleteWord, updateWord } from "../api.js";

const emptyForm = { nome: "", traducao: "", frase: "" };

export default function Adicionar({ editingWord, onSaved }) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (editingWord) {
      setForm({
        nome: editingWord.nome || "",
        traducao: editingWord.traducao || "",
        frase: editingWord.frase || "",
      });
      setToast("");
      setFeedback("");
      return;
    }

    setForm(emptyForm);
  }, [editingWord]);

  useEffect(() => {
    if (!toast) return undefined;

    const timeout = setTimeout(() => {
      setToast("");
      setFeedback("");
    }, 2500);

    return () => clearTimeout(timeout);
  }, [toast]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setToast("");

    const payload = {
      nome: form.nome.trim(),
      traducao: form.traducao.trim(),
    };
    const frase = form.frase.trim();

    if (!payload.nome || !payload.traducao) {
      setToast("Preencha palavra e tradução");
      setFeedback("error");
      return;
    }

    if (editingWord || frase) {
      payload.frase = frase;
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
      setFeedback("success");
      onSaved?.(editingWord ? "updated" : "added");
    } catch {
      setToast("Erro ao salvar");
      setFeedback("error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!editingWord) return;

    try {
      setDeleting(true);
      setToast("");
      await deleteWord(editingWord.id);
      setForm(emptyForm);
      setToast("Palavra deletada.");
      setFeedback("delete");
      onSaved?.("deleted");
    } catch {
      setToast("Erro ao deletar");
      setFeedback("error");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <section
      className={`flex flex-1 flex-col ${
        feedback === "success" || feedback === "delete"
          ? "animate-[save-pulse_220ms_ease-out]"
          : ""
      }`}
    >
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
          disabled={saving || deleting}
          className="mt-2 h-12 w-full rounded-lg bg-blue text-base font-medium text-primary transition active:scale-[0.98] disabled:opacity-60"
        >
          {saving ? "Salvando..." : "Salvar"}
        </button>

        {editingWord ? (
          <button
            type="button"
            onClick={handleDelete}
            disabled={saving || deleting}
            className="h-12 w-full rounded-lg border border-muted bg-surface-alt text-base font-medium text-primary transition active:scale-[0.98] disabled:opacity-60"
          >
            {deleting ? "Deletando..." : "Deletar palavra"}
          </button>
        ) : null}
      </form>

      {toast ? (
        <p
          className={`mt-4 rounded-lg px-4 py-3 text-sm font-medium animate-[action-pop_260ms_ease-out] ${
            feedback === "success"
              ? "border border-blue bg-blue text-primary shadow-[0_10px_28px_rgba(62,123,250,0.28)]"
              : feedback === "delete"
                ? "border border-blue-dim bg-blue-dim text-primary shadow-[0_10px_28px_rgba(42,78,140,0.32)]"
                : "border border-muted bg-surface text-muted"
          }`}
        >
          {toast}
        </p>
      ) : null}
    </section>
  );
}
