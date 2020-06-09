/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type CategoriesCreateMutationVariables = {
    description: string;
};
export type CategoriesCreateMutationResponse = {
    readonly createCategory: {
        readonly categoryId: number;
        readonly description: string;
    };
};
export type CategoriesCreateMutation = {
    readonly response: CategoriesCreateMutationResponse;
    readonly variables: CategoriesCreateMutationVariables;
};



/*
mutation CategoriesCreateMutation(
  $description: String!
) {
  createCategory(description: $description) {
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
    "text": "mutation CategoriesCreateMutation(\n  $description: String!\n) {\n  createCategory(description: $description) {\n    categoryId: id\n    description\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ff2fee1e3468b2125b073400c6d2dc75';
export default node;
