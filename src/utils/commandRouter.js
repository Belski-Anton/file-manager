import { mkdir } from "../commands/directory/mkdir.js";
import { add } from "../commands/file/add.js";
import { cat } from "../commands/file/cat.js";
import { cp } from "../commands/file/cp.js";
import { mv } from "../commands/file/mv.js";
import { rm } from "../commands/file/rm.js";
import { rn } from "../commands/file/rn.js";
import { calcHash } from "../commands/hash/calcHash.js";
import { cd } from "../commands/navigation/cd.js";
import { ls } from "../commands/navigation/ls.js";
import { up } from "../commands/navigation/up.js";
import { showArchitecture } from "../commands/os/architecture.js";
import { cpusInfo } from "../commands/os/cpus.js";
import { eol } from "../commands/os/eol.js";
import { showHomedir } from "../commands/os/homedir.js";
import { showUsername } from "../commands/os/username.js";
import { compress } from "../commands/zip/compress.js";
import { decompress } from "../commands/zip/decompress.js";
export const handleCommand = async (input) => {
  const [command, ...args] = input.trim().split(" ");
  const argString = args.join(" ");

  try {
    switch (command) {
      case "ls":
        await ls();
        break;
      case "up":
        up();
        break;
      case "cd":
        await cd(argString);
        break;
      case "cat":
        await cat(argString);
        break;
      case "add":
        await add(argString);
        break;
      case "rm":
        await rm(argString);
        break;
      case "rn":
        const [oldPathArg, newName] = args;
        await rn(oldPathArg, newName);
        break;
      case "mkdir":
        await mkdir(argString);
        break;
      case "cp":
        const [source, destDir] = args;
        await cp(source, destDir);
        break;
      case "mv": {
        const [source, destDir] = args;
        await mv(source, destDir);
        break;
      }
      case "os":
        if (args[0] === "--EOL") {
          eol();
        } else if (args[0] === "--cpus") {
          cpusInfo();
        } else if (args[0] === "--homedir") {
          showHomedir();
        } else if (args[0] === "--username") {
          showUsername();
        } else if (args[0] === "--architecture") {
          showArchitecture();
        } else {
          console.log("Invalid input");
        }
        break;
      case "hash":
        await calcHash(argString);
        break;
      case "compress": {
        const [source, dest] = args;
        await compress(source, dest);
        break;
      }
      case "decompress": {
        const [source, dest] = args;
        await decompress(source, dest);
        break;
      }
      default:
        console.log("Invalid input");
    }
  } catch {
    console.log("Operation failed");
  }

  console.log(`You are currently in ${process.cwd()}`);
};
