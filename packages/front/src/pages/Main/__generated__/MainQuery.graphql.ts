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
        readonly start: string;
        readonly end: string;
        readonly description: string;
    }>;
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
    description
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
v1 = [
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
    "name": "description",
    "storageKey": null
  }
],
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "TrainingEntity",
    "kind": "LinkedField",
    "name": "newTrainings",
    "plural": true,
    "selections": (v1/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "TrainingEntity",
    "kind": "LinkedField",
    "name": "comingTrainings",
    "plural": true,
    "selections": (v1/*: any*/),
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MainQuery",
    "selections": (v2/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MainQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "MainQuery",
    "operationKind": "query",
    "text": "query MainQuery {\n  newTrainings {\n    trainingId: id\n    name\n    label\n    organizer {\n      name\n    }\n    start\n    end\n    description\n  }\n  comingTrainings {\n    trainingId: id\n    name\n    label\n    organizer {\n      name\n    }\n    start\n    end\n    description\n  }\n}\n"
  }
};
})();
(node as any).hash = '54d3cf190fb28ffb868f657e6472b689';
export default node;
