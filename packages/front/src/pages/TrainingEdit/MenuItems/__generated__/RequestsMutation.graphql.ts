/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type InputRequest = {
    date: string;
    status?: number | null;
    trainingId: number;
    userId: string;
};
export type RequestsMutationVariables = {
    requestId: number;
    data: InputRequest;
};
export type RequestsMutationResponse = {
    readonly updateRequestById: {
        readonly requestId: number;
        readonly userId: string;
        readonly date: string;
        readonly status: number | null;
    };
};
export type RequestsMutation = {
    readonly response: RequestsMutationResponse;
    readonly variables: RequestsMutationVariables;
};



/*
mutation RequestsMutation(
  $requestId: Float!
  $data: InputRequest!
) {
  updateRequestById(id: $requestId, data: $data) {
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
    "name": "requestId",
    "type": "Float!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "data",
    "type": "InputRequest!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "data",
        "variableName": "data"
      },
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "requestId"
      }
    ],
    "concreteType": "RequestEntity",
    "kind": "LinkedField",
    "name": "updateRequestById",
    "plural": false,
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
    "name": "RequestsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RequestsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "RequestsMutation",
    "operationKind": "mutation",
    "text": "mutation RequestsMutation(\n  $requestId: Float!\n  $data: InputRequest!\n) {\n  updateRequestById(id: $requestId, data: $data) {\n    requestId: id\n    userId\n    date\n    status\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ee510ab1d4a655e7eaf02dc44c364e8d';
export default node;
