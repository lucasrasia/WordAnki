import { Flame, List, Plus } from "lucide-react";

const tabs = [
  { id: "estudar", label: "Estudar", Icon: Flame },
  { id: "adicionar", label: "Adicionar", Icon: Plus },
  { id: "palavras", label: "Palavras", Icon: List },
];

export default function TabBar({ activeTab, onChange }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 border-t border-line bg-surface">
      <div className="mx-auto grid h-20 max-w-[480px] grid-cols-3 px-2">
        {tabs.map(({ id, label, Icon }) => {
          const active = activeTab === id;
          const primary = id === "adicionar";
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={`flex flex-col items-center justify-center gap-1 rounded text-sm font-medium ${
                primary
                  ? "text-primary"
                  : active
                    ? "text-blue"
                    : "text-muted"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <span
                className={
                  primary
                    ? `flex h-12 w-12 items-center justify-center rounded-full ${
                        active ? "bg-blue" : "bg-blue-dim"
                      }`
                    : ""
                }
              >
                <Icon size={primary ? 26 : 22} strokeWidth={2.2} />
              </span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
