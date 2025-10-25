/* src/App.jsx */
import React, { useEffect, useState } from "react";

/* -------------------- STILLER -------------------- */
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
    overflow: "auto",
    margin: 0,
    padding: "30px",
  },
  konteyner: {
    display: "flex",
    gap: "32px",
    alignItems: "flex-start",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: "1100px",
    justifyContent: "center",
  },
  kart: {
    flex: "1 1 560px",
    maxWidth: "720px",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    padding: "22px",
  },
  mottoKart: {
    flex: "0 1 300px",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    borderRadius: "16px",
    color: "white",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  baslikSatir: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "14px",
  },
  baslik: { fontSize: "22px", fontWeight: 700, color: "#111827" },
  altYazi: { fontSize: "13px", color: "#6b7280" },
  form: { display: "flex", gap: "10px", marginTop: "10px" },
  input: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    outline: "none",
    fontSize: "15px",
  },
  buton: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    background: "linear-gradient(90deg,#667eea,#764ba2)",
    color: "white",
  },
  filtreSatir: { display: "flex", gap: "8px", marginTop: "12px" },
  filtreBtn: (aktif) => ({
    padding: "8px 12px",
    borderRadius: "999px",
    border: aktif ? "2px solid #6366f1" : "1px solid #e5e7eb",
    background: aktif ? "rgba(99,102,241,0.08)" : "transparent",
    cursor: "pointer",
    fontSize: "13px",
    color: "#111827",
  }),
  liste: { marginTop: "16px", display: "grid", gap: "10px" },
  görevKart: (tamam) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    background: tamam ? "#f3f4f6" : "#fff",
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
  }),
  eylemler: { display: "flex", gap: "8px", alignItems: "center" },
  ikonBtn: { // Varsayılan ikon butonu
    border: "none",
    background: "#f3f4f6",
    borderRadius: "6px",
    padding: "4px 6px",
    cursor: "pointer",
    fontSize: "13px",
  },
  duzenleBtn: { // DÜZENLE butonu için yeni stil
    border: "1px solid #f59e0b",
    background: "#fffbeb",
    color: "#f59e0b",
    borderRadius: "6px",
    padding: "4px 6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
  },
  silBtn: { // SİL butonu için yeni stil
    border: "1px solid #ef4444",
    background: "#fef2f2",
    color: "#ef4444",
    borderRadius: "6px",
    padding: "4px 6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
  },
  bosYazi: {
    padding: "18px",
    borderRadius: "12px",
    border: "1px dashed #dbeafe",
    color: "#6b7280",
    textAlign: "center",
    background: "#f9fafb",
  },
  toastKutu: {
    position: "fixed",
    top: "22px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 9999,
    minWidth: "220px",
    padding: "10px 16px",
    borderRadius: "10px",
    color: "#fff",
    boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
    textAlign: "center",
  },
  onayKapsayici: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9998,
  },
  onayKutusu: {
    width: "360px",
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  onayBaslik: { // Metin rengi güncellendi
    fontSize: "18px", 
    fontWeight: 600, 
    marginBottom: "14px",
    color: "#1f2937", 
  },
  onayButonSatir: { display: "flex", gap: "12px", justifyContent: "center" },
  evetBtn: {
    background: "#10b981",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 600,
  },
  hayirBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 600,
  },
  editKutu: {
    width: "420px",
    background: "#fff",
    borderRadius: "12px",
    padding: "18px",
    textAlign: "left",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  editInput: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    marginTop: "8px",
    fontSize: "15px",
  },
  editBtnSatir: { display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "12px" },
  editKaydetBtn: {
    background: "linear-gradient(90deg,#667eea,#764ba2)",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
  },
  editIptalBtn: {
    background: "#f3f4f6",
    color: "#111",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
  },
};

/* -------------------- SABİTLER -------------------- */
const STORAGE_KEY = "todo-app-vite-js";

/* -------------------- Yardımcı Bileşenler -------------------- */
function Toast({ tip = "bilgi", mesaj }) {
  const bg = tip === "sil" ? "#ef4444" : tip === "güncelle" ? "#f59e0b" : "#10b981";
  return <div style={{ ...stiller.toastKutu, background: bg }}>{mesaj}</div>;
}

function ConfirmModal({ mesaj, onCancel, onConfirm }) {
  return (
    <div style={stiller.onayKapsayici}>
      <div style={stiller.onayKutusu}>
        {/* Metin rengi stiller.onayBaslik içinde ayarlandı */}
        <div style={stiller.onayBaslik}>{mesaj}</div> 
        <div style={stiller.onayButonSatir}>
          <button style={stiller.evetBtn} onClick={onConfirm}>Evet</button>
          <button style={stiller.hayirBtn} onClick={onCancel}>Hayır</button>
        </div>
      </div>
    </div>
  );
}

function EditModal({ initialValue = "", onCancel, onSave }) {
  const [val, setVal] = useState(initialValue);
  return (
    <div style={stiller.onayKapsayici}>
      <div style={stiller.editKutu}>
        <div style={{ fontSize: 18, fontWeight: 600 }}>Görevi düzenle</div>
        <input
          style={stiller.editInput}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Görev metnini yaz veya düzenle..."
        />
        <div style={stiller.editBtnSatir}>
          <button style={stiller.editIptalBtn} onClick={onCancel}>İptal</button>
          <button 
            style={stiller.editKaydetBtn} 
            onClick={() => onSave(val.trim())}
          >
            Güncelle
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Ana App -------------------- */
export default function App() {
  const [gorevler, setGorevler] = useState([]);
  const [yeniGirdi, setYeniGirdi] = useState("");
  const [filtre, setFiltre] = useState("tumu");
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [editState, setEditState] = useState(null);

  useEffect(() => {
    const kayit = localStorage.getItem(STORAGE_KEY);
    if (kayit) setGorevler(JSON.parse(kayit));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gorevler));
  }, [gorevler]);

  function showToast(mesaj, tip = "bilgi") {
    setToast({ mesaj, tip });
    setTimeout(() => setToast(null), 2500);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const text = yeniGirdi.trim();
    if (!text) return;
    setConfirm({
      mesaj: `"${text}" görevini listenize eklemek istiyor musunuz?`,
      onConfirm: () => {
        const yeni = { id: Date.now().toString(), text, tamamlandi: false };
        setGorevler((p) => [yeni, ...p]);
        setYeniGirdi("");
        showToast("Görev kaydedildi ✅");
        setConfirm(null);
      },
      onCancel: () => setConfirm(null),
    });
  }

  function handleDelete(id) {
    const hedef = gorevler.find((g) => g.id === id);
    if (!hedef) return;
    setConfirm({
      mesaj: `"${hedef.text}" görevini silmek istediğinizden emin misiniz?`,
      onConfirm: () => {
        setGorevler((p) => p.filter((x) => x.id !== id));
        showToast("Görev silindi 🗑️", "sil");
        setConfirm(null);
      },
      onCancel: () => setConfirm(null),
    });
  }

  function handleEditOpen(id) {
    const hedef = gorevler.find((g) => g.id === id);
    if (!hedef) return;
    setEditState({ id, initial: hedef.text });
  }

  function handleEditSave(newText) {
    if (!newText) {
      setEditState(null); 
      return;
    }

    const eskiText = editState.initial;
    
    // Eğer metin değişmediyse hemen kapat
    if (newText === eskiText) {
        setEditState(null);
        return;
    }
    
    // Edit modalını hemen kapat ki Confirm modalı tek kalsın
    setEditState(null);

    setConfirm({
      mesaj: `Görevi "${newText}" olarak güncellemek istediğinizden emin misiniz?`,
      onConfirm: () => {
        setGorevler((p) =>
          p.map((g) =>
            g.id === editState.id ? { ...g, text: newText } : g
          )
        );
        showToast(`Başarıyla "${newText}" olarak güncellendi ✏️`, "güncelle");
        setConfirm(null); 
      },
      onCancel: () => {
        setConfirm(null);
      }
    });
  }

  function handleToggle(id) {
    setGorevler((p) => p.map((g) => (g.id === id ? { ...g, tamamlandi: !g.tamamlandi } : g)));
  }

  function handleClearAll() {
    if (gorevler.length === 0) return;
    setConfirm({
      mesaj: "Tüm görevleri kalıcı olarak silmek istediğinizden emin misiniz?",
      onConfirm: () => {
        setGorevler([]);
        showToast("Tüm görevler temizlendi 🧹", "sil");
        setConfirm(null);
      },
      onCancel: () => setConfirm(null),
    });
  }

  const filtreli = gorevler.filter((g) => {
    if (filtre === "aktif") return !g.tamamlandi;
    if (filtre === "tamam") return g.tamamlandi;
    return true;
  });

  return (
    <div style={stiller.sayfa}>
      {toast && <Toast mesaj={toast.mesaj} tip={toast.tip} />}
      <div style={stiller.konteyner}>
        <div style={stiller.kart}>
          <div style={stiller.baslikSatir}>
            <div>
              <div style={stiller.baslik}>Yapılacaklar (Todo) 🌟</div>
              <div style={stiller.altYazi}>Modern, onay modalı ve bildirimli arayüz.</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{gorevler.length} görev</div>
              <button onClick={handleClearAll} style={{ ...stiller.ikonBtn, color: "#dc2626" }}>
                🗑️ Tümünü Sil
              </button>
            </div>
          </div>

          <form style={stiller.form} onSubmit={handleSubmit}>
            <input
              style={stiller.input}
              placeholder="Yeni görev ekle..."
              value={yeniGirdi}
              onChange={(e) => setYeniGirdi(e.target.value)}
            />
            <button style={stiller.buton} type="submit">Ekle</button>
          </form>

          <div style={stiller.filtreSatir}>
            <button style={stiller.filtreBtn(filtre === "tumu")} onClick={() => setFiltre("tumu")}>Tümü</button>
            <button style={stiller.filtreBtn(filtre === "aktif")} onClick={() => setFiltre("aktif")}>Aktif</button>
            <button style={stiller.filtreBtn(filtre === "tamam")} onClick={() => setFiltre("tamam")}>Tamamlanan</button>
          </div>

          <div style={stiller.liste}>
            {filtreli.length === 0 ? (
              <div style={stiller.bosYazi}>Henüz görev yok — bir tane ekleyin ✨</div>
            ) : (
              filtreli.map((g) => (
                <div key={g.id} style={stiller.görevKart(g.tamamlandi)}>
                  <div style={stiller.sol}>
                    <div style={stiller.check} onClick={() => handleToggle(g.id)} title="Tamamla / Geri al">
                      {g.tamamlandi ? "✅" : "○"}
                    </div>
                    <div style={stiller.görevMetin(g.tamamlandi)}>{g.text}</div>
                  </div>
                  <div style={stiller.eylemler}>
                    <button style={stiller.duzenleBtn} onClick={() => handleEditOpen(g.id)}>✏️ Düzenle</button>
                    <button style={stiller.silBtn} onClick={() => handleDelete(g.id)}>🗑️ Sil</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div style={stiller.mottoKart}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>“Listeni oluştur ve adım adım ilerle ♥✨”</div>
          <div style={{ opacity: 0.95 }}>Kendine inan.</div>
        </div>
      </div>

      {confirm && (
        <ConfirmModal
          mesaj={confirm.mesaj}
          onCancel={confirm.onCancel} 
          onConfirm={confirm.onConfirm}
        />
      )}

      {editState && (
        <EditModal
          initialValue={editState.initial}
          onCancel={() => setEditState(null)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
}