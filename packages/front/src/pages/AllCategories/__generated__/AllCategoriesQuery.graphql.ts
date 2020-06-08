/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type AllCategoriesQueryVariables = {};
export type AllCategoriesQueryResponse = {
    readonly trainings: ReadonlyArray<{
        readonly trainingId: number;
        readonly name: string;
        readonly label: string;
        readonly description: string;
    }>;
};
export type AllCategoriesQuery = {
    readonly response: AllCategoriesQueryResponse;
    readonly variables: AllCategoriesQueryVariables;
};



/*
query AllCategoriesQuery {
  trainings {
    trainingId: id
    name
    label
    description
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "TrainingEntity",
    "kind": "LinkedField",
    "name": "trainings",
    "plural": true,
    "selections": [
      {
        "alias": "trainingId",
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "label",
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
    "name": "AllCategoriesQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AllCategoriesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "AllCategoriesQuery",
    "operationKind": "query",
    "text": "query AllCategoriesQuery {\n  trainings {\n    trainingId: id\n    name\n    label\n    description\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a728768ec8bb5c28236410fbd79b856b';
export default node;
