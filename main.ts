import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Gate from competition.yaml: /output/entry.txt must be UTF-8 text of
// 1 to 200 characters, not only white space, one motto on one line.
const MIN_CHARS = 1;
const MAX_CHARS = 200;

const ENTRY =
  "Will read the docs. Will not read the room.";

const OUT_PATH = "/output/entry.txt";

function checkEntry(text: string): void {
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(
      `Entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  if (!text.trim()) {
    throw new Error("Entry must not be blank");
  }
  if (text.includes("\n")) {
    throw new Error("Entry must be a single line");
  }
}

checkEntry(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync(OUT_PATH, ENTRY, "utf8");

// Read back and verify byte-for-byte what was written.
const written = readFileSync(OUT_PATH);
if (!Buffer.from(ENTRY, "utf8").equals(written)) {
  throw new Error("Read-back verification failed: file differs from entry");
}
console.log(`Wrote ${ENTRY.length} characters to ${OUT_PATH} (verified)`);
