
async function handler(event: any) {
    return {
        statusCode: 200,
        body: JSON.stringify('Hello World!'),
    };
};

// Must export via handler, required due to otel manipulating lambda entry point
//  https://github.com/open-telemetry/opentelemetry-js/issues/1946
module.exports = { handler }