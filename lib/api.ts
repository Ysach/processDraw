const BASE_URL = "http://localhost"; // <- 改成你的后端域名

export async function saveDiagram(data: { name: string; content: any }) {
  return fetch(`${BASE_URL}/diagram/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then((res) => res.json());
}

export async function getDiagramList() {
  return fetch(`${BASE_URL}/diagram/list`).then((res) => res.json());
}

export async function getDiagramById(id: string) {
  return fetch(`${BASE_URL}/diagram?id=${id}`).then((res) => res.json());
}
