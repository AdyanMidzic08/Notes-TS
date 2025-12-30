var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var addBtn = document.getElementById("addBtn");
var noteInput = document.getElementById("noteInput");
var notesList = document.getElementById("notesList");
var darkModeBtn = document.getElementById("light-dark-mode");
var headline = document.getElementById("header");
var markBtns = document.querySelectorAll(".mark-btn");
var deleteBtns = document.querySelectorAll(".delete-btn");
var url = "http://localhost:3000/notes";
function addNotes(text) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, fetch("http://localhost:3000/notes", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ text: text }),
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    error = _a.sent();
                    console.error("Fehler beim Hinzufügen:", error);
                    return [2 /*return*/];
                case 3: return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    console.error("Fetch Error:", err_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
addBtn.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
    var text;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                text = noteInput.value.trim();
                if (!text)
                    return [2 /*return*/];
                return [4 /*yield*/, addNotes(text)];
            case 1:
                _a.sent();
                noteInput.value = "";
                return [4 /*yield*/, showAllNotes()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
function showAllNotes() {
    return __awaiter(this, void 0, void 0, function () {
        var response, notes, i, note, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(url))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    notes = _a.sent();
                    notesList.innerHTML = "";
                    for (i = 0; i < notes.length; i++) {
                        note = notes[i];
                        notesList.innerHTML += "\n                <li data-id=\"".concat(note.id, "\">\n                    <span>").concat(note.text, "</span>\n                    <div>\n                        <button onclick='deleteNote(\"").concat(note.id, "\")' class=\"delete-btn\">Delete</button>\n                    </div>\n                </li>\n            ");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function deleteNote(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(url, "/").concat(id), {
                        method: "DELETE",
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, showAllNotes()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
noteInput.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        var text = noteInput.value.trim();
        if (!text)
            return;
        addNotes(text);
        noteInput.value = "";
        showAllNotes();
    }
});
darkModeBtn.addEventListener("click", function () {
    var isDark = document.body.classList.toggle("dark-mode");
    if (isDark) {
        headline.style.color = "white";
        notesList.style.color = "white";
        noteInput.style.backgroundColor = "black";
        noteInput.style.color = "white";
        var items = notesList.querySelectorAll("li");
        items.forEach(function (li) {
            li.style.backgroundColor = "black";
        });
        darkModeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
    else {
        notesList.style.color = "black";
        headline.style.color = "black";
        noteInput.style.backgroundColor = "white";
        noteInput.style.color = "grey";
        var items = notesList.querySelectorAll("li");
        items.forEach(function (li) {
            li.style.backgroundColor = "white";
        });
        darkModeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
});
showAllNotes();
