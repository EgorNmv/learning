/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type TargetAudienceMutationVariables = {
    id: number;
};
export type TargetAudienceMutationResponse = {
    readonly deleteTargetAudienceById: boolean;
};
export type TargetAudienceMutation = {
    readonly response: TargetAudienceMutationResponse;
    readonly variables: TargetAudienceMutationVariables;
};



/*
mutation TargetAudienceMutation(
  $id: Float!
) {
  deleteTargetAudienceById(id: $id)
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id",
    "type": "Float!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "kind": "ScalarField",
    "name": "deleteTargetAudienceById",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TargetAudienceMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TargetAudienceMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "TargetAudienceMutation",
    "operationKind": "mutation",
    "text": "mutation TargetAudienceMutation(\n  $id: Float!\n) {\n  deleteTargetAudienceById(id: $id)\n}\n"
  }
};
})();
(node as any).hash = 'e787c4bfcba76de0297b71398221b967';
export default node;
