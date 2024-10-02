import type { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class LambdaTimeoutErrorLogsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /**
     * Node.js
     */
    // biome-ignore lint/complexity/noForEach: <explanation>
    [
      { name: "nodejs18", runtime: lambda.Runtime.NODEJS_18_X },
      { name: "nodejs20", runtime: lambda.Runtime.NODEJS_20_X },
    ].forEach(({ name, runtime }) => {
      new lambda.Function(this, `NodejsTimeoutFunction${name}`, {
        runtime: runtime,
        handler: "index.handler",
        functionName: `TimeoutTest${name}`,
        code: lambda.Code.fromInline(`
              exports.handler = async function(event, context) {          
                console.log('Lambda function started');
                
                // 3秒間スリープ
                await new Promise(resolve => setTimeout(resolve, 3000));
                
                console.log('This log will not be printed due to timeout');
                
                return {
                  statusCode: 200,
                  body: JSON.stringify('Hello from Lambda!'),
                };
              };
            `),
        timeout: cdk.Duration.seconds(2), // タイムアウトを2秒に設定
      });
    });
  }
}
