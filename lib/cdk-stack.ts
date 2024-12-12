import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
// Import the Lambda module
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import * as logs from 'aws-cdk-lib/aws-logs';
//import { CloudWatchLogsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as lambdaNodeJs from 'aws-cdk-lib/aws-lambda-nodejs';
import {
  AdotLambdaExecWrapper,
  AdotLayerVersion,
  AdotLambdaLayerJavaScriptSdkVersion,
} from 'aws-cdk-lib/aws-lambda';
import path = require('path');
import { LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import * as destinations from 'aws-cdk-lib/aws-logs-destinations';


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
      // specify the name of the lambda function
      functionName: "hello-world-service-1",
      runtime: lambda.Runtime.NODEJS_20_X, // Provide any supported Node.js runtime
      handler: "index.handler",
      entry: path.join(__dirname, "../lib/assets/harry-stack.ts"),
      timeout: cdk.Duration.seconds(10),
      adotInstrumentation: {
        layerVersion: AdotLayerVersion.fromJavaScriptSdkLayerVersion(AdotLambdaLayerJavaScriptSdkVersion.LATEST),
        execWrapper: AdotLambdaExecWrapper.REGULAR_HANDLER,
      },
      environment: {
        ADOT_SERVICE_NAME: "hello-world-service-1",
        AWS_LAMBDA_EXEC_WRAPPER: "/opt/otel-handler",
        OTEL_EXPORTER_OTLP_ENDPOINT: "https://otlp.nr-data.net:4317",
        OTEL_EXPORTER_OTLP_HEADERS: "api-key=NEW_RELIC_LICENSE_KEY",
        OTEL_SERVICE_NAME: "hello-world-service-1",
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

    // Define the Lambda function resource
    const myFunction2 = new lambdaNodeJs.NodejsFunction(this, "MyFunction2", {
      runtime: lambda.Runtime.NODEJS_20_X, // Provide any supported Node.js runtime
      functionName: "hello-world-service-2",
      handler: "index.handler",
      entry: path.join(__dirname, "../lib/assets/harry-stack.ts"),
      timeout: cdk.Duration.seconds(10),
      layers: [
        LayerVersion.fromLayerVersionArn(this, 'CdkOtelLayer', 'arn:aws:lambda:us-east-1:184161586896:layer:opentelemetry-nodejs-0_11_0:1')
      ],
      environment: {
        ADOT_SERVICE_NAME: "hello-world-service-2",
        AWS_LAMBDA_EXEC_WRAPPER: "/opt/otel-handler",
        OTEL_EXPORTER_OTLP_ENDPOINT: "https://otlp.nr-data.net:4317",
        OTEL_EXPORTER_OTLP_HEADERS: "api-key=NEW_RELIC_LICENSE_KEY",
        OTEL_SERVICE_NAME: "hello-world-service-2",
        OTEL_TRACES_SAMPLER: "always_on",
        OTEL_LOG_LEVEL: "debug",
      },
    });

    // Define the Lambda function URL resource
    const myFunctionUrl2 = myFunction2.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    // Define a CloudFormation output for your URL
    new cdk.CfnOutput(this, "myFunctionUrlOutput2", {
      value: myFunctionUrl2.url,
    })

    // Define the Lambda function resource
    const myFunction3 = new lambdaNodeJs.NodejsFunction(this, "MyFunction3", {
      runtime: lambda.Runtime.NODEJS_20_X, // Provide any supported Node.js runtime
      functionName: "hello-world-service-3",
      handler: "index.handler",
      entry: path.join(__dirname, "../lib/assets/harry-stack.ts"),
      timeout: cdk.Duration.seconds(10),
      layers: [
        LayerVersion.fromLayerVersionArn(this, 'CdkOtelLayer2', 'arn:aws:lambda:us-east-1:184161586896:layer:opentelemetry-nodejs-0_11_0:1')
      ],
      environment: {
        ADOT_SERVICE_NAME: "hello-world-service-3",
        AWS_LAMBDA_EXEC_WRAPPER: "/opt/otel-handler",
        OTEL_EXPORTER_OTLP_ENDPOINT: "https://otlp.nr-data.net:4317",
        OTEL_EXPORTER_OTLP_HEADERS: "api-key=NEW_RELIC_LICENSE_KEY",
        OTEL_SERVICE_NAME: "hello-world-service-3",
        OTEL_TRACES_SAMPLER: "always_on",
        OTEL_LOG_LEVEL: "debug",
      },
    });

    // Define the Lambda function URL resource
    const myFunctionUrl3 = myFunction3.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    // Define a CloudFormation output for your URL
    new cdk.CfnOutput(this, "myFunctionUrlOutput3", {
      value: myFunctionUrl3.url,
    })

    const existingOtelLogLambda = lambda.Function.fromFunctionArn(
      this,
      'ExistingOtelLogLambda',
      'arn:aws:lambda:us-east-1:762880000183:function:newrelic-aws-otel-log-ingestion-12e618ec57ab'
    );

    const existingLogGroup = logs.LogGroup.fromLogGroupName(this, '/aws/lambda/hello-world-service-3', '/aws/lambda/hello-world-service-3');

    new logs.SubscriptionFilter(this, 'MySubscriptionFilter', {
      logGroup: existingLogGroup,
      destination: new destinations.LambdaDestination(existingOtelLogLambda),
      filterPattern: logs.FilterPattern.allEvents(), // Adjust filter pattern as needed
    });

    // get CloudWatch log group for lambda function and attach it to the lambda function url
    // const logGroup = logs.LogGroup.fromLogGroupName(this, 'existingOtelLogLambdaLogGroup', '/aws/lambda/newrelic-aws-otel-log-ingestion-12e618ec57ab');


    // existingOtelLogLambda.addEventSource(new CloudWatchLogsEventSource(
    //   'CloudWatchLogsTrigger',
    //   {
    //     eventSourceArn: 'arn:aws:logs:us-east-1:762880000183:*/*',
    //     target: new targets.LambdaFunction(existingOtelLogLambda),
    //   }
    // ));
  }
}