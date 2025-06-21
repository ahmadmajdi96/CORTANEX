import { proxyActivities } from '@temporalio/workflow';
import type * as activities from '../vision-systems/activity';


const { step1, step2, step3 } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10 seconds',
});
export async function visionWorkflow(input: string): Promise<string> {
  const r1 = await step1(input);
  const r2 = await step2(r1);
  const r3 = await step3(r2);
  return `Child workflow final output: ${r3}`;
}

