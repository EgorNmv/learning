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
        readonly start: string | null;
        readonly end: string | null;
        readonly isDateSet: boolean;
        readonly organizer: {
            readonly name: string;
        };
        readonly listOfRequestsReviewsAndRecomends: ReadonlyArray<number> | null;
        readonly averageRating: number | null;
        readonly format: {
            readonly description: string;
        };
        readonly category: {
            readonly description: string;
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
    isDateSet
    organizer {
      name
    }
    listOfRequestsReviewsAndRecomends
    averageRating
    format {
      description
    }
    category {
      description
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v2 = [
  (v1/*: any*/)
],
v3 = [
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
      (v1/*: any*/),
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
        "concreteType": "OrganizerEntity",
        "kind": "LinkedField",
        "name": "organizer",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ],
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
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "FormatEntity",
        "kind": "LinkedField",
        "name": "format",
        "plural": false,
        "selections": (v2/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "CategoryEntity",
        "kind": "LinkedField",
        "name": "category",
        "plural": false,
        "selections": (v2/*: any*/),
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
    "selections": (v3/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AllCategoriesQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "AllCategoriesQuery",
    "operationKind": "query",
    "text": "query AllCategoriesQuery {\n  trainings {\n    trainingId: id\n    name\n    label\n    description\n    start\n    end\n    isDateSet\n    organizer {\n      name\n    }\n    listOfRequestsReviewsAndRecomends\n    averageRating\n    format {\n      description\n    }\n    category {\n      description\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'af3364c0e63947b430c13c772dff2970';
export default node;
