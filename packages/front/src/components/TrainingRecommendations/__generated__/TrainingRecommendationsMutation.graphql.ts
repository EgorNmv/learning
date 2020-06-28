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
export type TrainingRecommendationsMutationVariables = {
    data: InputFeedback;
};
export type TrainingRecommendationsMutationResponse = {
    readonly createFeedback: {
        readonly feedbackId: number;
        readonly userId: string;
    };
};
export type TrainingRecommendationsMutation = {
    readonly response: TrainingRecommendationsMutationResponse;
    readonly variables: TrainingRecommendationsMutationVariables;
};



/*
mutation TrainingRecommendationsMutation(
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
    "name": "TrainingRecommendationsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TrainingRecommendationsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "TrainingRecommendationsMutation",
    "operationKind": "mutation",
    "text": "mutation TrainingRecommendationsMutation(\n  $data: InputFeedback!\n) {\n  createFeedback(data: $data) {\n    feedbackId: id\n    userId\n  }\n}\n"
  }
};
})();
(node as any).hash = '842bb36236ab9439153908b6f2d0f285';
export default node;
