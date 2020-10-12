/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type TrainingQueryVariables = {
    trainingId: number;
    userId: string;
};
export type TrainingQueryResponse = {
    readonly training: {
        readonly trainingId: number;
        readonly label: string | null;
        readonly name: string;
        readonly description: string;
        readonly cost: number | null;
        readonly duration: number | null;
        readonly format: {
            readonly description: string;
        };
        readonly organizer: {
            readonly name: string;
            readonly address: string;
            readonly contactInfo: string | null;
        };
        readonly start: string | null;
        readonly end: string | null;
        readonly isDateSet: boolean;
        readonly site: string | null;
        readonly audience: {
            readonly description: string;
        };
        readonly listOfRequestsReviewsAndRecomends: ReadonlyArray<number> | null;
        readonly averageRating: number | null;
    } | null;
    readonly isRequestExist: boolean;
};
export type TrainingQuery = {
    readonly response: TrainingQueryResponse;
    readonly variables: TrainingQueryVariables;
};



/*
query TrainingQuery(
  $trainingId: Float!
  $userId: String!
) {
  training(id: $trainingId) {
    trainingId: id
    label
    name
    description
    cost
    duration
    format {
      description
    }
    organizer {
      name
      address
      contactInfo
    }
    start
    end
    isDateSet
    site
    audience {
      description
    }
    listOfRequestsReviewsAndRecomends
    averageRating
  }
  isRequestExist(userId: $userId, trainingId: $trainingId)
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "trainingId",
    "type": "Float!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId",
    "type": "String!"
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
        "kind": "ScalarField",
        "name": "cost",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "duration",
        "storageKey": null
      },
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
        "name": "isDateSet",
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "listOfRequestsReviewsAndRecomends",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "averageRating",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "trainingId",
        "variableName": "trainingId"
      },
      {
        "kind": "Variable",
        "name": "userId",
        "variableName": "userId"
      }
    ],
    "kind": "ScalarField",
    "name": "isRequestExist",
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
    "text": "query TrainingQuery(\n  $trainingId: Float!\n  $userId: String!\n) {\n  training(id: $trainingId) {\n    trainingId: id\n    label\n    name\n    description\n    cost\n    duration\n    format {\n      description\n    }\n    organizer {\n      name\n      address\n      contactInfo\n    }\n    start\n    end\n    isDateSet\n    site\n    audience {\n      description\n    }\n    listOfRequestsReviewsAndRecomends\n    averageRating\n  }\n  isRequestExist(userId: $userId, trainingId: $trainingId)\n}\n"
  }
};
})();
(node as any).hash = 'fd16b743c7f9d9c97d7fe11fe0fecf1a';
export default node;
