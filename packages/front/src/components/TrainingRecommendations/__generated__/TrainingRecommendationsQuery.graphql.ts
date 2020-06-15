/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type TrainingRecommendationsQueryVariables = {
    trainingId: number;
    feedbackType: number;
};
export type TrainingRecommendationsQueryResponse = {
    readonly feedbacksByTrainingId: ReadonlyArray<{
        readonly feedbackId: number;
        readonly user: {
            readonly fullname: string;
            readonly photo: string | null;
        };
        readonly text: string;
        readonly date: string;
    }>;
};
export type TrainingRecommendationsQuery = {
    readonly response: TrainingRecommendationsQueryResponse;
    readonly variables: TrainingRecommendationsQueryVariables;
};



/*
query TrainingRecommendationsQuery(
  $trainingId: Float!
  $feedbackType: Float!
) {
  feedbacksByTrainingId(feedbackType: $feedbackType, trainingId: $trainingId) {
    feedbackId: id
    user {
      fullname
      photo
    }
    text
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
        "concreteType": "UserEntity",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "fullname",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "photo",
            "storageKey": null
          }
        ],
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
    "name": "TrainingRecommendationsQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TrainingRecommendationsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "TrainingRecommendationsQuery",
    "operationKind": "query",
    "text": "query TrainingRecommendationsQuery(\n  $trainingId: Float!\n  $feedbackType: Float!\n) {\n  feedbacksByTrainingId(feedbackType: $feedbackType, trainingId: $trainingId) {\n    feedbackId: id\n    user {\n      fullname\n      photo\n    }\n    text\n    date\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b82c35484b3fe777ad1ed4bf530c3d8b';
export default node;
