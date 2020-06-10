/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type TrainingFormatsEditMutationVariables = {
    trainingFormatId: number;
    description: string;
};
export type TrainingFormatsEditMutationResponse = {
    readonly updateFormatById: {
        readonly trainingFormatId: number;
        readonly description: string;
    };
};
export type TrainingFormatsEditMutation = {
    readonly response: TrainingFormatsEditMutationResponse;
    readonly variables: TrainingFormatsEditMutationVariables;
};



/*
mutation TrainingFormatsEditMutation(
  $trainingFormatId: Float!
  $description: String!
) {
  updateFormatById(id: $trainingFormatId, description: $description) {
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
    "name": "trainingFormatId",
    "type": "Float!"
  },
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
      },
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "trainingFormatId"
      }
    ],
    "concreteType": "FormatEntity",
    "kind": "LinkedField",
    "name": "updateFormatById",
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
    "name": "TrainingFormatsEditMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TrainingFormatsEditMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "TrainingFormatsEditMutation",
    "operationKind": "mutation",
    "text": "mutation TrainingFormatsEditMutation(\n  $trainingFormatId: Float!\n  $description: String!\n) {\n  updateFormatById(id: $trainingFormatId, description: $description) {\n    trainingFormatId: id\n    description\n  }\n}\n"
  }
};
})();
(node as any).hash = '465f254c2a50c6a08fe6a0bccfdb912f';
export default node;
