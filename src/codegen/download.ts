const uri =
  "https://raw.githubusercontent.com/rabbitmq/rabbitmq-codegen/master/amqp-rabbitmq-0.9.1.json";
fetch(uri).then(async (response) => {
  const data = await response.body.json();
  console.log(JSON.stringify(data, null, 2));
});
