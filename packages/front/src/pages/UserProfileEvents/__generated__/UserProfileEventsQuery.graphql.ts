/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type UserProfileEventsQueryVariables = {};
export type UserProfileEventsQueryResponse = {
    readonly trainings: ReadonlyArray<{
        readonly trainingId: number;
        readonly name: string;
        readonly start: string | null;
        readonly end: string | null;
        readonly isDateSet: boolean;
        readonly listOfRequestsReviewsAndRecomends: ReadonlyArray<number> | null;
    }>;
};
export type UserProfileEventsQuery = {
    readonly response: UserProfileEventsQueryResponse;
    readonly variables: UserProfileEventsQueryVariables;
};



/*
query UserProfileEventsQuery {
  trainings {
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserProfileEventsQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserProfileEventsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "UserProfileEventsQuery",
    "operationKind": "query",
    "text": "query UserProfileEventsQuery {\n  trainings {\n    trainingId: id\n    name\n    start\n    end\n    isDateSet\n    listOfRequestsReviewsAndRecomends\n  }\n}\n"
  }
};
})();
(node as any).hash = '83a70d04b4655ceb44bb9ff3f9f0bd1d';
export default node;
