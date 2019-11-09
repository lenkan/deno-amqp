/**
 * FRAME-METHOD
 */
export const FRAME_METHOD = 1;

/**
 * FRAME-HEADER
 */
export const FRAME_HEADER = 2;

/**
 * FRAME-BODY
 */
export const FRAME_BODY = 3;

/**
 * FRAME-HEARTBEAT
 */
export const FRAME_HEARTBEAT = 8;

/**
 * FRAME-MIN-SIZE
 */
export const FRAME_MIN_SIZE = 4096;

/**
 * FRAME-END
 */
export const FRAME_END = 206;

/**
 * REPLY-SUCCESS
 */
export const REPLY_SUCCESS = 200;

/**
 * CONTENT-TOO-LARGE (soft-error)
 */
export const CONTENT_TOO_LARGE = 311;

/**
 * NO-ROUTE (soft-error)
 */
export const NO_ROUTE = 312;

/**
 * NO-CONSUMERS (soft-error)
 */
export const NO_CONSUMERS = 313;

/**
 * ACCESS-REFUSED (soft-error)
 */
export const ACCESS_REFUSED = 403;

/**
 * NOT-FOUND (soft-error)
 */
export const NOT_FOUND = 404;

/**
 * RESOURCE-LOCKED (soft-error)
 */
export const RESOURCE_LOCKED = 405;

/**
 * PRECONDITION-FAILED (soft-error)
 */
export const PRECONDITION_FAILED = 406;

/**
 * CONNECTION-FORCED (hard-error)
 */
export const CONNECTION_FORCED = 320;

/**
 * INVALID-PATH (hard-error)
 */
export const INVALID_PATH = 402;

/**
 * FRAME-ERROR (hard-error)
 */
export const FRAME_ERROR = 501;

/**
 * SYNTAX-ERROR (hard-error)
 */
export const SYNTAX_ERROR = 502;

/**
 * COMMAND-INVALID (hard-error)
 */
export const COMMAND_INVALID = 503;

/**
 * CHANNEL-ERROR (hard-error)
 */
export const CHANNEL_ERROR = 504;

/**
 * UNEXPECTED-FRAME (hard-error)
 */
export const UNEXPECTED_FRAME = 505;

/**
 * RESOURCE-ERROR (hard-error)
 */
export const RESOURCE_ERROR = 506;

/**
 * NOT-ALLOWED (hard-error)
 */
export const NOT_ALLOWED = 530;

/**
 * NOT-IMPLEMENTED (hard-error)
 */
export const NOT_IMPLEMENTED = 540;

/**
 * INTERNAL-ERROR (hard-error)
 */
export const INTERNAL_ERROR = 541;

export const CONNECTION = 10;

export const CONNECTION_START = 10;

export const CONNECTION_START_OK = 11;

export const CONNECTION_SECURE = 20;

export const CONNECTION_SECURE_OK = 21;

export const CONNECTION_TUNE = 30;

export const CONNECTION_TUNE_OK = 31;

export const CONNECTION_OPEN = 40;

export const CONNECTION_OPEN_OK = 41;

export const CONNECTION_CLOSE = 50;

export const CONNECTION_CLOSE_OK = 51;

export const CONNECTION_BLOCKED = 60;

export const CONNECTION_UNBLOCKED = 61;

export const CONNECTION_UPDATE_SECRET = 70;

export const CONNECTION_UPDATE_SECRET_OK = 71;

export const CHANNEL = 20;

export const CHANNEL_OPEN = 10;

export const CHANNEL_OPEN_OK = 11;

export const CHANNEL_FLOW = 20;

export const CHANNEL_FLOW_OK = 21;

export const CHANNEL_CLOSE = 40;

export const CHANNEL_CLOSE_OK = 41;

export const ACCESS = 30;

export const ACCESS_REQUEST = 10;

export const ACCESS_REQUEST_OK = 11;

export const EXCHANGE = 40;

export const EXCHANGE_DECLARE = 10;

export const EXCHANGE_DECLARE_OK = 11;

export const EXCHANGE_DELETE = 20;

export const EXCHANGE_DELETE_OK = 21;

export const EXCHANGE_BIND = 30;

export const EXCHANGE_BIND_OK = 31;

export const EXCHANGE_UNBIND = 40;

export const EXCHANGE_UNBIND_OK = 51;

export const QUEUE = 50;

export const QUEUE_DECLARE = 10;

export const QUEUE_DECLARE_OK = 11;

export const QUEUE_BIND = 20;

export const QUEUE_BIND_OK = 21;

export const QUEUE_PURGE = 30;

export const QUEUE_PURGE_OK = 31;

export const QUEUE_DELETE = 40;

export const QUEUE_DELETE_OK = 41;

export const QUEUE_UNBIND = 50;

export const QUEUE_UNBIND_OK = 51;

export const BASIC = 60;

export const BASIC_QOS = 10;

export const BASIC_QOS_OK = 11;

export const BASIC_CONSUME = 20;

export const BASIC_CONSUME_OK = 21;

export const BASIC_CANCEL = 30;

export const BASIC_CANCEL_OK = 31;

export const BASIC_PUBLISH = 40;

export const BASIC_RETURN = 50;

export const BASIC_DELIVER = 60;

export const BASIC_GET = 70;

export const BASIC_GET_OK = 71;

export const BASIC_GET_EMPTY = 72;

export const BASIC_ACK = 80;

export const BASIC_REJECT = 90;

export const BASIC_RECOVER_ASYNC = 100;

export const BASIC_RECOVER = 110;

export const BASIC_RECOVER_OK = 111;

export const BASIC_NACK = 120;

export const TX = 90;

export const TX_SELECT = 10;

export const TX_SELECT_OK = 11;

export const TX_COMMIT = 20;

export const TX_COMMIT_OK = 21;

export const TX_ROLLBACK = 30;

export const TX_ROLLBACK_OK = 31;

export const CONFIRM = 85;

export const CONFIRM_SELECT = 10;

export const CONFIRM_SELECT_OK = 11;
