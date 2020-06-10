/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type TargetAudiencesCreateMutationVariables = {
    description: string;
};
export type TargetAudiencesCreateMutationResponse = {
    readonly createTargetAudience: {
        readonly targetAudienceId: number;
        readonly description: string;
    };
};
export type TargetAudiencesCreateMutation = {
    readonly response: TargetAudiencesCreateMutationResponse;
    readonly variables: TargetAudiencesCreateMutationVariables;
};



/*
mutation TargetAudiencesCreateMutation(
  $description: String!
) {
  createTargetAudience(description: $description) {
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
      }
    ],
    "concreteType": "TargetAudienceEntity",
    "kind": "LinkedField",
    "name": "createTargetAudience",
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
    "name": "TargetAudiencesCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TargetAudiencesCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "TargetAudiencesCreateMutation",
    "operationKind": "mutation",
    "text": "mutation TargetAudiencesCreateMutation(\n  $description: String!\n) {\n  createTargetAudience(description: $description) {\n    targetAudienceId: id\n    description\n  }\n}\n"
  }
};
})();
(node as any).hash = 'de2dacc560d4f16d8217157f49b3654a';
export default node;
