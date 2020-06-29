/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type SearchableInputQueryVariables = {
    searchBy: string;
    searchText: string;
};
export type SearchableInputQueryResponse = {
    readonly searchableTrainings: ReadonlyArray<{
        readonly trainingId: number;
        readonly name: string;
    }>;
};
export type SearchableInputQuery = {
    readonly response: SearchableInputQueryResponse;
    readonly variables: SearchableInputQueryVariables;
};



/*
query SearchableInputQuery(
  $searchBy: String!
  $searchText: String!
) {
  searchableTrainings(searchBy: $searchBy, searchText: $searchText) {
    trainingId: id
    name
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "searchBy",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "searchText",
    "type": "String!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "searchBy",
        "variableName": "searchBy"
      },
      {
        "kind": "Variable",
        "name": "searchText",
        "variableName": "searchText"
      }
    ],
    "concreteType": "TrainingEntity",
    "kind": "LinkedField",
    "name": "searchableTrainings",
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
    "name": "SearchableInputQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SearchableInputQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "SearchableInputQuery",
    "operationKind": "query",
    "text": "query SearchableInputQuery(\n  $searchBy: String!\n  $searchText: String!\n) {\n  searchableTrainings(searchBy: $searchBy, searchText: $searchText) {\n    trainingId: id\n    name\n  }\n}\n"
  }
};
})();
(node as any).hash = 'fc64c44c732b1f2190a712d40507aab4';
export default node;
