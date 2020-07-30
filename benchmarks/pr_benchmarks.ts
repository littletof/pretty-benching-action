import {
  prettyBenchmarkDown, defaultColumns, indicatorColumn, thresholdResultColumn, thresholdsColumn
} from "https://deno.land/x/pretty_benching@feature%2Fbenchmark_down/pretty_benchmark_down.ts";

import {
  runBenchmarks,
  bench,
  BenchmarkResult,
} from "https://deno.land/std@0.61.0/testing/bench.ts";

import * as colors from "https://deno.land/std@0.61.0/fmt/colors.ts";

bench({
  name: "Sorting arrays",
  runs: 4000,
  func(b): void {
    b.start();
    new Array(10000).fill(Math.random()).sort();
    b.stop();
  },
});

bench({
  name: "Ungrouped 1",
  runs: 1000,
  func(b): void {
    b.start();
    let a = new Array(500);
    for (let i = 0; i < 500; i++) {
      a.pop();
      a = a.reverse();
    }
    b.stop();
  },
});

bench({
  name: "Ungrouped 2",
  runs: 1000,
  func(b): void {
    b.start();
    let a = new Array(500);
    for (let i = 0; i < 500; i++) {
      a.pop();
      a = a.reverse();
    }
    b.stop();
  },
});

bench({
  name: "Rotating other things",
  runs: 1000,
  func(b): void {
    b.start();
    let a = new Array(500);
    for (let i = 0; i < 500; i++) {
      a.pop();
      a = a.reverse();
    }
    b.stop();
  },
});

bench({
  name: "Rotating arrays",
  runs: 1000,
  func(b): void {
    b.start();
    let a = new Array(500);
    for (let i = 0; i < 500; i++) {
      a.pop();
      a = a.reverse();
    }
    b.stop();
  },
});

bench({
  name: "Proving NP==P",
  runs: 1,
  func(b): void {
    b.start();
    for (let i = 0; i < 1e9 / 5; i++) {
      const NPeP = Math.random() === Math.random();
    }
    b.stop();
  },
});

bench({
  name: "Counting stars_long",
  runs: 1000,
  func(b): void {
    b.start();
    let a = new Array();
    for (let i = 0; i < 1e12; i++) {
      a.push(i);
    }
    b.stop();
  },
});

bench({
  name: "Standing out",
  runs: 1000,
  func(b): void {
    b.start();
    new Array(10000).fill(Math.random()).sort();
    b.stop();
  },
});

const thresholds = {
  "Rotating arrays": { green: 2.5, yellow: 3.4 },
  "Sorting arrays": { green: 0.5, yellow: 2 },
};

const indicators = [
  { benches: /NP/, modFn: () => '%' },
  {
    benches: /Standing/,
    modFn: () => "🚀",
    tableColor: colors.magenta,
  },
];

runBenchmarks(
  { silent: true, skip: /_long/ }
).then(prettyBenchmarkDown(
  {
    title: 'An example benchMarkdown',
    description: 'Here you can tell anything you want, like what this benchmark is for and requirements for the PR to get merged.\nYou can also group benchmarks too.',
    afterTables: '---\n This can be a footer or something else',
    columns: [
      indicatorColumn(indicators),
      ...defaultColumns,
      thresholdsColumn(thresholds),
      thresholdResultColumn(thresholds),
      {title: 'format', toFixed: 3, align:'right', formatter: (result: BenchmarkResult, cd: any) => { return 'custom' + result.measuredRunsAvgMs.toFixed(cd.toFixed); }}
    ],
    groups: [
      {include: /array/, name: 'Things with arrays', description: 'Anything that has to do with arrays', afterTable: 'You can do things before and after the table in each group'},
      {include: /otating/, name: 'Rotated things', description: 'Here are things that were rotated', afterTable: 'Some different text after the table'},
      {include: /Proving|Standing/, name: 'Extra'}
    ]
  }
  ));

