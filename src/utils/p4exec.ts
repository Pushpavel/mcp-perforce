import { exec } from 'child_process';
import { promisify } from 'util';
import { cwd } from 'process';

const execAsync = promisify(exec);

export async function p4Exec(command: string, workingDir?: string) {
  const p4client = process.env.P4CLIENT;
  const finalCommand = p4client ? command.replace(/(^|\|\s*)p4 /g, `$1p4 -c ${p4client} `) : command;

  const options = {
    cwd: workingDir || cwd(),
    env: {
      ...process.env,
    }
  };

  return execAsync(finalCommand, options);
}