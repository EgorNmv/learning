/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type TrainingFormQueryVariables = {};
export type TrainingFormQueryResponse = {
    readonly targetAudiences: ReadonlyArray<{
        readonly targetAudienceId: number;
        readonly description: string;
    }>;
    readonly organizers: ReadonlyArray<{
        readonly organizerId: number;
        readonly name: string;
    }>;
    readonly formats: ReadonlyArray<{
        readonly formatId: number;
        readonly description: string;
    }>;
    readonly categories: ReadonlyArray<{
        readonly categoryId: number;
        readonly description: string;
    }>;
};
export type TrainingFormQuery = {
    readonly response: TrainingFormQueryResponse;
    readonly variables: TrainingFormQueryVariables;
};



/*
query TrainingFormQuery {
  targetAudiences {
    targetAudienceId: id
    description
  }
  organizers {
    organizerId: id
    name
  }
  formats {
    formatId: id
    description
  }
  categories {
    categoryId: id
    description
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v1 = [
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
      (v0/*: any*/)
    ],
    "storageKey": null
  },
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
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "FormatEntity",
    "kind": "LinkedField",
    "name": "formats",
    "plural": true,
    "selections": [
      {
        "alias": "formatId",
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      (v0/*: any*/)
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "CategoryEntity",
    "kind": "LinkedField",
    "name": "categories",
    "plural": true,
    "selections": [
      {
        "alias": "categoryId",
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      (v0/*: any*/)
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TrainingFormQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TrainingFormQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "TrainingFormQuery",
    "operationKind": "query",
    "text": "query TrainingFormQuery {\n  targetAudiences {\n    targetAudienceId: id\n    description\n  }\n  organizers {\n    organizerId: id\n    name\n  }\n  formats {\n    formatId: id\n    description\n  }\n  categories {\n    categoryId: id\n    description\n  }\n}\n"
  }
};
})();
(node as any).hash = '8717db4d96fa5cfe6b7199b00ee42c6d';
export default node;
