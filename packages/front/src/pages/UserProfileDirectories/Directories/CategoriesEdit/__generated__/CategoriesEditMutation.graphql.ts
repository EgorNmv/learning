/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type CategoriesEditMutationVariables = {
    categoryId: number;
    description: string;
};
export type CategoriesEditMutationResponse = {
    readonly updateCategoryById: {
        readonly categoryId: number;
        readonly description: string;
    };
};
export type CategoriesEditMutation = {
    readonly response: CategoriesEditMutationResponse;
    readonly variables: CategoriesEditMutationVariables;
};



/*
mutation CategoriesEditMutation(
  $categoryId: Float!
  $description: String!
) {
  updateCategoryById(id: $categoryId, description: $description) {
    categoryId: id
    description
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "categoryId",
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
        "variableName": "categoryId"
      }
    ],
    "concreteType": "CategoryEntity",
    "kind": "LinkedField",
    "name": "updateCategoryById",
    "plural": false,
    "selections": [
      {
        "alias": "categoryId",
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
    "name": "CategoriesEditMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CategoriesEditMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "CategoriesEditMutation",
    "operationKind": "mutation",
    "text": "mutation CategoriesEditMutation(\n  $categoryId: Float!\n  $description: String!\n) {\n  updateCategoryById(id: $categoryId, description: $description) {\n    categoryId: id\n    description\n  }\n}\n"
  }
};
})();
(node as any).hash = '08a4d9ece501a1c93241f89f4e96a2e0';
export default node;
