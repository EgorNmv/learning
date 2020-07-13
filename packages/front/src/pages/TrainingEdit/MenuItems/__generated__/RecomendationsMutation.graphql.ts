/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type InputFeedback = {
    date: string;
    rate?: number | null;
    status?: number | null;
    text: string;
    trainingId: number;
    type: number;
    userId: string;
};
export type RecomendationsMutationVariables = {
    feedbackId: number;
    data: InputFeedback;
};
export type RecomendationsMutationResponse = {
    readonly updateFeedbackById: {
        readonly feedbackId: number;
        readonly text: string;
        readonly userId: string;
        readonly status: number | null;
    };
};
export type RecomendationsMutation = {
    readonly response: RecomendationsMutationResponse;
    readonly variables: RecomendationsMutationVariables;
};



/*
mutation RecomendationsMutation(
  $feedbackId: Float!
  $data: InputFeedback!
) {
  updateFeedbackById(id: $feedbackId, data: $data) {
    feedbackId: id
    text
    userId
    status
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "feedbackId",
    "type": "Float!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "data",
    "type": "InputFeedback!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "data",
        "variableName": "data"
      },
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "feedbackId"
      }
    ],
    "concreteType": "FeedbackEntity",
    "kind": "LinkedField",
    "name": "updateFeedbackById",
    "plural": false,
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
    "name": "RecomendationsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RecomendationsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "RecomendationsMutation",
    "operationKind": "mutation",
    "text": "mutation RecomendationsMutation(\n  $feedbackId: Float!\n  $data: InputFeedback!\n) {\n  updateFeedbackById(id: $feedbackId, data: $data) {\n    feedbackId: id\n    text\n    userId\n    status\n  }\n}\n"
  }
};
})();
(node as any).hash = '93fdf05bfea31037ee2e5a9077fd2ca1';
export default node;
