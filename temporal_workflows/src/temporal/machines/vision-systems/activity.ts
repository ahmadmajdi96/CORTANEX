import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

async function runPythonScript(script: string, input: string, input1="test", input2="test"): Promise<string> {
  console.log(`python3 src/scripts/python/${script} "${input}"`)
  const { stdout } = await execAsync(`python3 src/scripts/python/${script} "${input}" "${input1}" "${input2}"`);
  console.log(stdout)
  const lines = stdout.trim().split('\n');
  return lines[lines.length - 1];
}


export async function step1(input: string): Promise<string> {
    console.log("++++++++++++++++++")
    return runPythonScript('communication/tcp/simple_tcp_command.py', "10.2.50.221", "21", );
  }
export async function step2(input: string): Promise<string> {
    return runPythonScript('py_script2.py', input);
  }
export async function step3(input: string): Promise<string> {
    return runPythonScript('py_script3.py', input);
  }

  
