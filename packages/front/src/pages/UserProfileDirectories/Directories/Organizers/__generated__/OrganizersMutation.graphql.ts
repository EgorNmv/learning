/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type OrganizersMutationVariables = {
    id: number;
};
export type OrganizersMutationResponse = {
    readonly deleteOrganizerById: boolean;
};
export type OrganizersMutation = {
    readonly response: OrganizersMutationResponse;
    readonly variables: OrganizersMutationVariables;
};



/*
mutation OrganizersMutation(
  $id: Float!
) {
  deleteOrganizerById(id: $id)
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id",
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
        "variableName": "id"
      }
    ],
    "kind": "ScalarField",
    "name": "deleteOrganizerById",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OrganizersMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OrganizersMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "OrganizersMutation",
    "operationKind": "mutation",
    "text": "mutation OrganizersMutation(\n  $id: Float!\n) {\n  deleteOrganizerById(id: $id)\n}\n"
  }
};
})();
(node as any).hash = '3c2cb48af3d8f774c87d26196e3d0052';
export default node;
