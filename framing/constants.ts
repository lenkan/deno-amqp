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
