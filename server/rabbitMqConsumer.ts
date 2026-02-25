import amqplib from 'amqplib';

const host = process.env.RABBITMQ_HOST;
const port = process.env.RABBITMQ_PORT;
const exchangeName = 'dataChangedExchange';

export interface DataChangedHeaders {
  type: string;
  id: string;
  action: 'update' | 'delete' | 'create';
  messagingId: string;
}

export const startConsumer = async (
  onMessage: (type: DataChangedHeaders) => void,
) => {
  if (!host || !port) {
    console.warn(
      'RABBITMQ_HOST or RABBITMQ_PORT is not defined. Skipping RabbitMQ consumer setup.',
    );
    return;
  }

  try {
    const connection = await amqplib.connect(`amqp://${host}:${port}`);

    const channel = await connection.createChannel();

    await channel.assertExchange(exchangeName, 'topic', {
      durable: true,
    });

    const { queue } = await channel.assertQueue('', { exclusive: true });

    await channel.bindQueue(queue, exchangeName, '#');

    console.info(`Consumer is waiting for messages in queue: ${queue}`);

    channel.consume(
      queue,
      (msg) => {
        if (msg !== null) {
          const headers = msg.properties.headers as DataChangedHeaders;
          onMessage(headers);
        }
      },
      { noAck: true },
    );
  } catch (error) {
    console.error('Error starting RabbitMQ consumer:', error);
  }
};
