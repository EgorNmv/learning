/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type TrainingFormMutationVariables = {
    file: unknown;
};
export type TrainingFormMutationResponse = {
    readonly uploadFile: boolean;
};
export type TrainingFormMutation = {
    readonly response: TrainingFormMutationResponse;
    readonly variables: TrainingFormMutationVariables;
};



/*
mutation TrainingFormMutation(
  $file: Upload!
) {
  uploadFile(file: $file)
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "file",
    "type": "Upload!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "file",
        "variableName": "file"
      }
    ],
    "kind": "ScalarField",
    "name": "uploadFile",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TrainingFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TrainingFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "TrainingFormMutation",
    "operationKind": "mutation",
    "text": "mutation TrainingFormMutation(\n  $file: Upload!\n) {\n  uploadFile(file: $file)\n}\n"
  }
};
})();
(node as any).hash = '7abc68c393de374d4df3b0451c3950c8';
export default node;
