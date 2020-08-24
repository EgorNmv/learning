/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type TrainingMaterialsQueryVariables = {
    trainingId: number;
};
export type TrainingMaterialsQueryResponse = {
    readonly materialsByTrainingId: ReadonlyArray<{
        readonly materialId: number;
        readonly link: string;
        readonly originName: string | null;
    }>;
};
export type TrainingMaterialsQuery = {
    readonly response: TrainingMaterialsQueryResponse;
    readonly variables: TrainingMaterialsQueryVariables;
};



/*
query TrainingMaterialsQuery(
  $trainingId: Float!
) {
  materialsByTrainingId(trainingId: $trainingId) {
    materialId: id
    link
    originName
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "trainingId",
    "type": "Float!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "trainingId",
        "variableName": "trainingId"
      }
    ],
    "concreteType": "MaterialEntity",
    "kind": "LinkedField",
    "name": "materialsByTrainingId",
    "plural": true,
    "selections": [
      {
        "alias": "materialId",
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "link",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "originName",
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
    "name": "TrainingMaterialsQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TrainingMaterialsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "TrainingMaterialsQuery",
    "operationKind": "query",
    "text": "query TrainingMaterialsQuery(\n  $trainingId: Float!\n) {\n  materialsByTrainingId(trainingId: $trainingId) {\n    materialId: id\n    link\n    originName\n  }\n}\n"
  }
};
})();
(node as any).hash = '4fb313191c1ce2400aa13db198d2a1e3';
export default node;
