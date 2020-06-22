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
        readonly label: string | null;
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
    "text": "query CategoriesEditQuery(\n  $categoryId: Float!\n) {\n  category(id: $categoryId) {\n    categoryId: id\n    description\n    label\n  }\n}\n"
  }
};
})();
(node as any).hash = '4e8b996a734a1aca71d4dc784b681f8e';
export default node;
