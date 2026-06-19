import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument } from "pdf-lib";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PORT = Number(process.env.EXPORT_PORT ?? 3011);
const BASE_URL = `http://127.0.0.1:${PORT}`;
const OUT_DIR = path.join(ROOT, "exports", "slides");
const PDF_PATH = path.join(ROOT, "exports", "vn-hans-prez.pdf");
const VIEWPORT = { width: 1920, height: 1080 };

const SCENES = [
  { index: 0, file: "01-start", title: "Start" },
  { index: 1, file: "02-markt", title: "Markt" },
  { index: 2, file: "03-ueber-uns", title: "Über uns" },
  { index: 3, file: "04-produkte", title: "Produkte" },
  { index: 4, file: "05-karriere", title: "Karriere" },
  { index: 5, file: "06-struktur", title: "Struktur" },
  { index: 6, file: "07-verdienst", title: "Verdienst" },
];

const args = new Set(process.argv.slice(2));
const exportPng = !args.has("--pdf-only");
const exportPdf = !args.has("--png-only");

const waitForServer = async (url, timeoutMs = 60_000) => {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // server not ready yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server did not start at ${url} within ${timeoutMs}ms`);
};

const startProductionServer = () => {
  const child = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: ROOT,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, NODE_ENV: "production" },
  });

  child.stdout?.on("data", (chunk) => process.stdout.write(chunk));
  child.stderr?.on("data", (chunk) => process.stderr.write(chunk));

  return child;
};

const captureScene = async (page, sceneIndex) => {
  const url = `${BASE_URL}/?export=1&scene=${sceneIndex}`;
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForSelector('[data-export-ready="true"]', { timeout: 15_000 });
  await page.waitForTimeout(400);
  return page.screenshot({ type: "png" });
};

const buildPdf = async (pages) => {
  const pdfDoc = await PDFDocument.create();

  for (const { buffer } of pages) {
    const image = await pdfDoc.embedPng(buffer);
    const pageWidth = VIEWPORT.width;
    const pageHeight = VIEWPORT.height;
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: pageWidth,
      height: pageHeight,
    });
  }

  return pdfDoc.save();
};

const main = async () => {
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(path.dirname(PDF_PATH), { recursive: true });

  const server = startProductionServer();
  let browser;

  try {
    await waitForServer(BASE_URL);

    browser = await chromium.launch();
    const page = await browser.newPage({
      viewport: VIEWPORT,
      deviceScaleFactor: 2,
    });

    const captured = [];

    for (const scene of SCENES) {
      console.log(`Capturing ${scene.file} (${scene.title})…`);
      const buffer = await captureScene(page, scene.index);
      captured.push({ ...scene, buffer });

      if (exportPng) {
        const outPath = path.join(OUT_DIR, `${scene.file}.png`);
        await writeFile(outPath, buffer);
        console.log(`Saved ${outPath}`);
      }
    }

    if (exportPdf) {
      const pdfBytes = await buildPdf(captured);
      await writeFile(PDF_PATH, pdfBytes);
      console.log(`Saved ${PDF_PATH}`);
    }

    console.log(
      `\nDone — ${captured.length} slides exported` +
        (exportPng ? " (PNG)" : "") +
        (exportPdf ? " (PDF)" : ""),
    );
  } finally {
    if (browser) await browser.close();
    server.kill("SIGTERM");
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
