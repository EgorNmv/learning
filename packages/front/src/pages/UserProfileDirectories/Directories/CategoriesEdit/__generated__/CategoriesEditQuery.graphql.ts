/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type CategoriesEditQueryVariables = {
    categoryId: number;
};
export type CategoriesEditQueryResponse = {
    readonly category: {
        readonly categoryId: number;
        readonly description: string;
    } | null;
};
export type CategoriesEditQuery = {
    readonly response: CategoriesEditQueryResponse;
    readonly variables: CategoriesEditQueryVariables;
};



/*
query CategoriesEditQuery(
  $categoryId: Float!
) {
  category(id: $categoryId) {
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
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "categoryId"
      }
    ],
    "concreteType": "CategoryEntity",
    "kind": "LinkedField",
    "name": "category",
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
    "name": "CategoriesEditQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CategoriesEditQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "CategoriesEditQuery",
    "operationKind": "query",
    "text": "query CategoriesEditQuery(\n  $categoryId: Float!\n) {\n  category(id: $categoryId) {\n    categoryId: id\n    description\n  }\n}\n"
  }
};
})();
(node as any).hash = '78e84adb3ee7aaa3699f1b68a7d6affe';
export default node;
