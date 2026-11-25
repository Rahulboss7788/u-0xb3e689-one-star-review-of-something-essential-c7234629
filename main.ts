// One-star review of the sun — deadpan, single line, at most 160 characters.
// Writes the review to /output/entry.txt and checks the gate:
// 1-160 characters, not only whitespace.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const TEXT =
  "One star. It burns my skin, bleaches my curtains, and after 4.5 billion years of practice still has no dimmer switch.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", TEXT, "utf8");

if (TEXT.length < 1 || TEXT.length > 160) {
  throw new Error(`Gate failed: ${TEXT.length} characters, must be 1-160.`);
}
if (TEXT.trim().length === 0) {
  throw new Error("Gate failed: text is only whitespace.");
}
if (TEXT.includes("\n")) {
  throw new Error("Gate failed: review must be a single line.");
}

// Read it back and verify the file holds exactly the intended text.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== TEXT) {
  throw new Error("Verification failed: /output/entry.txt does not match the review text.");
}
if (back.length < 1 || back.length > 160 || back.trim().length === 0) {
  throw new Error(`Verification failed: file holds ${back.length} characters, must be 1-160 and non-blank.`);
}
console.log(`Verified: /output/entry.txt holds exactly the review (${back.length} characters, ${back.split(/\s+/).length} words).`);
