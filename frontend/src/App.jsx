import { useState } from "react";
import TabBar from "./components/TabBar.jsx";
import Estudar from "./screens/Estudar.jsx";
import Palavras from "./screens/Palavras.jsx";
import Adicionar from "./screens/Adicionar.jsx";

export default function App() {
  const [tab, setTab] = useState("estudar");
  const [editingWord, setEditingWord] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [notice, setNotice] = useState(null);

  function openEditor(word) {
    setEditingWord(word);
    setTab("adicionar");
  }

  function finishSave(action) {
    setEditingWord(null);
    setRefreshKey((key) => key + 1);
    if (action === "deleted") {
      setNotice({ message: "Palavra deletada.", tone: "delete", id: Date.now() });
      setTab("palavras");
    }
  }

  function changeTab(nextTab) {
    if (nextTab === "adicionar") {
      setEditingWord(null);
    }
    setTab(nextTab);
  }

  return (
    <div className="min-h-screen bg-page">
      <main className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col px-5 pb-24 pt-5">
        {tab === "estudar" && <Estudar key={refreshKey} />}
        {tab === "palavras" && (
          <Palavras key={refreshKey} onEditWord={openEditor} notice={notice} />
        )}
        {tab === "adicionar" && (
          <Adicionar editingWord={editingWord} onSaved={finishSave} />
        )}
      </main>
      <TabBar activeTab={tab} onChange={changeTab} />
    </div>
  );
}
