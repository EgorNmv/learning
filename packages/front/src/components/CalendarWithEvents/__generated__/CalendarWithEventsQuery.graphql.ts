/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type CalendarWithEventsQueryVariables = {};
export type CalendarWithEventsQueryResponse = {
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
export type CalendarWithEventsQuery = {
    readonly response: CalendarWithEventsQueryResponse;
    readonly variables: CalendarWithEventsQueryVariables;
};



/*
query CalendarWithEventsQuery {
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
    "alias": null,
    "args": null,
    "concreteType": "TrainingEntity",
    "kind": "LinkedField",
    "name": "comingTrainings",
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
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CalendarWithEventsQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CalendarWithEventsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "CalendarWithEventsQuery",
    "operationKind": "query",
    "text": "query CalendarWithEventsQuery {\n  comingTrainings {\n    trainingId: id\n    name\n    label\n    organizer {\n      name\n    }\n    start\n    end\n    description\n  }\n}\n"
  }
};
})();
(node as any).hash = '6cec3e0ab9f2900ec4c3fc2712492ed2';
export default node;
