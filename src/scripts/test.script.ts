import axios from 'axios';
import { performance } from 'node:perf_hooks';

import {
  findLaureateQuery,
  findPrizeQuery,
  findInstitutionQuery,
  findLaureatePrizeQuery,
  findLaureatePartialQuery,
  findPrizePartialQuery,
  findInstitutionPartialQuery,
  findLaureatePrizePartialQuery,
  findLaureateMinimumQuery,
  findPrizeMinimumQuery,
  findInstitutionMinimumQuery,
  findLaureatePrizeMinimumQuery,
  MAX_REQUEST_NUMBER,
} from '../config';
import {
  convertMillisecondsToSeconds,
  getStringSizeInMBytes,
  iterator,
  round
} from "../helpers";
import {
  GRAPHQL_API_BASE_URL,
  REST_API_BASE_URL
} from '../config';

const makeStandardDeviation = (list: number[]) => {
  const sum = list.reduce((acc, current) => (
    acc + current
  ), 0);

  const average = sum / list.length;

  const terms = list.map((n) => (
    (n - average) * (n - average)
  ));

  const termsSum = terms.reduce((acc, current) => (
    acc + current
  ), 0);

  return round(Math.sqrt(termsSum / list.length));
};

const makeThroughput = (totalRequestTime: number) => {
  return round((MAX_REQUEST_NUMBER * 4) / totalRequestTime);
};

const makeMetrics = (
  startTime: number,
  endTime: number,
  data: { [key: string]: any }[]
) => {
  const totalRequestTime = endTime - startTime;
  const totalRequestSize = data.reduce(
    (acc, current) => (
      acc + getStringSizeInMBytes(JSON.stringify(current))
    ), 0
  );
  const averageIndividualRequestTime =
    round(totalRequestTime / MAX_REQUEST_NUMBER);
  const averageIndividualRequestSize = 
    totalRequestSize / MAX_REQUEST_NUMBER;
  
  return {
    totalRequestTime: convertMillisecondsToSeconds(totalRequestTime),
    totalRequestSize,
    averageIndividualRequestTime,
    averageIndividualRequestSize,
  };
};

export const makeGraphqlMetrics = async (
  url: string, body: { [key: string]: any }
) => {
  const dataList = [];
  const individualRequestSize = [];
  const individualResponseTime = [];

  const startTime = performance.now();
  for await (const _ of iterator(MAX_REQUEST_NUMBER)) {
    const individualStartTime = performance.now();

    const data = (await axios.post(url, body)).data;

    const individualEndTime = performance.now();

    individualResponseTime.push(convertMillisecondsToSeconds(individualEndTime - individualStartTime));
    individualRequestSize.push(getStringSizeInMBytes(JSON.stringify(data)));
    dataList.push(data);
  }
  const endTime = performance.now();

  return {
    metrics: makeMetrics(startTime, endTime, dataList),
    individualMetrics: {
      individualResponseTime,
      individualRequestSize,
    },
  };
};

export const makeRestMetrics = async (url: string) => {
  const dataList = [];
  const individualRequestSize = [];
  const individualResponseTime = [];

  const startTime = performance.now();
  for await (const _ of iterator(MAX_REQUEST_NUMBER)) {
    const individualStartTime = performance.now();

    const data = (await axios.get(url)).data;

    const individualEndTime = performance.now();

    individualResponseTime.push(convertMillisecondsToSeconds(individualEndTime - individualStartTime));
    individualRequestSize.push(getStringSizeInMBytes(JSON.stringify(data)));
    dataList.push(data);
  }
  const endTime = performance.now();

  return {
    metrics: makeMetrics(startTime, endTime, dataList),
    individualMetrics: {
      individualResponseTime,
      individualRequestSize,
    },
  };
};

export const graphqlCompleteRequests = async () => {
  const startTime = performance.now();

  const laureateMetrics = await makeGraphqlMetrics(
    GRAPHQL_API_BASE_URL, findLaureateQuery
  );
  const prizeMetrics = await makeGraphqlMetrics(
    GRAPHQL_API_BASE_URL, findPrizeQuery
  );
  const institutionMetrics = await makeGraphqlMetrics(
    GRAPHQL_API_BASE_URL, findInstitutionQuery
  );
  const laureatePrizeMetrics = await makeGraphqlMetrics(
    GRAPHQL_API_BASE_URL, findLaureatePrizeQuery
  );

  const endTime = performance.now();
  const totalRequestTime = convertMillisecondsToSeconds(endTime - startTime);
  const totalRequestSize =
    laureateMetrics.metrics.totalRequestSize +
    prizeMetrics.metrics.totalRequestSize +
    institutionMetrics.metrics.totalRequestSize + 
    laureatePrizeMetrics.metrics.totalRequestSize;
  const throughput = makeThroughput(totalRequestTime);

  const individualRequestSize = [
    ...laureateMetrics.individualMetrics.individualRequestSize,
    ...prizeMetrics.individualMetrics.individualRequestSize,
    ...institutionMetrics.individualMetrics.individualRequestSize,
    ...laureatePrizeMetrics.individualMetrics.individualRequestSize,
  ];
  const individualResponseTime = [
    ...laureateMetrics.individualMetrics.individualResponseTime,
    ...prizeMetrics.individualMetrics.individualResponseTime,
    ...institutionMetrics.individualMetrics.individualResponseTime,
    ...laureatePrizeMetrics.individualMetrics.individualResponseTime,
  ];
  const standardDeviationRequestSize = makeStandardDeviation(individualRequestSize);
  const standardDeviationResponseTime = makeStandardDeviation(individualResponseTime);

  return {
    laureateMetrics,
    prizeMetrics,
    institutionMetrics,
    laureatePrizeMetrics,
    totalRequestTime,
    totalRequestSize,
    throughput,
    standardDeviationRequestSize,
    standardDeviationResponseTime,
  };
};

export const graphqlPartialRequests = async () => {
  const startTime = performance.now();

  const laureateMetrics = await makeGraphqlMetrics(
    GRAPHQL_API_BASE_URL, findLaureatePartialQuery
  );
  const prizeMetrics = await makeGraphqlMetrics(
    GRAPHQL_API_BASE_URL, findPrizePartialQuery
  );
  const institutionMetrics = await makeGraphqlMetrics(
    GRAPHQL_API_BASE_URL, findInstitutionPartialQuery
  );
  const laureatePrizeMetrics = await makeGraphqlMetrics(
    GRAPHQL_API_BASE_URL, findLaureatePrizePartialQuery
  );

  const endTime = performance.now();
  const totalRequestTime = convertMillisecondsToSeconds(endTime - startTime);
  const totalRequestSize =
    laureateMetrics.metrics.totalRequestSize +
    prizeMetrics.metrics.totalRequestSize +
    institutionMetrics.metrics.totalRequestSize + 
    laureatePrizeMetrics.metrics.totalRequestSize;
  const throughput = makeThroughput(totalRequestTime);

  const individualRequestSize = [
    ...laureateMetrics.individualMetrics.individualRequestSize,
    ...prizeMetrics.individualMetrics.individualRequestSize,
    ...institutionMetrics.individualMetrics.individualRequestSize,
    ...laureatePrizeMetrics.individualMetrics.individualRequestSize,
  ];
  const individualResponseTime = [
    ...laureateMetrics.individualMetrics.individualResponseTime,
    ...prizeMetrics.individualMetrics.individualResponseTime,
    ...institutionMetrics.individualMetrics.individualResponseTime,
    ...laureatePrizeMetrics.individualMetrics.individualResponseTime,
  ];
  const standardDeviationRequestSize = makeStandardDeviation(individualRequestSize);
  const standardDeviationResponseTime = makeStandardDeviation(individualResponseTime);

  return {
    laureateMetrics,
    prizeMetrics,
    institutionMetrics,
    laureatePrizeMetrics,
    totalRequestTime,
    totalRequestSize,
    throughput,
    standardDeviationRequestSize,
    standardDeviationResponseTime,
  };
};

export const graphqlMinimumRequests = async () => {
  const startTime = performance.now();

  const laureateMetrics = await makeGraphqlMetrics(
    GRAPHQL_API_BASE_URL, findLaureateMinimumQuery
  );
  const prizeMetrics = await makeGraphqlMetrics(
    GRAPHQL_API_BASE_URL, findPrizeMinimumQuery
  );
  const institutionMetrics = await makeGraphqlMetrics(
    GRAPHQL_API_BASE_URL, findInstitutionMinimumQuery
  );
  const laureatePrizeMetrics = await makeGraphqlMetrics(
    GRAPHQL_API_BASE_URL, findLaureatePrizeMinimumQuery
  );

  const endTime = performance.now();
  const totalRequestTime = convertMillisecondsToSeconds(endTime - startTime);
  const totalRequestSize =
    laureateMetrics.metrics.totalRequestSize +
    prizeMetrics.metrics.totalRequestSize +
    institutionMetrics.metrics.totalRequestSize + 
    laureatePrizeMetrics.metrics.totalRequestSize;
  const throughput = makeThroughput(totalRequestTime);

  const individualRequestSize = [
    ...laureateMetrics.individualMetrics.individualRequestSize,
    ...prizeMetrics.individualMetrics.individualRequestSize,
    ...institutionMetrics.individualMetrics.individualRequestSize,
    ...laureatePrizeMetrics.individualMetrics.individualRequestSize,
  ];
  const individualResponseTime = [
    ...laureateMetrics.individualMetrics.individualResponseTime,
    ...prizeMetrics.individualMetrics.individualResponseTime,
    ...institutionMetrics.individualMetrics.individualResponseTime,
    ...laureatePrizeMetrics.individualMetrics.individualResponseTime,
  ];
  const standardDeviationRequestSize = makeStandardDeviation(individualRequestSize);
  const standardDeviationResponseTime = makeStandardDeviation(individualResponseTime);

  return {
    laureateMetrics,
    prizeMetrics,
    institutionMetrics,
    laureatePrizeMetrics,
    totalRequestTime,
    totalRequestSize,
    throughput,
    standardDeviationRequestSize,
    standardDeviationResponseTime,
  };
};

export const restRequests = async () => {
  const startTime = performance.now();

  const laureateMetrics = await makeRestMetrics(
    `${REST_API_BASE_URL}/laureate`
  );
  const prizeMetrics = await makeRestMetrics(
    `${REST_API_BASE_URL}/prize`
  );
  const institutionMetrics = await makeRestMetrics(
    `${REST_API_BASE_URL}/institution`
  );
  const laureatePrizeMetrics = await makeRestMetrics(
    `${REST_API_BASE_URL}/laureate/prize`
  );

  const endTime = performance.now();
  const totalRequestTime = convertMillisecondsToSeconds(endTime - startTime);
  const totalRequestSize =
    laureateMetrics.metrics.totalRequestSize +
    prizeMetrics.metrics.totalRequestSize +
    institutionMetrics.metrics.totalRequestSize + 
    laureatePrizeMetrics.metrics.totalRequestSize;
  const throughput = makeThroughput(totalRequestTime);

  const individualRequestSize = [
    ...laureateMetrics.individualMetrics.individualRequestSize,
    ...prizeMetrics.individualMetrics.individualRequestSize,
    ...institutionMetrics.individualMetrics.individualRequestSize,
    ...laureatePrizeMetrics.individualMetrics.individualRequestSize,
  ];
  const individualResponseTime = [
    ...laureateMetrics.individualMetrics.individualResponseTime,
    ...prizeMetrics.individualMetrics.individualResponseTime,
    ...institutionMetrics.individualMetrics.individualResponseTime,
    ...laureatePrizeMetrics.individualMetrics.individualResponseTime,
  ];
  const standardDeviationRequestSize = makeStandardDeviation(individualRequestSize);
  const standardDeviationResponseTime = makeStandardDeviation(individualResponseTime);

  return {
    laureateMetrics,
    prizeMetrics,
    institutionMetrics,
    laureatePrizeMetrics,
    totalRequestTime,
    totalRequestSize,
    throughput,
    standardDeviationRequestSize,
    standardDeviationResponseTime,
  };
};

export const testHandler = async () => {
  const graphqlResultsForCompleteRequest = await graphqlCompleteRequests();
  const graphqlResultsForPartialRequest = await graphqlPartialRequests();
  const graphqResultsForMinimumRequest = await graphqlMinimumRequests();
  const restResults = await restRequests();
  console.info(JSON.stringify({
    restResults,
    graphqlResultsForCompleteRequest,
    graphqlResultsForPartialRequest,
    graphqResultsForMinimumRequest,
  }));
};