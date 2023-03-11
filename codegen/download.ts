const uri = "https://raw.githubusercontent.com/rabbitmq/rabbitmq-codegen/master/amqp-rabbitmq-0.9.1.json";

const response = await fetch(uri);
const data = await response.json();
console.log(JSON.stringify(data, null, 2));
