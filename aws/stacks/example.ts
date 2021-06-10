import * as cdk from '@aws-cdk/core';
import * as Lambda from "@aws-cdk/aws-lambda";
import * as path from "path";

function fromFolder(folder: string) {
  const bundling = {
    image: Lambda.Runtime.DOTNET_CORE_3_1.bundlingImage,
    command: [
      "bash", "-c", [
        "cd /asset-input",
        "export DOTNET_CLI_HOME=\"/tmp/DOTNET_CLI_HOME\"",
        "export PATH=\"$PATH:/tmp/DOTNET_CLI_HOME/.dotnet/tools\"",
        "dotnet tool install -g Amazon.Lambda.Tools",
        "dotnet lambda package -o output.zip",
        "unzip -o -d /asset-output output.zip"
      ].join(" && ")
    ]
  }

  return Lambda.Code.fromAsset(path.join(__dirname, folder), { bundling });
}

export class ExampleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.createFunction('function-bar',
      'EXAMPLE::ExampleSpace.ExampleClassBar::Handler'
    );

    this.createFunction('function-foo',
      'EXAMPLE::ExampleSpace.ExampleClassFoo::Handler'
    );
  }

  private createFunction(id: string, handler: string) {
    return new Lambda.Function(this, id, {
      handler,
      runtime: Lambda.Runtime.DOTNET_CORE_3_1,
      code: fromFolder("../../src/ExampleSpace")
    });
  }
}
