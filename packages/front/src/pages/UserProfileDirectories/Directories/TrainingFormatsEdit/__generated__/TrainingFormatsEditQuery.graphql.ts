/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type TrainingFormatsEditQueryVariables = {
    trainingFormatId: number;
};
export type TrainingFormatsEditQueryResponse = {
    readonly format: {
        readonly trainingFormatId: number;
        readonly description: string;
    } | null;
};
export type TrainingFormatsEditQuery = {
    readonly response: TrainingFormatsEditQueryResponse;
    readonly variables: TrainingFormatsEditQueryVariables;
};



/*
query TrainingFormatsEditQuery(
  $trainingFormatId: Float!
) {
  format(id: $trainingFormatId) {
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
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "trainingFormatId"
      }
    ],
    "concreteType": "FormatEntity",
    "kind": "LinkedField",
    "name": "format",
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
    "name": "TrainingFormatsEditQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TrainingFormatsEditQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "TrainingFormatsEditQuery",
    "operationKind": "query",
    "text": "query TrainingFormatsEditQuery(\n  $trainingFormatId: Float!\n) {\n  format(id: $trainingFormatId) {\n    trainingFormatId: id\n    description\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e89a023354b389ad89ac9b9d8c159493';
export default node;
