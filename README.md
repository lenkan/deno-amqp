# deno-amqp

AMQP 0.9.1 implementation for https://deno.land/

## Example usage

See [examples/](examples/). The examples require an AMQP 0.9.1 broker running on localhost

```
docker run -d --rm -p 15672:15672 -p 5672:5672 rabbitmq:3-management
```

Start the example consumer by running

```
deno --allow-net examples/consume_message.ts queue
```

Then, send a message to the same queue using the default exchange using the example publisher

```
deno --allow-net examples/publish_message queue
```
