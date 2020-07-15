/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type TrainingFormatsMutationVariables = {
    id: number;
};
export type TrainingFormatsMutationResponse = {
    readonly deleteFormatById: boolean;
};
export type TrainingFormatsMutation = {
    readonly response: TrainingFormatsMutationResponse;
    readonly variables: TrainingFormatsMutationVariables;
};



/*
mutation TrainingFormatsMutation(
  $id: Float!
) {
  deleteFormatById(id: $id)
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
    "name": "deleteFormatById",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TrainingFormatsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TrainingFormatsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "TrainingFormatsMutation",
    "operationKind": "mutation",
    "text": "mutation TrainingFormatsMutation(\n  $id: Float!\n) {\n  deleteFormatById(id: $id)\n}\n"
  }
};
})();
(node as any).hash = '14e307d69958ad63ff7d2b148d275c49';
export default node;
