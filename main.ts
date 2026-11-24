import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One-star review, written by the house cat about its human.
// The human has studied cats from seven books, twice over, and knows
// everything about cats now — except the one cat he owns.
const LINE = "Owns seven books about cats. Has read all of them twice. He knows everything about cats now. Except me.";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 chars, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
// NBSP/ZWSP guard: the escapes below must stay as literal backslash-u
// sequences in this file — never paste the actual invisible characters
// (two past builds broke exactly that way; od -c is the check).
if (/[\u00a0\u200b]/.test(LINE)) {
  throw new Error("entry contains invisible characters");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back what was actually written and confirm it is byte-identical
// to the line above — a silent write failure must never pass as success.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the intended line");
}
