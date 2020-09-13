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
            readonly trainingId: number;
            readonly name: string;
            readonly organizer: {
                readonly name: string;
            };
            readonly start: string | null;
            readonly end: string | null;
            readonly category: {
                readonly categoryId: number;
            };
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
      trainingId: id
      name
      organizer {
        name
      }
      start
      end
      category {
        categoryId: id
      }
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
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
            "alias": "trainingId",
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "OrganizerEntity",
            "kind": "LinkedField",
            "name": "organizer",
            "plural": false,
            "selections": [
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "start",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "end",
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
    "selections": (v2/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserProfileRequestsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "UserProfileRequestsQuery",
    "operationKind": "query",
    "text": "query UserProfileRequestsQuery(\n  $userId: String!\n) {\n  requestsBySub(userId: $userId) {\n    requestId: id\n    userId\n    date\n    status\n    training {\n      trainingId: id\n      name\n      organizer {\n        name\n      }\n      start\n      end\n      category {\n        categoryId: id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd04fe086b917f029f741ade9efe478bf';
export default node;
