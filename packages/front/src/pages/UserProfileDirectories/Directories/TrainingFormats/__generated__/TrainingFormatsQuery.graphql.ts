/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type TrainingFormatsQueryVariables = {};
export type TrainingFormatsQueryResponse = {
    readonly formats: ReadonlyArray<{
        readonly trainingFormatId: number;
        readonly description: string;
    }>;
};
export type TrainingFormatsQuery = {
    readonly response: TrainingFormatsQueryResponse;
    readonly variables: TrainingFormatsQueryVariables;
};



/*
query TrainingFormatsQuery {
  formats {
    trainingFormatId: id
    description
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "FormatEntity",
    "kind": "LinkedField",
    "name": "formats",
    "plural": true,
    "selections": [
      {
        "alias": "trainingFormatId",
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
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
    "name": "TrainingFormatsQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TrainingFormatsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "TrainingFormatsQuery",
    "operationKind": "query",
    "text": "query TrainingFormatsQuery {\n  formats {\n    trainingFormatId: id\n    description\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a5dc71ea48ada5d2459e799e9306d67d';
export default node;
