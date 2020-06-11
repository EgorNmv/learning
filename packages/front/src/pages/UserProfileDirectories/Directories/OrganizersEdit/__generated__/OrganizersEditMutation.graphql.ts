/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type InputOrganizer = {
    address: string;
    name: string;
    site: string;
    type: number;
};
export type OrganizersEditMutationVariables = {
    organizerId: number;
    data: InputOrganizer;
};
export type OrganizersEditMutationResponse = {
    readonly updateOrganizerById: {
        readonly organizerId: number;
        readonly name: string;
        readonly address: string;
        readonly site: string;
        readonly type: number;
    };
};
export type OrganizersEditMutation = {
    readonly response: OrganizersEditMutationResponse;
    readonly variables: OrganizersEditMutationVariables;
};



/*
mutation OrganizersEditMutation(
  $organizerId: Float!
  $data: InputOrganizer!
) {
  updateOrganizerById(id: $organizerId, data: $data) {
    organizerId: id
    name
    address
    site
    type
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "organizerId",
    "type": "Float!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "data",
    "type": "InputOrganizer!"
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
        "variableName": "organizerId"
      }
    ],
    "concreteType": "OrganizerEntity",
    "kind": "LinkedField",
    "name": "updateOrganizerById",
    "plural": false,
    "selections": [
      {
        "alias": "organizerId",
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "address",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "site",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "type",
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
    "name": "OrganizersEditMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OrganizersEditMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "OrganizersEditMutation",
    "operationKind": "mutation",
    "text": "mutation OrganizersEditMutation(\n  $organizerId: Float!\n  $data: InputOrganizer!\n) {\n  updateOrganizerById(id: $organizerId, data: $data) {\n    organizerId: id\n    name\n    address\n    site\n    type\n  }\n}\n"
  }
};
})();
(node as any).hash = 'dcda026c7494afbac8f6640d32b40d35';
export default node;
