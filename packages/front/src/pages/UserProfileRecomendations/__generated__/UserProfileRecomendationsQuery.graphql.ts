/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type UserProfileRecomendationsQueryVariables = {
    userId: string;
    feedbackType: number;
};
export type UserProfileRecomendationsQueryResponse = {
    readonly feedbacksByUserId: ReadonlyArray<{
        readonly feedbackId: number;
        readonly text: string;
        readonly training: {
            readonly trainingId: number;
            readonly name: string;
            readonly category: {
                readonly categoryId: number;
            };
        };
        readonly status: number | null;
        readonly date: string;
    }>;
};
export type UserProfileRecomendationsQuery = {
    readonly response: UserProfileRecomendationsQueryResponse;
    readonly variables: UserProfileRecomendationsQueryVariables;
};



/*
query UserProfileRecomendationsQuery(
  $userId: String!
  $feedbackType: Float!
) {
  feedbacksByUserId(userId: $userId, feedbackType: $feedbackType) {
    feedbackId: id
    text
    training {
      trainingId: id
      name
      category {
        categoryId: id
      }
    }
    status
    date
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "feedbackType",
    "type": "Float!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "feedbackType",
        "variableName": "feedbackType"
      },
      {
        "kind": "Variable",
        "name": "userId",
        "variableName": "userId"
      }
    ],
    "concreteType": "FeedbackEntity",
    "kind": "LinkedField",
    "name": "feedbacksByUserId",
    "plural": true,
    "selections": [
      {
        "alias": "feedbackId",
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "text",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "TrainingEntity",
        "kind": "LinkedField",
        "name": "training",
        "plural": false,
        "selections": [
          {
            "alias": "trainingId",
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CategoryEntity",
            "kind": "LinkedField",
            "name": "category",
            "plural": false,
            "selections": [
              {
                "alias": "categoryId",
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "date",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserProfileRecomendationsQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserProfileRecomendationsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "UserProfileRecomendationsQuery",
    "operationKind": "query",
    "text": "query UserProfileRecomendationsQuery(\n  $userId: String!\n  $feedbackType: Float!\n) {\n  feedbacksByUserId(userId: $userId, feedbackType: $feedbackType) {\n    feedbackId: id\n    text\n    training {\n      trainingId: id\n      name\n      category {\n        categoryId: id\n      }\n    }\n    status\n    date\n  }\n}\n"
  }
};
})();
(node as any).hash = '2d9d7b69f3e723de0231d1afcd6ef957';
export default node;
