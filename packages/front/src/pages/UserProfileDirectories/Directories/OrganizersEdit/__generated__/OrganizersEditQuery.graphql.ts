/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type OrganizersEditQueryVariables = {
    organizerId: number;
};
export type OrganizersEditQueryResponse = {
    readonly organizer: {
        readonly organizerId: number;
        readonly name: string;
        readonly address: string;
        readonly site: string | null;
        readonly type: number;
        readonly contactInfo: string | null;
    } | null;
};
export type OrganizersEditQuery = {
    readonly response: OrganizersEditQueryResponse;
    readonly variables: OrganizersEditQueryVariables;
};



/*
query OrganizersEditQuery(
  $organizerId: Float!
) {
  organizer(id: $organizerId) {
    organizerId: id
    name
    address
    site
    type
    contactInfo
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
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "organizerId"
      }
    ],
    "concreteType": "OrganizerEntity",
    "kind": "LinkedField",
    "name": "organizer",
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "contactInfo",
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
    "name": "OrganizersEditQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OrganizersEditQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "OrganizersEditQuery",
    "operationKind": "query",
    "text": "query OrganizersEditQuery(\n  $organizerId: Float!\n) {\n  organizer(id: $organizerId) {\n    organizerId: id\n    name\n    address\n    site\n    type\n    contactInfo\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b003eaf1bfd5d0cd95f22b4c0d8f2b7d';
export default node;
