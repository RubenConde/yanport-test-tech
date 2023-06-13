import { HttpStatus } from '@nestjs/common';
import { ApiResponseSchemaHost } from '@nestjs/swagger';
import { CardinalDirections } from '../dto/setupHover.dto';

export const okResponse: ApiResponseSchemaHost = {
  schema: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        cmd: {
          title: 'Command',
          description: 'The command used in this step',
          type: 'string',
        },
        position: {
          title: 'Position',
          description: "The hoover's position for this step",
          type: 'object',
          properties: {
            x: {
              title: 'Coordinate X',
              type: 'integer',
            },
            y: {
              title: 'Coordinate Y',
              type: 'integer',
            },
            orientation: {
              title: 'Orientation',
              type: 'string',
              enum: Object.values(CardinalDirections),
            },
          },
        },
        order: {
          title: 'Order',
          description: 'The order number related to all the steps',
          type: 'integer',
        },
      },
    },
  },
};

export const badRequestResponse: ApiResponseSchemaHost = {
  schema: {
    type: 'object',
    properties: {
      statusCode: {
        title: 'Status Code',
        type: 'integer',
        default: HttpStatus.BAD_REQUEST,
      },
      message: {
        title: 'Message',
        type: 'array',
        items: {
          type: 'string',
          title: 'Error detail',
          description: 'Message describing the error occurred in the request',
        },
      },
      error: {
        title: 'Error',
        type: 'string',
        default: 'Bad Request',
      },
    },
  },
};
