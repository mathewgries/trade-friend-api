import * as uuid from "uuid";
import handler from '../libs/handler-lib';
import dynamoDb from '../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            watchlistId: uuid.v1(),
            watchlistName: data.watchlistName,
            tickers: [],
            created: Date.now(),
        },
    };

    await dynamoDb.put(params);

    return params.Item;
});