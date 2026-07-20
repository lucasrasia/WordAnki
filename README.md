# WordAnki

Aplicativo de aprendizado de vocabulário em inglês com repetição espaçada. Você adiciona palavras, estuda com flashcards e o sistema decide automaticamente quando cada palavra deve aparecer de novo — mais cedo se você errou, mais tarde se acertou com facilidade.

## Como funciona

O progresso de cada palavra segue uma escada de intervalos fixos (1 → 3 → 7 → 14 → 30 → 90 dias). A cada revisão você avalia seu desempenho:

- **Errei** — reseta o progresso, a palavra volta amanhã
- **Difícil** — recua um degrau
- **Fácil** — avança um degrau

## Stack

**Backend**
- Python + FastAPI
- SQLAlchemy + SQLite

**Frontend**
- React + Vite
- Tailwind CSS

## Estrutura do projeto

```
wordanki/
├── backend/
│   ├── database.py     # engine e sessão
│   ├── models.py       # tabelas Palavra e Status
│   ├── crud.py         # lógica de negócio
│   └── main.py         # rotas da API
└── frontend/
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── api.js
        ├── index.css
        ├── components/
        │   ├── FlashCard.jsx
        │   ├── TabBar.jsx
        │   └── WordListItem.jsx
        └── screens/
            ├── Estudar.jsx
            ├── Palavras.jsx
            └── Adicionar.jsx
```

## Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/palavras/estudar` | Palavras agendadas para hoje |
| `GET` | `/palavras/analise` | Progresso de todas as palavras |
| `GET` | `/palavras` | Lista todas as palavras |
| `POST` | `/palavras` | Adiciona uma palavra nova |
| `PATCH` | `/palavras/{id}` | Edita uma palavra |
| `DELETE` | `/palavras/{id}` | Remove uma palavra |
| `POST` | `/palavras/{id}/review` | Registra resultado da revisão (`errei` / `dificil` / `facil`) |

## Rodando o projeto

**Backend**

```bash
cd backend
pip install fastapi uvicorn sqlalchemy
uvicorn main:app --reload
```

A documentação interativa da API fica disponível em `http://localhost:8000/docs`.

**Frontend**

```bash
cd frontend
npm install
npm run dev
```