import requests
import json
import sys

def send_post_request(id_value, status_value):
    url = "http://localhost:5330/api/callback"
    payload = {
        "id": id_value,
        "status": status_value
    }
    headers = {
        'Content-Type': 'application/json'
    }
    response = requests.post(url, data=json.dumps(payload), headers=headers)
    
    # if response.status_code == 200:
    #     print("Request successful.")
    #     print("Response:", response.text)
    # else:
    #     print("Request failed.")
    #     print("Status Code:", response.status_code)
    #     print("Response:", response.text)

if __name__ == "__main__":
    if len(sys.argv) > 2:
        id_value = sys.argv[1]
        status_value = int(sys.argv[2])
        send_post_request(id_value, status_value)
    else:
        print("Usage: python script.py <id> <status>")
        sys.exit(1)