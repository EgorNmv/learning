/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type CategoriesCreateMutationVariables = {
    description: string;
    label?: string | null;
};
export type CategoriesCreateMutationResponse = {
    readonly createCategory: {
        readonly categoryId: number;
        readonly description: string;
        readonly label: string | null;
    };
};
export type CategoriesCreateMutation = {
    readonly response: CategoriesCreateMutationResponse;
    readonly variables: CategoriesCreateMutationVariables;
};



/*
mutation CategoriesCreateMutation(
  $description: String!
  $label: String
) {
  createCategory(description: $description, label: $label) {
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
        "name": "label",
        "variableName": "label"
      }
    ],
    "concreteType": "CategoryEntity",
    "kind": "LinkedField",
    "name": "createCategory",
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
    "name": "CategoriesCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CategoriesCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "CategoriesCreateMutation",
    "operationKind": "mutation",
    "text": "mutation CategoriesCreateMutation(\n  $description: String!\n  $label: String\n) {\n  createCategory(description: $description, label: $label) {\n    categoryId: id\n    description\n    label\n  }\n}\n"
  }
};
})();
(node as any).hash = '7c85e54ed6f6af9dd679f16a3b75453a';
export default node;
