export interface Frame {
  channel: number;
  type: number;
  payload: Uint8Array;
}

export interface AmqpReader {
  read(): Promise<Frame>;
}

export interface AmqpWriter {
  write(frame: Frame): Promise<void>;
}

export interface AmqpReaderWriter extends AmqpReader, AmqpWriter {}
