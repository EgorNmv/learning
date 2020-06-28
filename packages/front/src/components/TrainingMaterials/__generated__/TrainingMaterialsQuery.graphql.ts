/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type TrainingMaterialsQueryVariables = {
    trainingId: number;
};
export type TrainingMaterialsQueryResponse = {
    readonly materialsByTrainingId: ReadonlyArray<{
        readonly link: string;
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
    link
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
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "link",
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
    "text": "query TrainingMaterialsQuery(\n  $trainingId: Float!\n) {\n  materialsByTrainingId(trainingId: $trainingId) {\n    link\n  }\n}\n"
  }
};
})();
(node as any).hash = 'dfda120f65bbbbc45197505c1ed90fb6';
export default node;
