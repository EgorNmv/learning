/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type TrainingFormatsCreateMutationVariables = {
    description: string;
};
export type TrainingFormatsCreateMutationResponse = {
    readonly createFormat: {
        readonly trainingFormatId: number;
        readonly description: string;
    };
};
export type TrainingFormatsCreateMutation = {
    readonly response: TrainingFormatsCreateMutationResponse;
    readonly variables: TrainingFormatsCreateMutationVariables;
};



/*
mutation TrainingFormatsCreateMutation(
  $description: String!
) {
  createFormat(description: $description) {
    trainingFormatId: id
    description
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "description",
    "type": "String!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "description",
        "variableName": "description"
      }
    ],
    "concreteType": "FormatEntity",
    "kind": "LinkedField",
    "name": "createFormat",
    "plural": false,
    "selections": [
      {
        "alias": "trainingFormatId",
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
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
    "name": "TrainingFormatsCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TrainingFormatsCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "TrainingFormatsCreateMutation",
    "operationKind": "mutation",
    "text": "mutation TrainingFormatsCreateMutation(\n  $description: String!\n) {\n  createFormat(description: $description) {\n    trainingFormatId: id\n    description\n  }\n}\n"
  }
};
})();
(node as any).hash = '936405bba0c96d99872092a50662aeb6';
export default node;
