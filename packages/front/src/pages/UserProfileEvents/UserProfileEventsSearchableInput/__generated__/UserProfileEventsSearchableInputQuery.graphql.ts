/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type UserProfileEventsSearchableInputQueryVariables = {
    searchText: string;
};
export type UserProfileEventsSearchableInputQueryResponse = {
    readonly searchableTrainingsByContext: ReadonlyArray<{
        readonly trainingId: number;
        readonly name: string;
        readonly start: string | null;
        readonly end: string | null;
        readonly isDateSet: boolean;
        readonly listOfRequestsReviewsAndRecomends: ReadonlyArray<number> | null;
    }>;
};
export type UserProfileEventsSearchableInputQuery = {
    readonly response: UserProfileEventsSearchableInputQueryResponse;
    readonly variables: UserProfileEventsSearchableInputQueryVariables;
};



/*
query UserProfileEventsSearchableInputQuery(
  $searchText: String!
) {
  searchableTrainingsByContext(searchText: $searchText) {
    trainingId: id
    name
    start
    end
    isDateSet
    listOfRequestsReviewsAndRecomends
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
        "name": "searchText",
        "variableName": "searchText"
      }
    ],
    "concreteType": "TrainingEntity",
    "kind": "LinkedField",
    "name": "searchableTrainingsByContext",
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
        "name": "start",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "end",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isDateSet",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "listOfRequestsReviewsAndRecomends",
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
    "name": "UserProfileEventsSearchableInputQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserProfileEventsSearchableInputQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "UserProfileEventsSearchableInputQuery",
    "operationKind": "query",
    "text": "query UserProfileEventsSearchableInputQuery(\n  $searchText: String!\n) {\n  searchableTrainingsByContext(searchText: $searchText) {\n    trainingId: id\n    name\n    start\n    end\n    isDateSet\n    listOfRequestsReviewsAndRecomends\n  }\n}\n"
  }
};
})();
(node as any).hash = '7bc8f7888f3dc41384c90215ea6bce78';
export default node;
