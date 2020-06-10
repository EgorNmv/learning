/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type TargetAudiencesEditQueryVariables = {
    targetAudienceId: number;
};
export type TargetAudiencesEditQueryResponse = {
    readonly targetAudience: {
        readonly targetAudienceId: number;
        readonly description: string;
    } | null;
};
export type TargetAudiencesEditQuery = {
    readonly response: TargetAudiencesEditQueryResponse;
    readonly variables: TargetAudiencesEditQueryVariables;
};



/*
query TargetAudiencesEditQuery(
  $targetAudienceId: Float!
) {
  targetAudience(id: $targetAudienceId) {
    targetAudienceId: id
    description
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "targetAudienceId",
    "type": "Float!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "targetAudienceId"
      }
    ],
    "concreteType": "TargetAudienceEntity",
    "kind": "LinkedField",
    "name": "targetAudience",
    "plural": false,
    "selections": [
      {
        "alias": "targetAudienceId",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TargetAudiencesEditQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TargetAudiencesEditQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "TargetAudiencesEditQuery",
    "operationKind": "query",
    "text": "query TargetAudiencesEditQuery(\n  $targetAudienceId: Float!\n) {\n  targetAudience(id: $targetAudienceId) {\n    targetAudienceId: id\n    description\n  }\n}\n"
  }
};
})();
(node as any).hash = '6cce7c7c4a25a6afcc7ae495cbb5221e';
export default node;
