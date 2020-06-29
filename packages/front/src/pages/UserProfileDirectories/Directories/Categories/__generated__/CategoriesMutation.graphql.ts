/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type CategoriesMutationVariables = {
    id: number;
};
export type CategoriesMutationResponse = {
    readonly deleteCategoryById: boolean;
};
export type CategoriesMutation = {
    readonly response: CategoriesMutationResponse;
    readonly variables: CategoriesMutationVariables;
};



/*
mutation CategoriesMutation(
  $id: Float!
) {
  deleteCategoryById(id: $id)
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
    "name": "deleteCategoryById",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CategoriesMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CategoriesMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "CategoriesMutation",
    "operationKind": "mutation",
    "text": "mutation CategoriesMutation(\n  $id: Float!\n) {\n  deleteCategoryById(id: $id)\n}\n"
  }
};
})();
(node as any).hash = 'b10653daa6ec533951cb095d864073b7';
export default node;
