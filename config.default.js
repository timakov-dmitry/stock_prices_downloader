export default {
  RUN_SETTINGS: {
    sourceAPIName: "tinkoffAPI",
    exportTargetName: "exportToJSONFile",
    taskGeneratorName: "jsonFile",
    generatorTemplateName: "downloadAllFromThisYear",
    logLevel: 'info'
  },
  QUEUE: {
    jsonFileLocation: "./queue.json"
  },
  QUERY: {
    interval: 'day',
    type: 'stocks',
    querySleepTime: 100
  },
  EXPORT_SETTINGS: {
    exportDir: "./exportDir",
    batchSize: 1000
  }

}