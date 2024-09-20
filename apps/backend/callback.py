import requests
import json
import sys

def send_post_request(id_value, status_value):
    url = "http://localhost:5330/api/callback"

    json_file = f"sh/config-{id_value}.json"

    # 读取文件内容
    with open(json_file, 'r') as file:
        data = json.load(file)
    fuzz_target = data.get('afl_fuzz_args', {}).get('fuzz_target', [])

    result = []
    for target in fuzz_target:
        report = f"sh/{target}_report.json"
        with open(report, 'r') as report_file:
            rep_json = json.load(report_file)
            result.append(rep_json)

    payload = {
        "id": id_value,
        "status": status_value,
        "result": result
    }
    headers = {
        'Content-Type': 'application/json'
    }
    response = requests.post(url, data=json.dumps(payload), headers=headers)
    
    if response.status_code == 200:
        print("Update project status successful.")
        # print("Response:", response.text)
    else:
        print("Update project status failed.")
        print("Status Code:", response.status_code)
        print("Response:", response.text)

if __name__ == "__main__":
    if len(sys.argv) > 2:
        id_value = sys.argv[1]
        status_value = sys.argv[2]
        send_post_request(id_value, status_value)
    else:
        print("Usage: python script.py <id> <status>")
        sys.exit(1)