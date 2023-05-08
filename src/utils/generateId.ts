export function generateId() {
    return "_" + [...Array(32)].map(() => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");
}
