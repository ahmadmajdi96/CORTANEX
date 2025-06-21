import { Worker } from '@temporalio/worker';
import * as activities from './activities';
import * as visionActivities from '../machines/vision-systems/activity'

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'), // Main + child workflows imported here
    activities: {
      ...activities,
      ...visionActivities,

    },
    taskQueue: 'pipeline',
    
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
