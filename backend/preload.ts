/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ipcRenderer } from "electron";

declare global {
  namespace NodeJS {
    interface Global {
      api: any;
    }
  }
}

process.once("loaded", () => {
  (global as any).api = {
    runCommand: (command: {}) => ipcRenderer.sendSync("runCommand", command),
  };
});
