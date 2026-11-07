import { NextResponse } from "next/server";
import { CURRENT_APP_VERSION } from "../config";
import { compare, splitVersionNumber } from "../utils";

// Keep this list explicit: Cloudflare Workers do not expose a normal
// writable project filesystem at runtime.
const CHANGELOG_FILES = [
  "3.0.x.md",
  "3.1.x.md",
  "3.2.x.md",
  "3.3.x.md",
  "3.4.x.md",
  "3.5.x.md",
  "3.6.x.md",
  "3.7.x.md",
  "3.8.x.md",
  "3.9.x.md",
  "3.10.x.md",
];

export async function GET() {
  const changelogs = [...CHANGELOG_FILES].sort(compare);
  changelogs.shift();

  return NextResponse.json({
    version: CURRENT_APP_VERSION,
    version_changelog: `${splitVersionNumber(CURRENT_APP_VERSION).major}.${splitVersionNumber(CURRENT_APP_VERSION).minor}.x.md`,
    previous_changelogs: changelogs,
  });
}
