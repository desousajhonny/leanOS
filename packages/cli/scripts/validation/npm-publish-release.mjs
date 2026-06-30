import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { projectRoot } from "./fixtures.mjs";

export async function validateNpmPublishReleaseProtocol() {
  const rootPackageJson = JSON.parse(await readFile(join(projectRoot, "package.json"), "utf8"));
  const agent = await readFile(join(projectRoot, "AGENT.md"), "utf8");
  const readme = await readFile(join(projectRoot, "README.md"), "utf8");
  const decisionLog = await readFile(join(projectRoot, "docs", "framework", "source-of-truth", "decision-log.md"), "utf8");
  const script = await readFile(join(projectRoot, "scripts", "publish-npm-create-leanos.mjs"), "utf8");

  assert.equal(
    rootPackageJson.scripts?.["release:npm"],
    "node scripts/publish-npm-create-leanos.mjs",
    "root package should expose the npm release script"
  );

  for (const [label, content] of [
    ["AGENT.md", agent],
    ["README.md", readme],
    ["decision-log.md", decisionLog],
    ["publish script", script]
  ]) {
    assert(content.includes("release:npm"), `${label} should route future npm package updates to release:npm`);
    assert(content.includes("Set-Content -LiteralPath"), `${label} should show the safe local .npmrc token command`);
    assert(content.includes("Remove-Variable token, secureToken"), `${label} should clear local token variables after writing .npmrc`);

    if (label !== "publish script") {
      assert(content.includes("npm create lean-os"), `${label} should mention npm create lean-os`);
      assert(content.includes("create-lean-os"), `${label} should mention create-lean-os`);
    }
  }

  assert(script.includes("npm whoami"), "release script should verify npm authentication first");
  assert(script.includes("npm test"), "release script should run generator tests before publishing");
  assert(script.includes('const pnpmVersion = "10.12.1"'), "release script should pin the pnpm version used for publishing");
  assert(script.includes('"-r", "build"'), "release script should build the workspace before publishing");
  assert(script.includes('"--filter", filterName, "publish"'), "release script should publish filtered packages");
  assert(script.includes('publishIfNeeded("lean-os"'), "release script should publish lean-os");
  assert(script.includes('publishIfNeeded("create-lean-os"'), "release script should publish create-lean-os");
  assert(
    script.indexOf('publishIfNeeded("lean-os"') < script.indexOf('publishIfNeeded("create-lean-os"'),
    "release script should publish lean-os before create-lean-os"
  );
  assert(script.includes("Remove-Item") === false, "release script should be cross-platform Node, not PowerShell-only");
  assert(script.includes("unlink"), "release script should remove the local .npmrc after the publish attempt");
  assert(script.includes("NODE_AUTH_TOKEN") || script.includes(".npmrc"), "release script should document local token handoff");
}
