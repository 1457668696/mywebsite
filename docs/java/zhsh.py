# -*- coding: utf-8 -*-
import requests
import urllib3
from parsel import Selector
import re  # 正则包

# 忽略证书警告
urllib3.disable_warnings()

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)
    AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 '
                  'Safari/537.36 Edg/110.0.1587.41'
}
count = 0

while True:

    # verify=False 不验证ssl.且带头请求
    r = requests.get('https://sea.pccsh.cn/Map/257_517?sid=gqhW',
                     verify=False,
                     headers=headers)
    html = r.text

    # 匹配html
    selector = Selector(text=html)

    for a in selector.xpath('//a[text()="四瞳灵狐"]'):
        startUrl = a.xpath('@href').get()

        r = requests.get(f'https://sea.pccsh.cn{startUrl}',
                         verify=False,
                         headers=headers)
        print(f"---------------------第{count}攻击----------------------")
        print(re.findall('四瞳灵狐体力\((.*?)\)', r.text), end="")

    for a1 in selector.xpath('//a[text()="攻击"]'):
        attUrl = a1.xpath('@href').get()

        r1 = requests.get(f'https://sea.pccsh.cn{attUrl}',
                          verify=False,
                          headers=headers)

        print(re.findall('四瞳灵狐体力(...........)', r1.text), end="")

        selector = Selector(text=r1.text)
        for a3 in selector.xpath('//a[text()="攻击"]'):
            attUrl = a3.xpath('@href').get()
            r3 = requests.get(f'https://sea.pccsh.cn{attUrl}',
                              verify=False,
                              headers=headers)

            three = re.findall('(?<=经验:)\+\d+', r3.text)
            # three = re.findall('四瞳灵狐体力\((.*?)\)', r3.text)

            if len(three) == 1:
                print(three)

            else:
                print(re.findall('四瞳灵狐体力(...........)', r3.text))
                selector = Selector(text=r3.text)
                for a22 in selector.xpath('//a[text()="攻击"]'):
                    attUrl = a22.xpath('@href').get()
                    r22 = requests.get(f'https://sea.pccsh.cn{attUrl}',
                                       verify=False,
                                       headers=headers)

                    test = re.findall('经验:\+\d{4,}', r22.text)
                    print(test)

            count += 1
            print("---------------------结束-------------------------------")
            print("")
            print("")
            # 每100次修理装备
            if count % 50 == 0:
                # 进入地图
                r6 = requests.get(
                    'https://sea.pccsh.cn/Map/Index/MapCity/257_517?sid',
                    verify=False,
                    headers=headers)
                print("进入地图")
                # 进入铁匠铺
                selector = Selector(text=r6.text)
                for a6 in selector.xpath('//a[text()="铁匠铺"]'):
                    attUrl = a6.xpath('@href').get()
                    r8 = requests.get(f'https://sea.pccsh.cn{attUrl}',
                                      verify=False,

                                      headers=headers)
                    print("进入铁匠铺")

                #             进入修理界面
                r5 = requests.get(
                    'https://sea.pccsh.cn/Bag/Equ/RecoverEqu?npc=',
                    verify=False,
                    headers=headers)

                print("寻找铁匠")

                selector = Selector(text=r5.text)
                for a5 in selector.xpath('//a[contains(text(),"全部修复")]'):
                    attUrl = a5.xpath('@href').get()
                    # 修理成功
                    r5 = requests.get(f'https://sea.pccsh.cn{attUrl}',
                                      verify=False,
                                      headers=headers)

                    print(re.findall('修理成功.损耗\d{0,}.\d{0,5}.!', r5.text))

                    # 进入地图
                r9 = requests.get(
                    'https://sea.pccsh.cn/Map/Index/MapCity/257_517?sid=',
                    verify=False,
                    headers=headers)
                # 进入西城门
                selector = Selector(text=r9.text)
                for a7 in selector.xpath('//a[text()="西城门"]'):
                    attUrl = a7.xpath('@href').get()
                r8 = requests.get(f'https://sea.pccsh.cn{attUrl}',
                                  verify=False,
                                  headers=headers)

                # 进入凤凰山
                selector = Selector(text=r8.text)
                for a8 in selector.xpath('//a[text()="凤凰山"]'):
                    attUrl = a8.xpath('@href').get()
                    r10 = requests.get(f'https://sea.pccsh.cn{attUrl}',
                                       verify=False,
                                       headers=headers)
    if count % 50 == 0:
        r11 = requests.get(f'https://sea.pccsh.cn/User/Index/Index?sid=',
                           verify=False,
                           headers=headers)

        allex = re.findall('(?<=经验:)\d+\/\d+', r11.text)
        level = re.findall('(?<=等级:)\d+', r11.text)

        if len(allex) == 1:
            strex = str(allex[0]).split("/")
            nowEx = int(strex[0]) / 10000
            needEx = (int(strex[1]) - int(strex[0]))

            with open("output.txt", "a", encoding="utf-8") as f:
                print(f'已经打怪：{count},次\n已经获得经验{13500 * count}', file=f)
                print(f"当前等级：{level[0]}", file=f)
                print(f"当前经验{nowEx}万", file=f)
                print(f"升级还需要经验：{needEx / 10000}万", file=f)

        else:
            print("正在打怪")
