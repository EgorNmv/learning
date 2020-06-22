/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type AllCategoriesQueryVariables = {};
export type AllCategoriesQueryResponse = {
    readonly trainings: ReadonlyArray<{
        readonly trainingId: number;
        readonly name: string;
        readonly label: string | null;
        readonly description: string;
        readonly start: string;
        readonly end: string;
        readonly organizer: {
            readonly name: string;
        };
    }>;
};
export type AllCategoriesQuery = {
    readonly response: AllCategoriesQueryResponse;
    readonly variables: AllCategoriesQueryVariables;
};



/*
query AllCategoriesQuery {
  trainings {
    trainingId: id
    name
    label
    description
    start
    end
    organizer {
      name
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "TrainingEntity",
    "kind": "LinkedField",
    "name": "trainings",
    "plural": true,
    "selections": [
      {
        "alias": "trainingId",
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "label",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "start",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "end",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "OrganizerEntity",
        "kind": "LinkedField",
        "name": "organizer",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ],
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
    "name": "AllCategoriesQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AllCategoriesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "AllCategoriesQuery",
    "operationKind": "query",
    "text": "query AllCategoriesQuery {\n  trainings {\n    trainingId: id\n    name\n    label\n    description\n    start\n    end\n    organizer {\n      name\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ca9623fbf59010f13faad5b8ab59d329';
export default node;
