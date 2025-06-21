import { Controller, Post, Body } from '@nestjs/common';
import { Connection, Client } from '@temporalio/client';

@Controller()
export class AppController {
  private readonly connectionPromise = Connection.connect();
  private readonly clientPromise = this.connectionPromise.then(connection => new Client({ connection }));

  @Post('start-workflow')
  async startWorkflow(@Body('workflowId') workflowId: string, @Body('workflowName') workflowName: string): Promise<any>  {
    const client = await this.clientPromise;
    const handle = await client.workflow.start(workflowName, {
      taskQueue: 'pipeline',
      workflowId,
    });

    return { workflowId };
  }

  @Post('terminate-workflow')
  async terminateWorkflow(@Body('workflowId') workflowId: string): Promise<any> {
    const client = await this.clientPromise;

    const handle = client.workflow.getHandle(workflowId);
    await handle.terminate('Terminated by user request.');

    return { message: `Workflow ${workflowId} terminated.` };
  }

  @Post('restart-workflow')
  async restartWorkflow(@Body('workflowId') workflowId: string): Promise<any> {
    const client = await this.clientPromise;

    const handle = client.workflow.getHandle(workflowId);
    try {
      await handle.terminate('Restart requested.');
    } catch (err) {
      console.warn(`Workflow ${workflowId} not running or already terminated.`);
    }

    const newHandle = await client.workflow.start('runPipelineWorkflow', {
      taskQueue: 'pipeline',
      workflowId,
    });

    return { message: `Workflow ${workflowId} restarted.` };
  }
}