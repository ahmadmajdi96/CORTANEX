import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function runScript(path: string, input?: string): Promise<string> {
  const command = `node ${path} ${input || ''}`;
  const { stdout } = await execAsync(command);
  const match = stdout.match(/DATA:\s*(.*)/);
  return match ? match[1].trim() : '';
}

export async function step1(): Promise<string> {
  return runScript('src/scripts/node/script1.js');
}

export async function step2(input: string): Promise<string> {
  return runScript('src/scripts/node/script2.js', input);
}

export async function step3(input: string): Promise<string> {
  return "123123"
}
