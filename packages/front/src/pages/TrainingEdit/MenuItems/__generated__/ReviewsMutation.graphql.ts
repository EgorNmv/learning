/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type InputFeedback = {
    date: string;
    status?: number | null;
    text: string;
    trainingId: number;
    type: number;
    userId: string;
};
export type ReviewsMutationVariables = {
    feedbackId: number;
    data: InputFeedback;
};
export type ReviewsMutationResponse = {
    readonly updateFeedbackById: {
        readonly feedbackId: number;
        readonly text: string;
        readonly userId: string;
        readonly status: number | null;
    };
};
export type ReviewsMutation = {
    readonly response: ReviewsMutationResponse;
    readonly variables: ReviewsMutationVariables;
};



/*
mutation ReviewsMutation(
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
    "name": "ReviewsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ReviewsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ReviewsMutation",
    "operationKind": "mutation",
    "text": "mutation ReviewsMutation(\n  $feedbackId: Float!\n  $data: InputFeedback!\n) {\n  updateFeedbackById(id: $feedbackId, data: $data) {\n    feedbackId: id\n    text\n    userId\n    status\n  }\n}\n"
  }
};
})();
(node as any).hash = '81f37a61af82fafeeda1390829d23b67';
export default node;
