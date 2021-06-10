#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ExampleStack } from './stacks/example';

const app = new cdk.App();

new ExampleStack(app, 'example', {
  stackName: 'cdk-example',
  env: {
    region: 'eu-central-1'
  }
});
