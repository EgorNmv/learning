/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type ModalWithStepsMutationVariables = {
    ids: Array<number>;
    onlyAllTrainingsReport: boolean;
};
export type ModalWithStepsMutationResponse = {
    readonly createReportByTrainingIds?: string;
    readonly createReportOnAllEvents?: string;
};
export type ModalWithStepsMutation = {
    readonly response: ModalWithStepsMutationResponse;
    readonly variables: ModalWithStepsMutationVariables;
};



/*
mutation ModalWithStepsMutation(
  $ids: [Float!]!
  $onlyAllTrainingsReport: Boolean!
) {
  createReportByTrainingIds(ids: $ids) @skip(if: $onlyAllTrainingsReport)
  createReportOnAllEvents @include(if: $onlyAllTrainingsReport)
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "ids",
    "type": "[Float!]!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "onlyAllTrainingsReport",
    "type": "Boolean!"
  }
],
v1 = [
  {
    "condition": "onlyAllTrainingsReport",
    "kind": "Condition",
    "passingValue": false,
    "selections": [
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
    ]
  },
  {
    "condition": "onlyAllTrainingsReport",
    "kind": "Condition",
    "passingValue": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createReportOnAllEvents",
        "storageKey": null
      }
    ]
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
    "text": "mutation ModalWithStepsMutation(\n  $ids: [Float!]!\n  $onlyAllTrainingsReport: Boolean!\n) {\n  createReportByTrainingIds(ids: $ids) @skip(if: $onlyAllTrainingsReport)\n  createReportOnAllEvents @include(if: $onlyAllTrainingsReport)\n}\n"
  }
};
})();
(node as any).hash = 'b4fdc2fb72555e206a8f1e578a6514b2';
export default node;
