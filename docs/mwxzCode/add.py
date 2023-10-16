import requests
import urllib3
import random
import time
import re  # 正则包
from _datetime import datetime

# 忽略证书警告
urllib3.disable_warnings()

count = 0

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 '
                  'Safari/537.36 Edg/110.0.1587.41',
    'Cookie': 'cache=ebcebb2e23389a192bbf87b04c98ae3a'
}

while True:
    r = requests.get('https://dream233.com/mxxz/', verify=False, headers=headers)

    pattern = re.compile('(?<=：)\d{4,}', re.S)

    # 提取标题
    oil = re.findall(pattern, r.text)

    timeNow = datetime.now()
    formatTime = timeNow.strftime("%Y-%m-%d %H:%M:%S")

    wait_time = random.randint(60, 360)
    p = requests.post('https://dream233.com/mxxz/addFullOil', verify=False, headers=headers)
    count = count + 1
    with open("../output.txt", "a", encoding="utf-8") as f:
        print(f'当前油量：{oil[0]},\n已经加油{count}次,下次间隔{wait_time}秒,当前时间{formatTime}\n', file=f)
    time.sleep(wait_time)
