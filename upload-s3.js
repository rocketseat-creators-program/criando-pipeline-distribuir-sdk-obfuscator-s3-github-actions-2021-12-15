const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const javaScriptObfuscator = require("javascript-obfuscator");
const fs = require("fs");
const AWS = require("aws-sdk");

AWS.config.update({
  region: argv.region,
  accessKeyId: argv.accessKey,
  secretAccessKey: argv.secretKey,
});

const S3 = new AWS.S3();

function obfuscatorIO(code) {
  var obfuscationResult = javaScriptObfuscator.obfuscate(code, {
    optionsPreset: "low-obfuscation",
  });
  return obfuscationResult.getObfuscatedCode();
}

function uploadFileToS3(content, bucketName, directoryWithFilenameAndExtesion) {
  const params = {
    ACL: "public-read",
    Body: obfuscatorIO(content),
    ContentType: "text/javascript",
    Bucket: bucketName,
    Key: `${directoryWithFilenameAndExtesion}`,
  };

  S3.putObject(params, (err, data) => {
    if (err) {
      throw new Error(err);
    } else {
      console.log(`uploadFileToS3(${params.Key}) on bucket(${params.Bucket})`);
    }
  });
}

const MYSDK_CODE = fs.readSync("./mysdk.js")
const CODE_OBFUSCATED = obfuscatorIO(MYSDK_CODE)
uploadFileToS3(CODE_OBFUSCATED, "pipeline-sdk-ecr", "mysdk.js")
