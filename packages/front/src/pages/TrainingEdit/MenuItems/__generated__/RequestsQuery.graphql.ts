/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type RequestsQueryVariables = {
    trainingId: number;
};
export type RequestsQueryResponse = {
    readonly requestsByTrainingId: ReadonlyArray<{
        readonly requestId: number;
        readonly userId: string;
        readonly date: string;
        readonly status: number | null;
    }>;
};
export type RequestsQuery = {
    readonly response: RequestsQueryResponse;
    readonly variables: RequestsQueryVariables;
};



/*
query RequestsQuery(
  $trainingId: Float!
) {
  requestsByTrainingId(trainingId: $trainingId) {
    requestId: id
    userId
    date
    status
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "trainingId",
    "type": "Float!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "trainingId",
        "variableName": "trainingId"
      }
    ],
    "concreteType": "RequestEntity",
    "kind": "LinkedField",
    "name": "requestsByTrainingId",
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
    "name": "RequestsQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RequestsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "RequestsQuery",
    "operationKind": "query",
    "text": "query RequestsQuery(\n  $trainingId: Float!\n) {\n  requestsByTrainingId(trainingId: $trainingId) {\n    requestId: id\n    userId\n    date\n    status\n  }\n}\n"
  }
};
})();
(node as any).hash = '3d83321807dbb9ca5dd5f2d812af8ca5';
export default node;
