/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type InputMaterial = {
    link: string;
    originName?: string | null;
    trainingId: number;
};
export type TrainingMaterialsMutationVariables = {
    data: InputMaterial;
};
export type TrainingMaterialsMutationResponse = {
    readonly createMaterial: {
        readonly link: string;
        readonly originName: string | null;
        readonly materialId: number;
    };
};
export type TrainingMaterialsMutation = {
    readonly response: TrainingMaterialsMutationResponse;
    readonly variables: TrainingMaterialsMutationVariables;
};



/*
mutation TrainingMaterialsMutation(
  $data: InputMaterial!
) {
  createMaterial(data: $data) {
    link
    originName
    materialId: id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "data",
    "type": "InputMaterial!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "data",
        "variableName": "data"
      }
    ],
    "concreteType": "MaterialEntity",
    "kind": "LinkedField",
    "name": "createMaterial",
    "plural": false,
    "selections": [
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
      },
      {
        "alias": "materialId",
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "TrainingMaterialsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TrainingMaterialsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "TrainingMaterialsMutation",
    "operationKind": "mutation",
    "text": "mutation TrainingMaterialsMutation(\n  $data: InputMaterial!\n) {\n  createMaterial(data: $data) {\n    link\n    originName\n    materialId: id\n  }\n}\n"
  }
};
})();
(node as any).hash = '2897e399887632ec52129bcbbabfcb3d';
export default node;
