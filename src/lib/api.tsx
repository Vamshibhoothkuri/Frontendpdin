// src/lib/api.ts
const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

function getToken() {
  return localStorage.getItem("token");
}

export const api = {
  // ── AUTH ──────────────────────────────────────────────
  async register(username: string, password: string) {
    const res = await fetch(`${BASE}/admin/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return res.json();
  },

  async login(username: string, password: string) {
    const res = await fetch(`${BASE}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
    }
    return data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  },

  isLoggedIn() {
    return !!localStorage.getItem("token");
  },

  getUsername() {
    return localStorage.getItem("username") || "";
  },

  // ── UPLOAD ────────────────────────────────────────────
  async uploadImage(file: File) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${BASE}/upload/image`, {
      method: "POST",
      headers: { Authorization: `Bearer ${getToken()}` },
      body: form,
    });
    return res.json(); // { url: "..." }
  },

  async uploadVideo(file: File) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${BASE}/upload/video`, {
      method: "POST",
      headers: { Authorization: `Bearer ${getToken()}` },
      body: form,
    });
    return res.json(); // { url: "..." }
  },

  // ── GALLERY ───────────────────────────────────────────
  async getGallery() {
    const res = await fetch(`${BASE}/gallery`);
    return res.json(); // GalleryItem[]
  },

  async addGalleryItem(item: {
    // name: string;
    // url: string;
    // type: "image" | "video";
    // category: string;
    // service?: string;
    id: string;

  name: string;

  url: string;

  type: "image" | "video";

  category: string;

  section?: string;

  designType?: string;

  service?: string;
  }) {
    const res = await fetch(`${BASE}/gallery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(item),
    });
    return res.json();
  },

  async deleteGalleryItem(id: string) {
    const res = await fetch(`${BASE}/gallery/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.json();
  },

    // ── ENQUIRIES ────────────────────────────────────────

  async getEnquiries() {
    const res = await fetch(`${BASE}/enquiries`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res.json();
  },

  async addEnquiry(item: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    projectType?: string;
    message: string;
  }) {
    const res = await fetch(`${BASE}/enquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    return res.json();
  },

  async deleteEnquiry(id: string) {
    const res = await fetch(`${BASE}/enquiries/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res.json();
  },
};


