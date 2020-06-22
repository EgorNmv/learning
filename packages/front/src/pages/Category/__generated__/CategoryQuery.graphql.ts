/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type CategoryQueryVariables = {
    categoryId: number;
};
export type CategoryQueryResponse = {
    readonly trainingsByCategoryId: ReadonlyArray<{
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
};
export type CategoryQuery = {
    readonly response: CategoryQueryResponse;
    readonly variables: CategoryQueryVariables;
};



/*
query CategoryQuery(
  $categoryId: Float!
) {
  trainingsByCategoryId(categoryId: $categoryId) {
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
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "categoryId",
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
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "categoryId",
        "variableName": "categoryId"
      }
    ],
    "concreteType": "TrainingEntity",
    "kind": "LinkedField",
    "name": "trainingsByCategoryId",
    "plural": true,
    "selections": [
      {
        "alias": "trainingId",
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
        "name": "label",
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
        "name": "description",
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
          (v1/*: any*/)
        ],
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
    "name": "CategoryQuery",
    "selections": (v2/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CategoryQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "CategoryQuery",
    "operationKind": "query",
    "text": "query CategoryQuery(\n  $categoryId: Float!\n) {\n  trainingsByCategoryId(categoryId: $categoryId) {\n    trainingId: id\n    name\n    label\n    start\n    end\n    description\n    organizer {\n      name\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a169e55a81b003a87aa7de0f890fb421';
export default node;
