/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type TargetAudiencesEditMutationVariables = {
    targetAudienceId: number;
    description: string;
};
export type TargetAudiencesEditMutationResponse = {
    readonly updateTargetAudienceById: {
        readonly targetAudienceId: number;
        readonly description: string;
    };
};
export type TargetAudiencesEditMutation = {
    readonly response: TargetAudiencesEditMutationResponse;
    readonly variables: TargetAudiencesEditMutationVariables;
};



/*
mutation TargetAudiencesEditMutation(
  $targetAudienceId: Float!
  $description: String!
) {
  updateTargetAudienceById(id: $targetAudienceId, description: $description) {
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
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "description",
    "type": "String!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "description",
        "variableName": "description"
      },
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "targetAudienceId"
      }
    ],
    "concreteType": "TargetAudienceEntity",
    "kind": "LinkedField",
    "name": "updateTargetAudienceById",
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
    "name": "TargetAudiencesEditMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TargetAudiencesEditMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "TargetAudiencesEditMutation",
    "operationKind": "mutation",
    "text": "mutation TargetAudiencesEditMutation(\n  $targetAudienceId: Float!\n  $description: String!\n) {\n  updateTargetAudienceById(id: $targetAudienceId, description: $description) {\n    targetAudienceId: id\n    description\n  }\n}\n"
  }
};
})();
(node as any).hash = '86303d9f3944daf97ef72aa6e853a29a';
export default node;
