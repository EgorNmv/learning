/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type InputOrganizer = {
    address: string;
    name: string;
    site: string;
    type: number;
};
export type OrganizersCreateMutationVariables = {
    data: InputOrganizer;
};
export type OrganizersCreateMutationResponse = {
    readonly createOrganizer: {
        readonly organizerId: number;
        readonly name: string;
        readonly address: string;
        readonly site: string;
        readonly type: number;
    };
};
export type OrganizersCreateMutation = {
    readonly response: OrganizersCreateMutationResponse;
    readonly variables: OrganizersCreateMutationVariables;
};



/*
mutation OrganizersCreateMutation(
  $data: InputOrganizer!
) {
  createOrganizer(data: $data) {
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
      }
    ],
    "concreteType": "OrganizerEntity",
    "kind": "LinkedField",
    "name": "createOrganizer",
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
    "name": "OrganizersCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OrganizersCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "OrganizersCreateMutation",
    "operationKind": "mutation",
    "text": "mutation OrganizersCreateMutation(\n  $data: InputOrganizer!\n) {\n  createOrganizer(data: $data) {\n    organizerId: id\n    name\n    address\n    site\n    type\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a04a931b7c1cf258d226cbf4522c78da';
export default node;
