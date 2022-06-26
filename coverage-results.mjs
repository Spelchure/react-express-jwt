import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const minimumPercent = process.argv[2] || 100;
const __dirname = dirname(fileURLToPath(import.meta.url));

const NYC_SUMMARY_FILE_PATH = path.join(
  __dirname,
  "coverage",
  "coverage-summary.json"
);

const content = await fs.promises.readFile(NYC_SUMMARY_FILE_PATH);
const coverageResult = JSON.parse(content.toString());
let total = 0;

Object.keys(coverageResult["total"]).forEach((key) => {
  total += coverageResult["total"][key].pct;
});

const resultInPct = total / Object.keys(coverageResult["total"]).length;

if (resultInPct >= minimumPercent) {
  console.log(`[COVERAGE] Results. OK (${resultInPct})`);
  process.exit(0);
} else {
  console.error(`[COVERAGE] Results. FAIL (${resultInPct})`);
  process.exit(1);
}
