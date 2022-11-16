import {HTTP_STATUS_CODES} from "@aicore/libcommonutils";
import {getClient} from "../clients/meiliSearchClient.js";

const client = getClient();

// Refer https://json-schema.org/understanding-json-schema/index.html
const searchSchema = {
    schema: {
        body: {
            type: 'object',
            required: ['index', 'query'],
            properties: {
                index: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 15
                },
                query: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 15
                },
                options: {
                    type: 'object',
                    minProperties: 1

                }
            }
        },
        response: {
            200: { //HTTP_STATUS_CODES.OK
                type: 'object',
                required: ['isSuccess', 'results'],
                properties: {
                    isSuccess: {type: 'boolean', default: false},
                    results: {
                        type: 'object',
                        additionalProperties: true,
                        minProperties: 0
                    },
                    errorMessage: {type: 'string'}
                }
            },
            400: { //HTTP_STATUS_CODES.BAD_REQUEST
                type: 'object',
                required: ['isSuccess', 'errorMessage'],
                properties: {
                    isSuccess: {type: 'boolean', default: false},
                    errorMessage: {
                        type: 'string',
                        default: "Please provide valid parameters"
                    }
                }
            }
        }
    }
};

export function getSearchSchema() {
    return searchSchema;
}

export async function search(request, reply) {
    const index = request.body.index;
    const query = request.body.query;
    const options = request.body.options;
    try {
        const results = await client.index(index).search(query, options);
        return {
            isSuccess: true,
            results: results
        };
    } catch (e) {
        reply.code(HTTP_STATUS_CODES.BAD_REQUEST);
        request.log.error(e);
        return {
            isSuccess: false,
            errorMessage: 'Unable to get data from DB'
        };

    }
}
