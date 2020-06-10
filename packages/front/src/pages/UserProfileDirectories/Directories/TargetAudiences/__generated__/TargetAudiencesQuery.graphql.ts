/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type TargetAudiencesQueryVariables = {};
export type TargetAudiencesQueryResponse = {
    readonly targetAudiences: ReadonlyArray<{
        readonly targetAudienceId: number;
        readonly description: string;
    }>;
};
export type TargetAudiencesQuery = {
    readonly response: TargetAudiencesQueryResponse;
    readonly variables: TargetAudiencesQueryVariables;
};



/*
query TargetAudiencesQuery {
  targetAudiences {
    targetAudienceId: id
    description
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "TargetAudienceEntity",
    "kind": "LinkedField",
    "name": "targetAudiences",
    "plural": true,
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TargetAudiencesQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TargetAudiencesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "TargetAudiencesQuery",
    "operationKind": "query",
    "text": "query TargetAudiencesQuery {\n  targetAudiences {\n    targetAudienceId: id\n    description\n  }\n}\n"
  }
};
})();
(node as any).hash = '7057619414a80f0a3d056c0d5baf0c4e';
export default node;
