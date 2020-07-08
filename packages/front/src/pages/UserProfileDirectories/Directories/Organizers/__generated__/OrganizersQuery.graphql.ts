/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type OrganizersQueryVariables = {};
export type OrganizersQueryResponse = {
    readonly organizers: ReadonlyArray<{
        readonly organizerId: number;
        readonly name: string;
        readonly address: string;
        readonly site: string | null;
        readonly type: number;
    }>;
};
export type OrganizersQuery = {
    readonly response: OrganizersQueryResponse;
    readonly variables: OrganizersQueryVariables;
};



/*
query OrganizersQuery {
  organizers {
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
    "alias": null,
    "args": null,
    "concreteType": "OrganizerEntity",
    "kind": "LinkedField",
    "name": "organizers",
    "plural": true,
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "OrganizersQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "OrganizersQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "OrganizersQuery",
    "operationKind": "query",
    "text": "query OrganizersQuery {\n  organizers {\n    organizerId: id\n    name\n    address\n    site\n    type\n  }\n}\n"
  }
};
})();
(node as any).hash = '303423ceb3619892c1c724505333198b';
export default node;
