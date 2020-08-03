/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type ModalWithStepsMutationVariables = {
    ids: Array<number>;
};
export type ModalWithStepsMutationResponse = {
    readonly createReportByTrainingIds: string;
};
export type ModalWithStepsMutation = {
    readonly response: ModalWithStepsMutationResponse;
    readonly variables: ModalWithStepsMutationVariables;
};



/*
mutation ModalWithStepsMutation(
  $ids: [Float!]!
) {
  createReportByTrainingIds(ids: $ids)
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "ids",
    "type": "[Float!]!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "ids",
        "variableName": "ids"
      }
    ],
    "kind": "ScalarField",
    "name": "createReportByTrainingIds",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ModalWithStepsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ModalWithStepsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ModalWithStepsMutation",
    "operationKind": "mutation",
    "text": "mutation ModalWithStepsMutation(\n  $ids: [Float!]!\n) {\n  createReportByTrainingIds(ids: $ids)\n}\n"
  }
};
})();
(node as any).hash = '3b3807da9a4f6af32c6953b94db99052';
export default node;
