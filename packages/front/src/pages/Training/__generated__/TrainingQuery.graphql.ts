/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type TrainingQueryVariables = {
    trainingId: number;
};
export type TrainingQueryResponse = {
    readonly training: {
        readonly trainingId: number;
        readonly label: string;
        readonly name: string;
        readonly description: string;
        readonly format: {
            readonly description: string;
        };
        readonly organizer: {
            readonly name: string;
            readonly address: string;
        };
        readonly start: string;
        readonly end: string;
        readonly site: string;
        readonly audience: {
            readonly description: string;
        };
    } | null;
};
export type TrainingQuery = {
    readonly response: TrainingQueryResponse;
    readonly variables: TrainingQueryVariables;
};



/*
query TrainingQuery(
  $trainingId: Float!
) {
  training(id: $trainingId) {
    trainingId: id
    label
    name
    description
    format {
      description
    }
    organizer {
      name
      address
    }
    start
    end
    site
    audience {
      description
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "trainingId",
    "type": "Float!"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v3 = [
  (v2/*: any*/)
],
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "trainingId"
      }
    ],
    "concreteType": "TrainingEntity",
    "kind": "LinkedField",
    "name": "training",
    "plural": false,
    "selections": [
      {
        "alias": "trainingId",
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "label",
        "storageKey": null
      },
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "FormatEntity",
        "kind": "LinkedField",
        "name": "format",
        "plural": false,
        "selections": (v3/*: any*/),
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
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "address",
            "storageKey": null
          }
        ],
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
        "kind": "ScalarField",
        "name": "site",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "TargetAudienceEntity",
        "kind": "LinkedField",
        "name": "audience",
        "plural": false,
        "selections": (v3/*: any*/),
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
    "name": "TrainingQuery",
    "selections": (v4/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TrainingQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "TrainingQuery",
    "operationKind": "query",
    "text": "query TrainingQuery(\n  $trainingId: Float!\n) {\n  training(id: $trainingId) {\n    trainingId: id\n    label\n    name\n    description\n    format {\n      description\n    }\n    organizer {\n      name\n      address\n    }\n    start\n    end\n    site\n    audience {\n      description\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a7c4d58d5097c2394323b57ce68829e0';
export default node;
