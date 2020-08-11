/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type MainQueryVariables = {};
export type MainQueryResponse = {
    readonly newTrainings: ReadonlyArray<{
        readonly trainingId: number;
        readonly name: string;
        readonly label: string | null;
        readonly organizer: {
            readonly name: string;
        };
        readonly start: string | null;
        readonly end: string | null;
        readonly isDateSet: boolean;
        readonly description: string;
    }>;
    readonly comingTrainings: ReadonlyArray<{
        readonly trainingId: number;
        readonly name: string;
        readonly label: string | null;
        readonly organizer: {
            readonly name: string;
        };
        readonly start: string | null;
        readonly end: string | null;
        readonly isDateSet: boolean;
        readonly description: string;
    }>;
    readonly categories: ReadonlyArray<{
        readonly categoryId: number;
        readonly description: string;
        readonly label: string | null;
    }>;
};
export type MainQuery = {
    readonly response: MainQueryResponse;
    readonly variables: MainQueryVariables;
};



/*
query MainQuery {
  newTrainings {
    trainingId: id
    name
    label
    organizer {
      name
    }
    start
    end
    isDateSet
    description
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
    isDateSet
    description
  }
  categories {
    categoryId: id
    description
    label
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
  "name": "label",
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
  {
    "alias": "trainingId",
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  },
  (v0/*: any*/),
  (v1/*: any*/),
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
  (v2/*: any*/)
],
v4 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "TrainingEntity",
    "kind": "LinkedField",
    "name": "newTrainings",
    "plural": true,
    "selections": (v3/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "TrainingEntity",
    "kind": "LinkedField",
    "name": "comingTrainings",
    "plural": true,
    "selections": (v3/*: any*/),
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
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MainQuery",
    "selections": (v4/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MainQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "MainQuery",
    "operationKind": "query",
    "text": "query MainQuery {\n  newTrainings {\n    trainingId: id\n    name\n    label\n    organizer {\n      name\n    }\n    start\n    end\n    isDateSet\n    description\n  }\n  comingTrainings {\n    trainingId: id\n    name\n    label\n    organizer {\n      name\n    }\n    start\n    end\n    isDateSet\n    description\n  }\n  categories {\n    categoryId: id\n    description\n    label\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bc832e1fc78a1523630d51bd1b4b0f63';
export default node;
