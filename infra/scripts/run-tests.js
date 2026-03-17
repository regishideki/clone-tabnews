/* global Promise */
const net = require("net");
const { concurrently } = require("concurrently");
const { spawn } = require("child_process");

const PORT = process.env.PORT ?? 3030;

function isServerRunning(port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("error", () => {
      socket.destroy();
      resolve(false);
    });
    socket.connect(port, "localhost");
  });
}

async function main() {
  const extraArgs = process.argv.slice(2);
  const jestCommand = ["jest", "--runInBand", ...extraArgs].join(" ");
  const serverRunning = await isServerRunning(PORT);

  if (serverRunning) {
    console.log(
      `Server already running on port ${PORT}. Reusing existing server.`,
    );
    const child = spawn(jestCommand, { stdio: "inherit", shell: true });
    child.on("exit", (code) => process.exit(code ?? 0));
    return;
  }

  const { commands } = concurrently(
    [
      { command: `next dev -p ${PORT}`, name: "next" },
      { command: jestCommand, name: "jest" },
    ],
    {
      killOthers: ["failure", "success"],
      hide: ["next"],
      outputStream: process.stdout,
      raw: true,
    },
  );

  const [, jestCommand_] = commands;
  jestCommand_.close.subscribe(({ exitCode }) => {
    process.exit(exitCode ?? 0);
  });
}

main();
