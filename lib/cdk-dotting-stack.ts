import * as cdk from '@aws-cdk/core';
import * as Lambda from "@aws-cdk/aws-lambda";
import * as path from "path";

export class CdkDottingStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new cdk.CfnOutput(this, 'ExampleOutput', {
      value: "testing"
    })

    // Create AWS Lambda function and push image to ECR
    new Lambda.DockerImageFunction(this, "function", {
      code: Lambda.DockerImageCode.fromImageAsset(path.join(__dirname, "../src"), { 
        buildArgs: {
          'FUNCTION_NAME': 'Example5'
        },
        cmd: ['Example5::Example5.Function::FunctionHandler']
      }),
    });



    const buildCommands = [
        "cd /asset-input",
        "export DOTNET_CLI_HOME=\"/tmp/DOTNET_CLI_HOME\"",
        "export PATH=\"$PATH:/tmp/DOTNET_CLI_HOME/.dotnet/tools\"",
        "dotnet tool install -g Amazon.Lambda.Tools",
        "dotnet lambda package -o output.zip",
        "unzip -o -d /asset-output output.zip"
    ]

    // Create AWS Lambda function and push image to ECR
    new Lambda.Function(this, "function3", {
      runtime: Lambda.Runtime.DOTNET_CORE_3_1,
      handler: 'Example3::Example3.Function::FunctionHandler',
      code: Lambda.Code.fromAsset(path.join(__dirname, "../src/Functions/Example3"), { 
        bundling: {
          image: Lambda.Runtime.DOTNET_CORE_3_1.bundlingImage,
          command: ["bash", "-c", buildCommands.join(" && ")]
        }
      }),
    });


    // The code that defines your stack goes here
  }
}
