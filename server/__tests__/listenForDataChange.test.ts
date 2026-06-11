import { log } from '@/logging/logger.server';
import type { Channel, ChannelModel, ConsumeMessage } from 'amqplib';
import amqplib from 'amqplib';
import { listenForDataChange } from 'server/listenForDataChange';
import { describe, expect, it, vi } from 'vitest';

vi.mock('amqplib');

const setupMocks = () => {
  const mockQueue = { queue: 'test-queue' };

  const mockChannel = {
    on: vi.fn(),
    assertExchange: vi.fn(),
    assertQueue: vi.fn().mockResolvedValue(mockQueue),
    bindQueue: vi.fn(),
    consume: vi.fn(),
  } as unknown as Channel;

  const mockConnection = {
    on: vi.fn(),
    createChannel: vi.fn().mockResolvedValue(mockChannel),
  } as unknown as ChannelModel;

  vi.mocked(amqplib.connect).mockResolvedValue(mockConnection);

  return { mockChannel, mockConnection };
};

describe('listenForDataChange', () => {
  it('sets up rabbitMQ consumer', async () => {
    const { mockChannel } = setupMocks();
    vi.stubEnv('RABBITMQ_HOST', 'some-host');
    vi.stubEnv('RABBITMQ_PORT', '5672');

    const onDataChange = vi.fn();

    await listenForDataChange(onDataChange);

    expect(amqplib.connect).toHaveBeenCalledWith('amqp://some-host:5672');

    expect(mockChannel.assertExchange).toHaveBeenCalledWith(
      'dataChangedExchange',
      'topic',
      { durable: true },
    );

    expect(mockChannel.assertQueue).toHaveBeenCalledWith('', {
      exclusive: true,
    });

    expect(mockChannel.bindQueue).toHaveBeenCalledWith(
      'test-queue',
      'dataChangedExchange',
      '#',
    );

    expect(mockChannel.consume).toHaveBeenCalledWith(
      'test-queue',
      expect.any(Function),
      { noAck: true },
    );
  });

  it('calls onDataChange when handleMessage is called', async () => {
    const { mockChannel } = setupMocks();

    vi.stubEnv('RABBITMQ_HOST', 'host');
    vi.stubEnv('RABBITMQ_PORT', '1234');

    const onDataChange = vi.fn();

    await listenForDataChange(onDataChange);

    // Get the consume callback
    const consumeCallback = vi.mocked(mockChannel.consume).mock.calls[0][1];
    const headers = {
      type: 'foo',
      id: 'bar',
      action: 'update',
      messagingId: 'baz',
    };
    const msg = {
      properties: { headers },
    } as unknown as ConsumeMessage;

    consumeCallback(msg);

    expect(onDataChange).toHaveBeenCalledWith(headers);
  });

  it('does not call onDataChange when handleMessage is called with null', async () => {
    const { mockChannel } = setupMocks();

    vi.stubEnv('RABBITMQ_HOST', 'host');
    vi.stubEnv('RABBITMQ_PORT', '1234');

    const onDataChange = vi.fn();

    await listenForDataChange(onDataChange);

    const consumeCallback = vi.mocked(mockChannel.consume).mock.calls[0][1];
    consumeCallback(null);

    expect(onDataChange).not.toHaveBeenCalled();
  });

  it('skips setup if RABBITMQ_HOST or RABBITMQ_PORT is not defined', async () => {
    vi.stubEnv('RABBITMQ_HOST', undefined);
    vi.stubEnv('RABBITMQ_PORT', undefined);

    const onDataChange = vi.fn();
    await listenForDataChange(onDataChange);

    expect(amqplib.connect).not.toHaveBeenCalled();
  });

  it('handles connection error', async () => {
    const { mockConnection } = setupMocks();

    vi.stubEnv('RABBITMQ_HOST', 'host');
    vi.stubEnv('RABBITMQ_PORT', '1234');

    const onDataChange = vi.fn();
    await listenForDataChange(onDataChange);

    const connectionOnCallback = vi
      .mocked(mockConnection.on)
      .mock.calls.find((call) => call[0] === 'error')?.[1];

    expect(connectionOnCallback).toBeDefined();

    const logErrorSpy = vi.spyOn(log, 'error').mockImplementation(() => {});

    const connectionError = new Error('connection error');
    connectionOnCallback!(connectionError);

    expect(logErrorSpy).toHaveBeenCalledWith(
      { err: connectionError },
      'RabbitMQ connection error: connection error',
    );
    logErrorSpy.mockRestore();
  });

  it('handles connection close', async () => {
    const { mockConnection } = setupMocks();

    vi.stubEnv('RABBITMQ_HOST', 'host');
    vi.stubEnv('RABBITMQ_PORT', '1234');

    const onDataChange = vi.fn();
    await listenForDataChange(onDataChange);

    const connectionOnCallback = vi
      .mocked(mockConnection.on)
      .mock.calls.find((call) => call[0] === 'close')?.[1];

    expect(connectionOnCallback).toBeDefined();

    const logErrorSpy = vi.spyOn(log, 'error').mockImplementation(() => {});

    connectionOnCallback!();

    expect(logErrorSpy).toHaveBeenCalledWith(
      {
        err: expect.objectContaining({
          message: 'RabbitMQ connection closed.',
        }),
      },
      'RabbitMQ connection closed: RabbitMQ connection closed.',
    );
    logErrorSpy.mockRestore();
  });

  it('handles channel error', async () => {
    const { mockChannel } = setupMocks();

    vi.stubEnv('RABBITMQ_HOST', 'host');
    vi.stubEnv('RABBITMQ_PORT', '1234');

    const onDataChange = vi.fn();
    await listenForDataChange(onDataChange);

    const channelOnCallback = vi
      .mocked(mockChannel.on)
      .mock.calls.find((call) => call[0] === 'error')?.[1];

    expect(channelOnCallback).toBeDefined();

    const logErrorSpy = vi.spyOn(log, 'error').mockImplementation(() => {});

    const channelError = new Error('channel error');
    channelOnCallback!(channelError);

    expect(logErrorSpy).toHaveBeenCalledWith(
      { err: channelError },
      'RabbitMQ channel error: channel error',
    );
    logErrorSpy.mockRestore();
  });

  it('handles channel close', async () => {
    const { mockChannel } = setupMocks();

    vi.stubEnv('RABBITMQ_HOST', 'host');
    vi.stubEnv('RABBITMQ_PORT', '1234');

    const onDataChange = vi.fn();
    await listenForDataChange(onDataChange);

    const channelOnCallback = vi
      .mocked(mockChannel.on)
      .mock.calls.find((call) => call[0] === 'close')?.[1];

    expect(channelOnCallback).toBeDefined();

    const logErrorSpy = vi.spyOn(log, 'error').mockImplementation(() => {});

    channelOnCallback!();

    expect(logErrorSpy).toHaveBeenCalledWith(
      {
        err: expect.objectContaining({
          message: 'RabbitMQ channel closed.',
        }),
      },
      'RabbitMQ channel closed: RabbitMQ channel closed.',
    );
    logErrorSpy.mockRestore();
  });

  it('handles unexpected promise rejection', async () => {
    vi.stubEnv('RABBITMQ_HOST', 'host');
    vi.stubEnv('RABBITMQ_PORT', '1234');
    vi.mocked(amqplib.connect).mockRejectedValueOnce(new Error('unexpected'));

    const onDataChange = vi.fn();
    const spy = vi.spyOn(log, 'error').mockImplementation(() => {});

    await listenForDataChange(onDataChange);

    expect(spy).toHaveBeenCalledWith(
      {
        err: expect.objectContaining({
          message: 'unexpected',
        }),
      },
      'Error starting RabbitMQ consumer: unexpected',
    );
    spy.mockRestore();
  });
});
