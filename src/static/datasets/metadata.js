import React from "react";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";

import {
  irisColumns,
  irisColumnsMap,
  iris,
  irisUnits,
} from "static/datasets/iris";
import {
  tweets,
  twitterColumns,
  twitterColumnsMap,
} from "static/datasets/tweets";
import {
  boston,
  bostonColumns,
  bostonDepVar,
  bostonDefaultIndVar,
} from "static/datasets/boston";
import { imdb, imdbColumns, imdbColumnsMap } from "static/datasets/imdb";
import { SampleDataset, Tasks, Models } from "state/StateTypes";

export const datasetMetadata = {
  [SampleDataset.IRIS]: {
    title: "Iris",
    subtitle: "The popular dataset featuring flower traits",
    icon: <SendIcon fontSize="small" />,
    instances: 150,
    attributes: 4,
    classes: 3,
    tags: ["Numeric"],
    columns: irisColumns,
    columnsMap: irisColumnsMap,
    data: iris,
    units: irisUnits,

    keywords: ["flower", "iris", "petal"],
    task: Tasks.CLASSIFICATION,
    model: Models.KNN,
  },
  [SampleDataset.TWITTER]: {
    title: "Twitter",
    subtitle: "A small sample of random tweets",
    icon: <InboxIcon fontSize="small" />,
    instances: 200,
    tags: ["Text"],
    columns: twitterColumns,
    columnsMap: twitterColumnsMap,
    data: tweets,

    keywords: ["tweet", "twitter", "sentiment"],
    task: Tasks.NATURAL_LANGUAGE,
    model: [Models.SENTIMENT_ANALYSIS, Models.ENTITY_RECOGNITION],
  },
  [SampleDataset.BOSTON]: {
    title: "Boston",
    subtitle: "Prices and other Boston housing data",
    icon: <DraftsIcon fontSize="small" />,
    instances: 506,
    attributes: 13,
    tags: ["Numeric", "Categorical"],
    columns: bostonColumns,
    columnsMap: null,
    data: boston,
    depVar: bostonDepVar,
    indVar: bostonDefaultIndVar,

    keywords: ["boston", "house", "housing", "home"],
    task: Tasks.REGRESSION,
    model: Models.LINEAR_REGRESSION,
  },
  [SampleDataset.IMDB]: {
    title: "IMDB Reviews",
    subtitle: "A small sample of reviews from IMDB",
    icon: <InboxIcon fontSize="small" />,
    instances: imdb.length,
    tags: ["Text"],
    columns: imdbColumns,
    columnsMap: imdbColumnsMap,
    data: imdb,

    keywords: ["imdb", "movies", "sentiment", "reviews"],
    task: Tasks.NATURAL_LANGUAGE,
    model: [Models.SENTIMENT_ANALYSIS, Models.ENTITY_RECOGNITION],
  },
};
