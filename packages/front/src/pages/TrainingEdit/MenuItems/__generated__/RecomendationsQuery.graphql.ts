/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type RecomendationsQueryVariables = {
    trainingId: number;
    feedbackType: number;
};
export type RecomendationsQueryResponse = {
    readonly feedbacksByTrainingId: ReadonlyArray<{
        readonly feedbackId: number;
        readonly text: string;
        readonly userId: string;
        readonly status: number | null;
        readonly date: string;
    }>;
};
export type RecomendationsQuery = {
    readonly response: RecomendationsQueryResponse;
    readonly variables: RecomendationsQueryVariables;
};



/*
query RecomendationsQuery(
  $trainingId: Float!
  $feedbackType: Float!
) {
  feedbacksByTrainingId(trainingId: $trainingId, feedbackType: $feedbackType) {
    feedbackId: id
    text
    userId
    status
    date
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "trainingId",
    "type": "Float!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "feedbackType",
    "type": "Float!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "feedbackType",
        "variableName": "feedbackType"
      },
      {
        "kind": "Variable",
        "name": "trainingId",
        "variableName": "trainingId"
      }
    ],
    "concreteType": "FeedbackEntity",
    "kind": "LinkedField",
    "name": "feedbacksByTrainingId",
    "plural": true,
    "selections": [
      {
        "alias": "feedbackId",
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "text",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "userId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "date",
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
    "name": "RecomendationsQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RecomendationsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "RecomendationsQuery",
    "operationKind": "query",
    "text": "query RecomendationsQuery(\n  $trainingId: Float!\n  $feedbackType: Float!\n) {\n  feedbacksByTrainingId(trainingId: $trainingId, feedbackType: $feedbackType) {\n    feedbackId: id\n    text\n    userId\n    status\n    date\n  }\n}\n"
  }
};
})();
(node as any).hash = '78f1ef3bedaf7848b8c2897e663b76a9';
export default node;
