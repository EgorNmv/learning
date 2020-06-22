/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type InputTraining = {
    audienceId: number;
    categoryId: number;
    description: string;
    end: string;
    formatId: number;
    label?: string | null;
    name: string;
    organizerId: number;
    site: string;
    start: string;
};
export type TrainingCreateMutationVariables = {
    data: InputTraining;
};
export type TrainingCreateMutationResponse = {
    readonly createTraining: {
        readonly trainingId: number;
        readonly label: string | null;
        readonly name: string;
        readonly description: string;
        readonly format: {
            readonly formatId: number;
            readonly description: string;
        };
        readonly organizer: {
            readonly organizerId: number;
            readonly name: string;
            readonly address: string;
            readonly site: string;
            readonly type: number;
        };
        readonly start: string;
        readonly end: string;
        readonly audience: {
            readonly audienceId: number;
            readonly description: string;
        };
        readonly site: string;
    };
};
export type TrainingCreateMutation = {
    readonly response: TrainingCreateMutationResponse;
    readonly variables: TrainingCreateMutationVariables;
};



/*
mutation TrainingCreateMutation(
  $data: InputTraining!
) {
  createTraining(data: $data) {
    trainingId: id
    label
    name
    description
    format {
      formatId: id
      description
    }
    organizer {
      organizerId: id
      name
      address
      site
      type
    }
    start
    end
    audience {
      audienceId: id
      description
    }
    site
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "data",
    "type": "InputTraining!"
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "site",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "data",
        "variableName": "data"
      }
    ],
    "concreteType": "TrainingEntity",
    "kind": "LinkedField",
    "name": "createTraining",
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
        "selections": [
          {
            "alias": "formatId",
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
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
          {
            "alias": "organizerId",
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "address",
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "type",
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
        "concreteType": "TargetAudienceEntity",
        "kind": "LinkedField",
        "name": "audience",
        "plural": false,
        "selections": [
          {
            "alias": "audienceId",
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      },
      (v3/*: any*/)
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TrainingCreateMutation",
    "selections": (v4/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TrainingCreateMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "TrainingCreateMutation",
    "operationKind": "mutation",
    "text": "mutation TrainingCreateMutation(\n  $data: InputTraining!\n) {\n  createTraining(data: $data) {\n    trainingId: id\n    label\n    name\n    description\n    format {\n      formatId: id\n      description\n    }\n    organizer {\n      organizerId: id\n      name\n      address\n      site\n      type\n    }\n    start\n    end\n    audience {\n      audienceId: id\n      description\n    }\n    site\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b8f5195f1094741a6e8db644f1b568c5';
export default node;
