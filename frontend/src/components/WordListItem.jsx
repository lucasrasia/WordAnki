function dueLabel(dueDate) {
  const today = new Date();
  const target = new Date(`${dueDate}T00:00:00`);
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diff = Math.round((target - start) / 86400000);

  if (diff < 0) return { label: "atrasada", overdue: true };
  if (diff === 0) return { label: "hoje", overdue: false };
  if (diff === 1) return { label: "amanha", overdue: false };
  return { label: `em ${diff} dias`, overdue: false };
}

export default function WordListItem({ word, onClick }) {
  const due = dueLabel(word.due_date);
  const filled = Math.min(Math.max(Number(word.step) + 1, 0), 10);

  return (
    <button
      type="button"
      onClick={() => onClick(word)}
      className="w-full border-b border-line py-4 text-left"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-base font-medium text-primary">
            {word.nome}
          </p>
          <p className="truncate text-sm text-muted">{word.traducao}</p>
        </div>
        <span
          className={`shrink-0 text-sm ${
            due.overdue ? "text-blue-dim" : "text-muted"
          }`}
        >
          {due.label}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-10 gap-1">
        {Array.from({ length: 10 }).map((_, index) => (
          <span
            key={index}
            className={`h-1 rounded-full ${
              index < filled ? "bg-blue" : "bg-surface-alt"
            }`}
          />
        ))}
      </div>
    </button>
  );
}
