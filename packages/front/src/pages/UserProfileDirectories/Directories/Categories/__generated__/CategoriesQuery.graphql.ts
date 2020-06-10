/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type CategoriesQueryVariables = {};
export type CategoriesQueryResponse = {
    readonly categories: ReadonlyArray<{
        readonly categoryId: number;
        readonly description: string;
    }>;
};
export type CategoriesQuery = {
    readonly response: CategoriesQueryResponse;
    readonly variables: CategoriesQueryVariables;
};



/*
query CategoriesQuery {
  categories {
    categoryId: id
    description
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "CategoryEntity",
    "kind": "LinkedField",
    "name": "categories",
    "plural": true,
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CategoriesQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CategoriesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "CategoriesQuery",
    "operationKind": "query",
    "text": "query CategoriesQuery {\n  categories {\n    categoryId: id\n    description\n  }\n}\n"
  }
};
})();
(node as any).hash = '6f08f9165a8752a98ae4f9fda14c046c';
export default node;
