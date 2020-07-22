/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type CategoryQueryVariables = {
    sortBy: string;
    sortOrder: string;
    categoryId: number;
};
export type CategoryQueryResponse = {
    readonly sortedTraining: ReadonlyArray<{
        readonly trainingId: number;
        readonly name: string;
        readonly label: string | null;
        readonly start: string;
        readonly end: string;
        readonly description: string;
        readonly organizer: {
            readonly name: string;
        };
    }>;
    readonly category: {
        readonly categoryId: number;
        readonly description: string;
        readonly label: string | null;
    } | null;
    readonly comingTrainings: ReadonlyArray<{
        readonly trainingId: number;
        readonly name: string;
        readonly label: string | null;
        readonly organizer: {
            readonly name: string;
        };
        readonly start: string;
        readonly end: string;
        readonly description: string;
    }>;
};
export type CategoryQuery = {
    readonly response: CategoryQueryResponse;
    readonly variables: CategoryQueryVariables;
};



/*
query CategoryQuery(
  $sortBy: String!
  $sortOrder: String!
  $categoryId: Float!
) {
  sortedTraining(sortBy: $sortBy, sortOrder: $sortOrder, categoryId: $categoryId) {
    trainingId: id
    name
    label
    start
    end
    description
    organizer {
      name
    }
  }
  category(id: $categoryId) {
    categoryId: id
    description
    label
  }
  comingTrainings {
    trainingId: id
    name
    label
    organizer {
      name
    }
    start
    end
    description
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sortBy",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sortOrder",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "categoryId",
    "type": "Float!"
  }
],
v1 = {
  "alias": "trainingId",
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "label",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "start",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "end",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "OrganizerEntity",
  "kind": "LinkedField",
  "name": "organizer",
  "plural": false,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": null
},
v8 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "categoryId",
        "variableName": "categoryId"
      },
      {
        "kind": "Variable",
        "name": "sortBy",
        "variableName": "sortBy"
      },
      {
        "kind": "Variable",
        "name": "sortOrder",
        "variableName": "sortOrder"
      }
    ],
    "concreteType": "TrainingEntity",
    "kind": "LinkedField",
    "name": "sortedTraining",
    "plural": true,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/)
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "categoryId"
      }
    ],
    "concreteType": "CategoryEntity",
    "kind": "LinkedField",
    "name": "category",
    "plural": false,
    "selections": [
      {
        "alias": "categoryId",
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      (v6/*: any*/),
      (v3/*: any*/)
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "TrainingEntity",
    "kind": "LinkedField",
    "name": "comingTrainings",
    "plural": true,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v7/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/)
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CategoryQuery",
    "selections": (v8/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CategoryQuery",
    "selections": (v8/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "CategoryQuery",
    "operationKind": "query",
    "text": "query CategoryQuery(\n  $sortBy: String!\n  $sortOrder: String!\n  $categoryId: Float!\n) {\n  sortedTraining(sortBy: $sortBy, sortOrder: $sortOrder, categoryId: $categoryId) {\n    trainingId: id\n    name\n    label\n    start\n    end\n    description\n    organizer {\n      name\n    }\n  }\n  category(id: $categoryId) {\n    categoryId: id\n    description\n    label\n  }\n  comingTrainings {\n    trainingId: id\n    name\n    label\n    organizer {\n      name\n    }\n    start\n    end\n    description\n  }\n}\n"
  }
};
})();
(node as any).hash = 'dfb79faf5521535722f503d64d6042c0';
export default node;
