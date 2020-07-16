/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type UserProfileEventsMutationVariables = {
    id: number;
};
export type UserProfileEventsMutationResponse = {
    readonly deleteTrainingById: boolean;
};
export type UserProfileEventsMutation = {
    readonly response: UserProfileEventsMutationResponse;
    readonly variables: UserProfileEventsMutationVariables;
};



/*
mutation UserProfileEventsMutation(
  $id: Float!
) {
  deleteTrainingById(id: $id)
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
    "name": "deleteTrainingById",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserProfileEventsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserProfileEventsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "UserProfileEventsMutation",
    "operationKind": "mutation",
    "text": "mutation UserProfileEventsMutation(\n  $id: Float!\n) {\n  deleteTrainingById(id: $id)\n}\n"
  }
};
})();
(node as any).hash = 'eb4598ba4e523487056e3a3ea7fc5f4a';
export default node;
