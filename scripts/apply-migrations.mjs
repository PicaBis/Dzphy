// ============================================================================
// DzPhy — apply database migrations
// ----------------------------------------------------------------------------
// Applies supabase/APPLY_ALL.sql (both migrations + seed) to your Supabase
// project. Two supported modes — the script auto-detects which to use:
//
//   1) Supabase Management API (recommended, no DB password needed):
//        SUPABASE_ACCESS_TOKEN=sbp_xxx  node scripts/apply-migrations.mjs
//      Get the token at https://supabase.com/dashboard/account/tokens
//
//   2) Direct Postgres connection (needs the DB password + `pg` installed):
//        SUPABASE_DB_URL="postgresql://postgres:PASSWORD@db.<ref>.supabase.co:5432/postgres" \
//          node scripts/apply-migrations.mjs
//
// If neither env var is set, the script prints instructions and exits — you
// can always just paste supabase/APPLY_ALL.sql into the Supabase SQL Editor.
// ============================================================================
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sql = readFileSync(join(__dirname, "..", "supabase", "APPLY_ALL.sql"), "utf8");

const PROJECT_REF = process.env.SUPABASE_PROJECT_REF || "gmuruowuodywknbpxvhk";
const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const DB_URL = process.env.SUPABASE_DB_URL;

async function viaManagementApi() {
  console.log(`Applying migrations to project ${PROJECT_REF} via Management API…`);
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: sql }),
    }
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Management API returned ${res.status}: ${body}`);
  }
  console.log("✓ Migrations applied successfully.");
}

async function viaPostgres() {
  let pg;
  try {
    pg = await import("pg");
  } catch {
    throw new Error(
      "The 'pg' package is not installed. Run `npm i -D pg` first, or use SUPABASE_ACCESS_TOKEN instead."
    );
  }
  const { Client } = pg.default ?? pg;
  const client = new Client({ connectionString: DB_URL });
  console.log("Applying migrations via direct Postgres connection…");
  await client.connect();
  await client.query(sql);
  await client.end();
  console.log("✓ Migrations applied successfully.");
}

try {
  if (ACCESS_TOKEN) {
    await viaManagementApi();
  } else if (DB_URL) {
    await viaPostgres();
  } else {
    console.log(
      [
        "No credentials provided. Choose ONE:",
        "",
        "  A) Management API token (easiest):",
        "     SUPABASE_ACCESS_TOKEN=sbp_xxx node scripts/apply-migrations.mjs",
        "     → get it at https://supabase.com/dashboard/account/tokens",
        "",
        "  B) Direct DB connection string:",
        "     SUPABASE_DB_URL='postgresql://postgres:PASSWORD@db.gmuruowuodywknbpxvhk.supabase.co:5432/postgres' \\",
        "       node scripts/apply-migrations.mjs",
        "",
        "  C) Or just paste supabase/APPLY_ALL.sql into the Supabase SQL Editor.",
      ].join("\n")
    );
    process.exit(1);
  }
} catch (err) {
  console.error("✗ Failed:", err.message);
  process.exit(1);
}
