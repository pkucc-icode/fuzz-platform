#!/bin/bash
cd afl_fuzz
rm -rf *output*
rm -rf crash_*
echo core | sudo tee /proc/sys/kernel/core_pattern

# 检查是否提供了参数
if [ -z "$1" ]; then
    echo "Error: No configuration file name provided."
    exit 1
fi

# 构造JSON文件名
json_file="config-$1.json"


# 执行Python脚本并捕获错误
if ! python3 agent.py "$json_file"; then
    # 如果命令执行失败，则打印错误信息
    echo "Error: Failed to execute python3 agent.py $json_file"
    exit 1
fi

# DO NOT use localhost api address, i don't know why it not works
url="http://192.168.200.146:5330/api/callback"




# 发送 HTTP 请求函数
do_send() {
    id_value=$1
    status_value=$2
    result=$3

    payload=$(jq -n --arg id "$id_value" --arg status "$status_value" --argjson result "$result" \
        '{id: $id, status: $status, result: $result}')

    response=$(curl -s -o /dev/null -w "%{http_code}" -H "Content-Type: application/json" \
        -d "$payload" "$url")

    if [[ $response -eq 200 ]]; then
        echo "Update project status successfully."
    else
        echo "URL: $url, Payload: $payload"
        echo "Update project status failed. Response code: $response"
    fi
}

if [[ -f "$json_file" ]]; then
    fuzz_target=$(jq -r '.afl_fuzz_args.fuzz_target[]' "$json_file")
else
    echo "错误：文件 '$json_file' 不存在。"
    exit 1
fi

result="[]"

for target in $fuzz_target; do
    report="${target}_report.json"
    
    if [[ -f "$report" ]]; then
        rep_json=$(cat "$report")
        result=$(echo "$result" | jq ". + [$rep_json]")
    else
        echo "错误：文件 '$report' 不存在。"
        do_send "$1" "FAIL" "$result"
        exit 1
    fi
done

do_send "$1" "SUCCESS" "$result"


echo "callback executed."