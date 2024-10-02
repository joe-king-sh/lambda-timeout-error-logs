#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LambdaTimeoutErrorLogsStack } from '../lib/lambda-timeout-error-logs-stack';

const app = new cdk.App();
new LambdaTimeoutErrorLogsStack(app, 'LambdaTimeoutErrorLogs', {});