import * as cdk from '@aws-cdk/core';
import * as Lambda from "@aws-cdk/aws-lambda";
import * as path from "path";

export class ExampleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const buildCommands = [
        "cd /asset-input",
        "export DOTNET_CLI_HOME=\"/tmp/DOTNET_CLI_HOME\"",
        "export PATH=\"$PATH:/tmp/DOTNET_CLI_HOME/.dotnet/tools\"",
        "dotnet tool install -g Amazon.Lambda.Tools",
        "dotnet lambda package -o output.zip",
        "unzip -o -d /asset-output output.zip"
    ]

    new Lambda.Function(this, "function-bar", {
      runtime: Lambda.Runtime.DOTNET_CORE_3_1,
      handler: 'ExampleSpace::ExampleSpace.ExampleClassBar::Handler',
      code: Lambda.Code.fromAsset(path.join(__dirname, "../../src/ExampleSpace"), { 
        bundling: {
          image: Lambda.Runtime.DOTNET_CORE_3_1.bundlingImage,
          command: ["bash", "-c", buildCommands.join(" && ")]
        }
      }),
    });

    new Lambda.Function(this, "function-foo", {
      runtime: Lambda.Runtime.DOTNET_CORE_3_1,
      handler: 'ExampleSpace::ExampleSpace.ExampleClassFoo::Handler',
      code: Lambda.Code.fromAsset(path.join(__dirname, "../../src/ExampleSpace"), { 
        bundling: {
          image: Lambda.Runtime.DOTNET_CORE_3_1.bundlingImage,
          command: ["bash", "-c", buildCommands.join(" && ")]
        }
      }),
    });
  }
}
