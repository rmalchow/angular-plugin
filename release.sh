version=`jq '[ (.version | split(".")[0]) ,(.version | split(".")[1]) , ( .version | split(".")[2]  | tonumber + 1 | tostring) ] | join(".")' package.json`
echo "version is ${version}"

