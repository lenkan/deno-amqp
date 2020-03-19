export function hasContent(classId: number, methodId: number) {
  switch (classId) {
    case 10:
      switch (methodId) {
      }
      break;

    case 20:
      switch (methodId) {
      }
      break;

    case 30:
      switch (methodId) {
      }
      break;

    case 40:
      switch (methodId) {
      }
      break;

    case 50:
      switch (methodId) {
      }
      break;

    case 60:
      switch (methodId) {
        case 40:
          return true;
        case 50:
          return true;
        case 60:
          return true;

        case 71:
          return true;
      }
      break;

    case 90:
      switch (methodId) {
      }
      break;

    case 85:
      switch (methodId) {
      }
      break;
  }

  return false;
}

export function getClassName(classId: number) {
  switch (classId) {
    case 10:
      return "connection";
    case 20:
      return "channel";
    case 30:
      return "access";
    case 40:
      return "exchange";
    case 50:
      return "queue";
    case 60:
      return "basic";
    case 90:
      return "tx";
    case 85:
      return "confirm";
  }

  throw new Error("Unknown classId");
}

export function getMethodName(classId: number, methodId: number) {
  switch (classId) {
    case 10:
      switch (methodId) {
        case 10:
          return "connection.start";
        case 11:
          return "connection.start-ok";
        case 20:
          return "connection.secure";
        case 21:
          return "connection.secure-ok";
        case 30:
          return "connection.tune";
        case 31:
          return "connection.tune-ok";
        case 40:
          return "connection.open";
        case 41:
          return "connection.open-ok";
        case 50:
          return "connection.close";
        case 51:
          return "connection.close-ok";
        case 60:
          return "connection.blocked";
        case 61:
          return "connection.unblocked";
        case 70:
          return "connection.update-secret";
        case 71:
          return "connection.update-secret-ok";
      }
      break;

    case 20:
      switch (methodId) {
        case 10:
          return "channel.open";
        case 11:
          return "channel.open-ok";
        case 20:
          return "channel.flow";
        case 21:
          return "channel.flow-ok";
        case 40:
          return "channel.close";
        case 41:
          return "channel.close-ok";
      }
      break;

    case 30:
      switch (methodId) {
        case 10:
          return "access.request";
        case 11:
          return "access.request-ok";
      }
      break;

    case 40:
      switch (methodId) {
        case 10:
          return "exchange.declare";
        case 11:
          return "exchange.declare-ok";
        case 20:
          return "exchange.delete";
        case 21:
          return "exchange.delete-ok";
        case 30:
          return "exchange.bind";
        case 31:
          return "exchange.bind-ok";
        case 40:
          return "exchange.unbind";
        case 51:
          return "exchange.unbind-ok";
      }
      break;

    case 50:
      switch (methodId) {
        case 10:
          return "queue.declare";
        case 11:
          return "queue.declare-ok";
        case 20:
          return "queue.bind";
        case 21:
          return "queue.bind-ok";
        case 30:
          return "queue.purge";
        case 31:
          return "queue.purge-ok";
        case 40:
          return "queue.delete";
        case 41:
          return "queue.delete-ok";
        case 50:
          return "queue.unbind";
        case 51:
          return "queue.unbind-ok";
      }
      break;

    case 60:
      switch (methodId) {
        case 10:
          return "basic.qos";
        case 11:
          return "basic.qos-ok";
        case 20:
          return "basic.consume";
        case 21:
          return "basic.consume-ok";
        case 30:
          return "basic.cancel";
        case 31:
          return "basic.cancel-ok";
        case 40:
          return "basic.publish";
        case 50:
          return "basic.return";
        case 60:
          return "basic.deliver";
        case 70:
          return "basic.get";
        case 71:
          return "basic.get-ok";
        case 72:
          return "basic.get-empty";
        case 80:
          return "basic.ack";
        case 90:
          return "basic.reject";
        case 100:
          return "basic.recover-async";
        case 110:
          return "basic.recover";
        case 111:
          return "basic.recover-ok";
        case 120:
          return "basic.nack";
      }
      break;

    case 90:
      switch (methodId) {
        case 10:
          return "tx.select";
        case 11:
          return "tx.select-ok";
        case 20:
          return "tx.commit";
        case 21:
          return "tx.commit-ok";
        case 30:
          return "tx.rollback";
        case 31:
          return "tx.rollback-ok";
      }
      break;

    case 85:
      switch (methodId) {
        case 10:
          return "confirm.select";
        case 11:
          return "confirm.select-ok";
      }
      break;
  }

  throw new Error("Unknown classId/methodId");
}
