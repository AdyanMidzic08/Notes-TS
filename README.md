# Notes-TS-API

Eine einfache Notizen-App, entwickelt mit TypeScript, Express und einem Vanilla-Frontend.

## 🚀 Features

- **Notizen erstellen**: Füge schnell neue Notizen hinzu.
- **Notizen löschen**: Entferne erledigte oder nicht mehr benötigte Notizen.
- **Persistente Speicherung**: Notizen werden gespeichert (lokal via JSON-Datei).
- **Responsive Design**: Optimiert für Desktop und mobile Geräte.
- **REST API**: Backend-Logik über eine RESTful API.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Frontend**: HTML, CSS, JavaScript
- **Tools**: `ts-node-dev` für Hot-Reloading, `uuid` für eindeutige IDs.

## 📦 Installation & Setup

1. **Repository klonen**
   ```bash
   git clone <DEIN_REPO_URL>
   cd Notes-TS-API
   ```

2. **Abhängigkeiten installieren**
   ```bash
   npm install
   ```

3. **Entwicklungsserver starten**
   Startet den Server im Watch-Mode unter `http://localhost:3000`.
   ```bash
   npm run dev
   ```

4. **Build & Start (Produktion)**
   ```bash
   npm run build
   npm start
   ```

## 📡 API Endpoints

| Methode | Pfad | Beschreibung | Body (JSON) |
| :--- | :--- | :--- | :--- |
| `GET` | `/notes` | Ruft alle gespeicherten Notizen ab. | - |
| `POST` | `/notes` | Erstellt eine neue Notiz. | `{ "text": "Meine Notiz" }` |
| `DELETE` | `/notes/:id` | Löscht eine Notiz anhand ihrer ID. | - |

## 📂 Projektstruktur

```
Notes-TS-API/
├── public/           # Frontend-Dateien (HTML, CSS, JS)
├── src/              # TypeScript Source Code
│   ├── app.ts        # Express App & Routen
│   ├── server.ts     # Server Entry Point
│   ├── storage.ts    # Logik zum Speichern/Laden der Notizen
│   ├── types.ts      # TypeScript Interfaces
│   └── script.ts     # Frontend Logik (Source)
├── package.json      # Abhängigkeiten & Skripte
├── tsconfig.json     # TypeScript Konfiguration
└── README.md         # Dokumentation
```

## 📝 Lizenz

Dieses Projekt ist unter der ISC Lizenz lizenziert.
