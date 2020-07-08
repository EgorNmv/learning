/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type SiderLinkListQueryVariables = {};
export type SiderLinkListQueryResponse = {
    readonly categories: ReadonlyArray<{
        readonly categoryId: number;
        readonly description: string;
        readonly label: string | null;
    }>;
};
export type SiderLinkListQuery = {
    readonly response: SiderLinkListQueryResponse;
    readonly variables: SiderLinkListQueryVariables;
};



/*
query SiderLinkListQuery {
  categories {
    categoryId: id
    description
    label
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SiderLinkListQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SiderLinkListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "SiderLinkListQuery",
    "operationKind": "query",
    "text": "query SiderLinkListQuery {\n  categories {\n    categoryId: id\n    description\n    label\n  }\n}\n"
  }
};
})();
(node as any).hash = '986907e2291e0a4f54c1f95cd0fcd790';
export default node;
