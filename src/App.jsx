/*
  Dosya: src/App.jsx
  Açıklama: Vite + React (JavaScript) projesi için geliştirilmiş Todo Uygulaması.
  Özellikler:
  - Türkçe değişkenler ve yorumlar
  - LocalStorage kaydı
  - Görev ekleme, düzenleme, silme, tamamlandı işareti
  - Modern arayüz, animasyon, responsive tasarım
  - Sağ tarafta yazılımla ilgili motto alanı
*/

import React, { useState, useEffect, useRef } from "react";

// 🎨 CSS-in-JS stiller
const stiller = {
  sayfa: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(180deg,#eef2ff 0%,#f9f9ff 100%)",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue'",
    overflow: "hidden",
    margin: 0,
    padding: "30px",
    gap: "40px",
    flexWrap: "wrap", // responsive davranış
  },

  kart: {
    flex: "1 1 400px",
    maxWidth: "720px",
    background: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    padding: "24px 28px 32px",
    transition: "all .3s ease",
  },

  mottoKart: {
    flex: "0 1 300px",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    borderRadius: "20px",
    color: "white",
    padding: "32px 28px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    transition: "transform .3s ease",
  },

  mottoBaslik: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "10px",
  },

  mottoAlt: {
    fontSize: "16px",
    opacity: 0.9,
  },

  baslikSatir: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  baslik: {
    fontSize: "24px",
    fontWeight: 700,
    color: "#111827",
  },

  altYazi: { fontSize: "14px", color: "#6b7280" },

  form: {
    display: "flex",
    gap: "10px",
    marginTop: "16px",
  },

  input: {
    flex: 1,
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    outline: "none",
    fontSize: "15px",
    transition: "all .2s ease",
  },

  buton: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    background: "linear-gradient(90deg,#667eea,#764ba2)",
    color: "white",
    transition: "opacity .2s ease, transform .15s ease",
  },

  filtreSatir: {
    display: "flex",
    gap: "8px",
    marginTop: "16px",
    flexWrap: "wrap",
  },

  filtreBtn: (aktif) => ({
    padding: "8px 14px",
    borderRadius: "999px",
    border: aktif ? "2px solid #6366f1" : "1px solid #e5e7eb",
    background: aktif ? "rgba(99,102,241,0.08)" : "transparent",
    cursor: "pointer",
    fontSize: "13px",
    color: aktif ? "#4338ca" : "#374151",
    transition: "all .2s ease",
  }),

  liste: {
    marginTop: "18px",
    display: "grid",
    gap: "10px",
  },

  görevKart: (tamam) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    background: tamam ? "#f3f4f6" : "#fff",
    transition: "transform .15s ease, background .2s ease",
    boxShadow: tamam ? "none" : "0 2px 6px rgba(0,0,0,0.03)",
  }),

  sol: { display: "flex", alignItems: "center", gap: "12px" },

  check: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "1px solid #d1d5db",
    background: "#fff",
    fontSize: "16px",
  },

  görevMetin: (tamam) => ({
    fontSize: "15px",
    color: tamam ? "#6b7280" : "#111827",
    textDecoration: tamam ? "line-through" : "none",
    transition: "color .2s ease",
  }),

  eylemler: { display: "flex", gap: "8px", alignItems: "center" },

  ikonBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "16px",
    transition: "transform .2s ease",
  },

  bosYazi: {
    padding: "18px",
    borderRadius: "12px",
    border: "1px dashed #dbeafe",
    color: "#6b7280",
    textAlign: "center",
    background: "#f9fafb",
  },
};

// LocalStorage anahtarı
const STORAGE_KEY = "todo-app-vite-js";

export default function App() {
  const [gorevler, setGorevler] = useState([]);
  const [girdi, setGirdi] = useState("");
  const [filtre, setFiltre] = useState("tumu");
  const düzenlenecekRef = useRef(null);

  // LocalStorage'dan yükle
  useEffect(() => {
    const kayit = localStorage.getItem(STORAGE_KEY);
    if (kayit) setGorevler(JSON.parse(kayit));
  }, []);

  // LocalStorage'a kaydet
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gorevler));
  }, [gorevler]);

  // Görev ekle veya düzenle
  function ekleVeyaGuncelle(e) {
    e.preventDefault();
    const trimText = girdi.trim();
    if (!trimText) return;

    const düzenlenecekId = düzenlenecekRef.current;
    if (düzenlenecekId) {
      setGorevler((prev) =>
        prev.map((g) => (g.id === düzenlenecekId ? { ...g, text: trimText } : g))
      );
      düzenlenecekRef.current = null;
      setGirdi("");
      return;
    }

    const yeni = {
      id: Date.now().toString(),
      text: trimText,
      tamamlandi: false,
      createdAt: new Date().toISOString(),
    };
    setGorevler((prev) => [yeni, ...prev]);
    setGirdi("");
  }

  // Sil
  const sil = (id) => setGorevler((prev) => prev.filter((g) => g.id !== id));

  // Tamamlandı değiştir
  const toggleTamam = (id) =>
    setGorevler((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, tamamlandi: !g.tamamlandi } : g
      )
    );

  // Düzenle
  const düzenle = (id) => {
    const hedef = gorevler.find((g) => g.id === id);
    if (!hedef) return;
    düzenlenecekRef.current = id;
    setGirdi(hedef.text);
  };

  // Filtrele
  const filtreli = gorevler.filter((g) => {
    if (filtre === "aktif") return !g.tamamlandi;
    if (filtre === "tamam") return g.tamamlandi;
    return true;
  });

  // Hepsini temizle
  const hepsiniTemizle = () => {
    if (!confirm("Tüm görevleri silmek istiyor musunuz?")) return;
    setGorevler([]);
  };

  return (
    <div style={stiller.sayfa}>
      {/* Sol: Todo Uygulaması */}
      <div style={stiller.kart}>
        <div style={stiller.baslikSatir}>
          <div>
            <div style={stiller.baslik}>Yapılacaklar (Todo) 🌟</div>
            <div style={stiller.altYazi}>
              Modern ve sade arayüz. Veriler tarayıcıda saklanır.
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "13px", color: "#6b7280" }}>
              {gorevler.length} görev
            </div>
            <button
              onClick={hepsiniTemizle}
              style={{
                ...stiller.ikonBtn,
                color: "#dc2626",
                fontSize: "13px",
                marginTop: "4px",
              }}
            >
              🗑️ Hepsini sil
            </button>
          </div>
        </div>

        {/* Form */}
        <form style={stiller.form} onSubmit={ekleVeyaGuncelle}>
          <input
            style={stiller.input}
            placeholder="Yeni görev ekle..."
            value={girdi}
            onChange={(e) => setGirdi(e.target.value)}
          />
          <button style={stiller.buton} type="submit">
            {düzenlenecekRef.current ? "Güncelle" : "Ekle"}
          </button>
        </form>

        {/* Filtreler */}
        <div style={stiller.filtreSatir}>
          <button
            style={stiller.filtreBtn(filtre === "tumu")}
            onClick={() => setFiltre("tumu")}
          >
            Tümü
          </button>
          <button
            style={stiller.filtreBtn(filtre === "aktif")}
            onClick={() => setFiltre("aktif")}
          >
            Aktif
          </button>
          <button
            style={stiller.filtreBtn(filtre === "tamam")}
            onClick={() => setFiltre("tamam")}
          >
            Tamamlanan
          </button>
        </div>

        {/* Görev listesi */}
        <div style={stiller.liste}>
          {filtreli.length === 0 ? (
            <div style={stiller.bosYazi}>
              Henüz görev yok — bir tane ekleyin ✨
            </div>
          ) : (
            filtreli.map((g) => (
              <div key={g.id} style={stiller.görevKart(g.tamamlandi)}>
                <div style={stiller.sol}>
                  <div
                    style={stiller.check}
                    onClick={() => toggleTamam(g.id)}
                    title="Tamamla / Geri al"
                  >
                    {g.tamamlandi ? "✅" : "○"}
                  </div>
                  <div style={stiller.görevMetin(g.tamamlandi)}>{g.text}</div>
                </div>

                <div style={stiller.eylemler}>
                  <button
                    title="Düzenle"
                    onClick={() => düzenle(g.id)}
                    style={stiller.ikonBtn}
                  >
                    ✏️
                  </button>
                  <button
                    title="Sil"
                    onClick={() => sil(g.id)}
                    style={stiller.ikonBtn}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Sağ: Motto Alanı */}
      <div style={stiller.mottoKart}>
        <div style={stiller.mottoBaslik}>“ Listeni oluştur ve adım adım ilerle♥✨”</div>
        <div style={stiller.mottoAlt}>
          Kendine İnan .
        </div>
      </div>
    </div>
  );
}
