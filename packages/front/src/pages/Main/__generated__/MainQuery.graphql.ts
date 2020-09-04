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
        readonly category: {
            readonly categoryId: number;
            readonly description: string;
        };
        readonly format: {
            readonly description: string;
        };
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
        readonly category: {
            readonly categoryId: number;
            readonly description: string;
        };
        readonly format: {
            readonly description: string;
        };
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
    category {
      categoryId: id
      description
    }
    format {
      description
    }
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
    category {
      categoryId: id
      description
    }
    format {
      description
    }
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
v3 = {
  "alias": "categoryId",
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
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
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "CategoryEntity",
    "kind": "LinkedField",
    "name": "category",
    "plural": false,
    "selections": [
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "FormatEntity",
    "kind": "LinkedField",
    "name": "format",
    "plural": false,
    "selections": [
      (v2/*: any*/)
    ],
    "storageKey": null
  }
],
v5 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "TrainingEntity",
    "kind": "LinkedField",
    "name": "newTrainings",
    "plural": true,
    "selections": (v4/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "TrainingEntity",
    "kind": "LinkedField",
    "name": "comingTrainings",
    "plural": true,
    "selections": (v4/*: any*/),
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
      (v3/*: any*/),
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
    "selections": (v5/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MainQuery",
    "selections": (v5/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "MainQuery",
    "operationKind": "query",
    "text": "query MainQuery {\n  newTrainings {\n    trainingId: id\n    name\n    label\n    organizer {\n      name\n    }\n    start\n    end\n    isDateSet\n    description\n    category {\n      categoryId: id\n      description\n    }\n    format {\n      description\n    }\n  }\n  comingTrainings {\n    trainingId: id\n    name\n    label\n    organizer {\n      name\n    }\n    start\n    end\n    isDateSet\n    description\n    category {\n      categoryId: id\n      description\n    }\n    format {\n      description\n    }\n  }\n  categories {\n    categoryId: id\n    description\n    label\n  }\n}\n"
  }
};
})();
(node as any).hash = '613444175205660b92846cf45994e786';
export default node;
