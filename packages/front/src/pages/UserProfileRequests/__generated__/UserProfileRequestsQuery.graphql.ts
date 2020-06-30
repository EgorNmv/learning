/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type UserProfileRequestsQueryVariables = {
    userId: string;
};
export type UserProfileRequestsQueryResponse = {
    readonly requestsBySub: ReadonlyArray<{
        readonly requestId: number;
        readonly userId: string;
        readonly date: string;
        readonly status: number | null;
        readonly training: {
            readonly name: string;
        };
    }>;
};
export type UserProfileRequestsQuery = {
    readonly response: UserProfileRequestsQueryResponse;
    readonly variables: UserProfileRequestsQueryVariables;
};



/*
query UserProfileRequestsQuery(
  $userId: String!
) {
  requestsBySub(userId: $userId) {
    requestId: id
    userId
    date
    status
    training {
      name
    }
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
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "userId",
        "variableName": "userId"
      }
    ],
    "concreteType": "RequestEntity",
    "kind": "LinkedField",
    "name": "requestsBySub",
    "plural": true,
    "selections": [
      {
        "alias": "requestId",
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "userId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "date",
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
        "concreteType": "TrainingEntity",
        "kind": "LinkedField",
        "name": "training",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          }
        ],
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
    "name": "UserProfileRequestsQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserProfileRequestsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "UserProfileRequestsQuery",
    "operationKind": "query",
    "text": "query UserProfileRequestsQuery(\n  $userId: String!\n) {\n  requestsBySub(userId: $userId) {\n    requestId: id\n    userId\n    date\n    status\n    training {\n      name\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '86891af354b7ce7add38732f82dfd5a0';
export default node;
