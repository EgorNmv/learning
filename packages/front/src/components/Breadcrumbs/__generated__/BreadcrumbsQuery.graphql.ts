/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type BreadcrumbsQueryVariables = {
    categoryId: number;
    trainingId: number;
};
export type BreadcrumbsQueryResponse = {
    readonly training: {
        readonly name: string;
    } | null;
    readonly category: {
        readonly description: string;
    } | null;
};
export type BreadcrumbsQuery = {
    readonly response: BreadcrumbsQueryResponse;
    readonly variables: BreadcrumbsQueryVariables;
};



/*
query BreadcrumbsQuery(
  $categoryId: Float!
  $trainingId: Float!
) {
  training(id: $trainingId) {
    name
  }
  category(id: $categoryId) {
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
    "name": "trainingId",
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
        "variableName": "trainingId"
      }
    ],
    "concreteType": "TrainingEntity",
    "kind": "LinkedField",
    "name": "training",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
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
    "name": "BreadcrumbsQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BreadcrumbsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "BreadcrumbsQuery",
    "operationKind": "query",
    "text": "query BreadcrumbsQuery(\n  $categoryId: Float!\n  $trainingId: Float!\n) {\n  training(id: $trainingId) {\n    name\n  }\n  category(id: $categoryId) {\n    description\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e0075bb2b41f07eec5a08a4817a525e9';
export default node;
