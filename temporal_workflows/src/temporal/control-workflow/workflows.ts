import { startChild, proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';
import { visionWorkflow } from '../machines/vision-systems/workflow'; // ✅ direct import
export { visionWorkflow } from '../machines/vision-systems/workflow'; // ✅ child workflow


const { step1, step2, step3 } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10 seconds',
});

export async function runPipelineWorkflow(): Promise<string> {
  const result1 = await step1();
  const result2 = await step2(result1);
  const result3 = await step3(result2);
  console.log("++++++++++++++++++++++++++++++++++++++++"+await step3(result2))

  const child = await startChild(visionWorkflow, {
    args: [result3],
    workflowId: `child-${Date.now()}`,
  });

  return await child.result();
}
