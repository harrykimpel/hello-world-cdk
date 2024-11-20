import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
// Import the Lambda module
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodeJs from 'aws-cdk-lib/aws-lambda-nodejs';
import {
  AdotLambdaExecWrapper,
  AdotLayerVersion,
  AdotLambdaLayerJavaScriptSdkVersion,
} from 'aws-cdk-lib/aws-lambda';
import path = require('path');

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    // Define the Lambda function resource
    // const myFunction = new lambda.Function(this, "HelloWorldFunction", {
    //   runtime: lambda.Runtime.NODEJS_20_X, // Provide any supported Node.js runtime
    //   handler: "index.handler",
    //   code: lambda.Code.fromInline(`
    //     exports.handler = async function(event) {
    //       return {
    //         statusCode: 200,
    //         body: JSON.stringify('Hello World!'),
    //       };
    //     };
    //   `),
    //   adotInstrumentation: {
    //     layerVersion: AdotLayerVersion.fromJavaScriptSdkLayerVersion(AdotLambdaLayerJavaScriptSdkVersion.LATEST),
    //     execWrapper: AdotLambdaExecWrapper.REGULAR_HANDLER,
    //   },
    //   environment: {
    //     ADOT_SERVICE_NAME: "hello-world-service",
    //     AWS_LAMBDA_EXEC_WRAPPER: "/opt/otel-handler",
    //     OTEL_EXPORTER_OTLP_ENDPOINT: "https://otlp.nr-data.net:4317",
    //     OTEL_EXPORTER_OTLP_HEADERS: "api-key=NEW_RELIC_LICENSE_KEY",
    //     OTEL_SERVICE_NAME: "hello-world-service",
    //     OTEL_TRACES_SAMPLER: "always_on",
    //     OTEL_LOG_LEVEL: "debug",
    //   },
    // });

    // Define the Lambda function resource
    const myFunction = new lambdaNodeJs.NodejsFunction(this, "MyFunction", {
      runtime: lambda.Runtime.NODEJS_20_X, // Provide any supported Node.js runtime
      handler: "index.handler",
      entry: path.join(__dirname, "../lib/assets/harry-stack.ts"),
      adotInstrumentation: {
        layerVersion: AdotLayerVersion.fromJavaScriptSdkLayerVersion(AdotLambdaLayerJavaScriptSdkVersion.LATEST),
        execWrapper: AdotLambdaExecWrapper.REGULAR_HANDLER,
      },
      timeout: cdk.Duration.seconds(10),
      environment: {
        ADOT_SERVICE_NAME: "hello-world-service",
        AWS_LAMBDA_EXEC_WRAPPER: "/opt/otel-handler",
        OTEL_EXPORTER_OTLP_ENDPOINT: "https://otlp.nr-data.net:4317",
        OTEL_EXPORTER_OTLP_HEADERS: "api-key=NEW_RELIC_LICENSE_KEY",
        OTEL_SERVICE_NAME: "hello-world-service",
        OTEL_TRACES_SAMPLER: "always_on",
        OTEL_LOG_LEVEL: "debug",
      },
    });

    // Define the Lambda function URL resource
    const myFunctionUrl = myFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    // Define a CloudFormation output for your URL
    new cdk.CfnOutput(this, "myFunctionUrlOutput", {
      value: myFunctionUrl.url,
    })
  }
}
