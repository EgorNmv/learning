/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type InputRequest = {
    date: string;
    status?: number | null;
    trainingId: number;
    userId: string;
};
export type TrainingMutationVariables = {
    data: InputRequest;
};
export type TrainingMutationResponse = {
    readonly createRequest: {
        readonly requestId: number;
        readonly date: string;
        readonly training: {
            readonly trainingId: number;
            readonly listOfRequestsReviewsAndRecomends: ReadonlyArray<number> | null;
        };
    };
};
export type TrainingMutation = {
    readonly response: TrainingMutationResponse;
    readonly variables: TrainingMutationVariables;
};



/*
mutation TrainingMutation(
  $data: InputRequest!
) {
  createRequest(data: $data) {
    requestId: id
    date
    training {
      trainingId: id
      listOfRequestsReviewsAndRecomends
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "data",
    "type": "InputRequest!"
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
    "concreteType": "RequestEntity",
    "kind": "LinkedField",
    "name": "createRequest",
    "plural": false,
    "selections": [
      {
        "alias": "requestId",
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
        "concreteType": "TrainingEntity",
        "kind": "LinkedField",
        "name": "training",
        "plural": false,
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
            "name": "listOfRequestsReviewsAndRecomends",
            "storageKey": null
          }
        ],
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
    "name": "TrainingMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TrainingMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "TrainingMutation",
    "operationKind": "mutation",
    "text": "mutation TrainingMutation(\n  $data: InputRequest!\n) {\n  createRequest(data: $data) {\n    requestId: id\n    date\n    training {\n      trainingId: id\n      listOfRequestsReviewsAndRecomends\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '7b277c9b00fd0719b72e039575a84e5b';
export default node;
