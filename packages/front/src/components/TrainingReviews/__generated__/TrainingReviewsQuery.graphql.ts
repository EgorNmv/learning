/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type TrainingReviewsQueryVariables = {
    trainingId: number;
    feedbackType: number;
};
export type TrainingReviewsQueryResponse = {
    readonly acceptedFeedbacksByTrainingId: ReadonlyArray<{
        readonly feedbackId: number;
        readonly userId: string;
        readonly text: string;
        readonly date: string;
        readonly rate: number | null;
    }>;
};
export type TrainingReviewsQuery = {
    readonly response: TrainingReviewsQueryResponse;
    readonly variables: TrainingReviewsQueryVariables;
};



/*
query TrainingReviewsQuery(
  $trainingId: Float!
  $feedbackType: Float!
) {
  acceptedFeedbacksByTrainingId(feedbackType: $feedbackType, trainingId: $trainingId) {
    feedbackId: id
    userId
    text
    date
    rate
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
    "name": "acceptedFeedbacksByTrainingId",
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
        "name": "userId",
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
        "name": "date",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "rate",
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
    "name": "TrainingReviewsQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TrainingReviewsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "TrainingReviewsQuery",
    "operationKind": "query",
    "text": "query TrainingReviewsQuery(\n  $trainingId: Float!\n  $feedbackType: Float!\n) {\n  acceptedFeedbacksByTrainingId(feedbackType: $feedbackType, trainingId: $trainingId) {\n    feedbackId: id\n    userId\n    text\n    date\n    rate\n  }\n}\n"
  }
};
})();
(node as any).hash = '5dd6d7e5db08d209f92a63732125e883';
export default node;
