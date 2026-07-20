const API_BASE_URL = import.meta.env.VITE_API_URL || "";
const TIMEOUT_MS = 8000;

async function request(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json", ...options.headers },
      signal: controller.signal,
      ...options,
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      const message = payload?.detail || "Nao foi possivel completar a acao";
      throw new Error(message);
    }

    return payload;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Nao foi possivel conectar");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export function getStudyWords() {
  return request("/palavras/estudar");
}

export function getAllWords() {
  return request("/palavras/analise");
}

export function createWord(data) {
  return request("/palavras", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateWord(id, data) {
  return request(`/palavras/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteWord(id) {
  return request(`/palavras/${id}`, { method: "DELETE" });
}

export function reviewWord(id, nota) {
  return request(`/palavras/${id}/review`, {
    method: "POST",
    body: JSON.stringify({ nota }),
  });
}
