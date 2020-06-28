/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type InputFeedback = {
    date: string;
    text: string;
    trainingId: number;
    type: number;
    userId: string;
};
export type TrainingReviewsMutationVariables = {
    data: InputFeedback;
};
export type TrainingReviewsMutationResponse = {
    readonly createFeedback: {
        readonly feedbackId: number;
        readonly userId: string;
    };
};
export type TrainingReviewsMutation = {
    readonly response: TrainingReviewsMutationResponse;
    readonly variables: TrainingReviewsMutationVariables;
};



/*
mutation TrainingReviewsMutation(
  $data: InputFeedback!
) {
  createFeedback(data: $data) {
    feedbackId: id
    userId
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
      }
    ],
    "concreteType": "FeedbackEntity",
    "kind": "LinkedField",
    "name": "createFeedback",
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
        "name": "userId",
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
    "name": "TrainingReviewsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TrainingReviewsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "TrainingReviewsMutation",
    "operationKind": "mutation",
    "text": "mutation TrainingReviewsMutation(\n  $data: InputFeedback!\n) {\n  createFeedback(data: $data) {\n    feedbackId: id\n    userId\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ad93550acbd7b468ad4bcd56ade277df';
export default node;
