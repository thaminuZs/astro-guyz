const astro = Bun.spawn({
  cmd: ["node", "src/horo-service/server.js"],
  stdout: "inherit",
  stderr: "inherit",
});

const bunApp = Bun.spawn({
  cmd: ["bun", "run", "--watch", "src/index.ts"],
  stdout: "inherit",
  stderr: "inherit",
});

process.on("SIGINT", () => {
  astro.kill();
  bunApp.kill();
  process.exit();
});