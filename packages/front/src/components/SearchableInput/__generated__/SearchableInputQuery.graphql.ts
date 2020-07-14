/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type SearchableInputQueryVariables = {
    searchBy: string;
    searchText?: string | null;
};
export type SearchableInputQueryResponse = {
    readonly searchableTrainings: ReadonlyArray<{
        readonly trainingId: number;
        readonly name: string;
        readonly description: string;
        readonly category: {
            readonly categoryId: number;
            readonly description: string;
        };
        readonly start: string;
        readonly end: string;
        readonly format: {
            readonly description: string;
        };
        readonly audience: {
            readonly description: string;
        };
    }>;
};
export type SearchableInputQuery = {
    readonly response: SearchableInputQueryResponse;
    readonly variables: SearchableInputQueryVariables;
};



/*
query SearchableInputQuery(
  $searchBy: String!
  $searchText: String
) {
  searchableTrainings(searchBy: $searchBy, searchText: $searchText) {
    trainingId: id
    name
    description
    category {
      categoryId: id
      description
    }
    start
    end
    format {
      description
    }
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
    "name": "searchBy",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "searchText",
    "type": "String"
  }
],
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
    "args": [
      {
        "kind": "Variable",
        "name": "searchBy",
        "variableName": "searchBy"
      },
      {
        "kind": "Variable",
        "name": "searchText",
        "variableName": "searchText"
      }
    ],
    "concreteType": "TrainingEntity",
    "kind": "LinkedField",
    "name": "searchableTrainings",
    "plural": true,
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
        "name": "name",
        "storageKey": null
      },
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
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
          (v1/*: any*/)
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
        "concreteType": "TargetAudienceEntity",
        "kind": "LinkedField",
        "name": "audience",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SearchableInputQuery",
    "selections": (v3/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SearchableInputQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "SearchableInputQuery",
    "operationKind": "query",
    "text": "query SearchableInputQuery(\n  $searchBy: String!\n  $searchText: String\n) {\n  searchableTrainings(searchBy: $searchBy, searchText: $searchText) {\n    trainingId: id\n    name\n    description\n    category {\n      categoryId: id\n      description\n    }\n    start\n    end\n    format {\n      description\n    }\n    audience {\n      description\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5dd642d35dbb1580c610bcb23521d862';
export default node;
