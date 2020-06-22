/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type CategoriesEditMutationVariables = {
    categoryId: number;
    description: string;
    label?: string | null;
};
export type CategoriesEditMutationResponse = {
    readonly updateCategoryById: {
        readonly categoryId: number;
        readonly description: string;
        readonly label: string | null;
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
  $label: String
) {
  updateCategoryById(id: $categoryId, description: $description, label: $label) {
    categoryId: id
    description
    label
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
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "label",
    "type": "String"
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
      },
      {
        "kind": "Variable",
        "name": "label",
        "variableName": "label"
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "label",
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
    "text": "mutation CategoriesEditMutation(\n  $categoryId: Float!\n  $description: String!\n  $label: String\n) {\n  updateCategoryById(id: $categoryId, description: $description, label: $label) {\n    categoryId: id\n    description\n    label\n  }\n}\n"
  }
};
})();
(node as any).hash = '6109403a00bcd841a6793f0d2acf2a64';
export default node;
