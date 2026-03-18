import amqplib from 'amqplib';

export interface DataChangedHeaders {
  type: string;
  id: string;
  action: 'update' | 'delete' | 'create';
  messagingId: string;
}

export const listenForDataChange = async (
  onDataChange: (type: DataChangedHeaders) => void,
) => {
  const host = process.env.RABBITMQ_HOST;
  const port = process.env.RABBITMQ_PORT;
  const exchangeName = 'dataChangedExchange';

  if (!host || !port) {
    console.warn(
      'RABBITMQ_HOST or RABBITMQ_PORT is not defined. Skipping RabbitMQ consumer setup.',
    );
    return;
  }

  const handleMessage = (msg: amqplib.ConsumeMessage | null) => {
    if (msg !== null) {
      onDataChange(msg.properties.headers as DataChangedHeaders);
    }
  };

  try {
    const connection = await amqplib.connect(`amqp://${host}:${port}`);

    connection.on('error', (err) => {
      console.error('RabbitMQ connection error:', err);
    });

    connection.on('close', () => {
      console.error('RabbitMQ connection closed.');
    });

    const channel = await connection.createChannel();

    channel.on('error', (err) => {
      console.error('RabbitMQ channel error:', err);
    });

    channel.on('close', () => {
      console.error('RabbitMQ channel closed.');
    });

    await channel.assertExchange(exchangeName, 'topic', {
      durable: true,
    });

    const { queue } = await channel.assertQueue('', { exclusive: true });

    await channel.bindQueue(queue, exchangeName, '#');

    console.info(
      `RabbitMQ consumer is waiting for messages in queue: ${queue}`,
    );

    channel.consume(queue, handleMessage, { noAck: true });
  } catch (error) {
    console.error('Error starting RabbitMQ consumer:', error);
  }
};
