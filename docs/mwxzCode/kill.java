public void kill() {


    //封包
    Unirest.config().defaultBaseUrl("https://dream233.com")
                    .addDefaultCookie(new Cookie("cacha"));
    Unirest.config().verifySsl(false);


    //请求好友页
    HttpResponse<String> friend = Unirest.get("/mxxz/friend_0_1")
                                         .asString();

    //匹配页数
    Matcher resultPage = Pattern
                          .compile("第\\d+/(\\d+)页")
                          .matcher(friend.getBody());

    if (resultPage.find()) {
        page = Integer.parseInt(resultPage.group(1));
    }


    for (int i = 1; i <= page; i++) {
        int energy = energy();
        if (energy < 5) {
            System.out.println("体力不足，请先补充体力");
            return;
        }

    //请求每页
    HttpResponse<String> echoPage = Unirest
                                   .get("/mxxz/friend" + "_0_" + (i))
                                   .asString();
    //匹配有蟑螂页

    //获得蟑螂列表饭店名单
    List<String> list = Jsoup.parse(echoPage
     .getBody()).select("img").next("a").eachAttr("href");


    if (list.size() == 0) {
        System.out.println("第" + i + "层很干净");
    } else {
        System.out.println("第" + i + "层的蟑螂");
        System.out.println(list);

        for (String s : list) {

        //截取饭店名称
        String[] s1 = s.substring(17).split("_");


        //第一层蟑螂
        List<String> list1 = Jsoup.parse(Unirest.get(s).asString().getBody())
                                  .select("a:contains(蟑螂)").eachAttr("onclick");
        if (list1.size() != 0) {

            //清理第一层
            for (String res : list1) {
                String Xyz = res.substring(13).replaceAll(".*\\((\\d+)\\).*", "$1");
                killObject killObject = new killObject();
                killObject.setByRestaurantId(Integer.parseInt(s1[0]));
                killObject.setFloor(Integer.parseInt(s1[1]));
                killObject.setCockroachXyz(Integer.parseInt(Xyz));

                Map<String, Object> stringObjectMap = BeanUtil.beanToMap(killObject);

                HttpResponse<JsonNode> body = Unirest.post("/mxxz/killCockroach")
                                                     .fields(stringObjectMap)
                                                     .asJson();

                if (body.getBody().toString().contains("9100")) {
                    System.out.println("清理第一楼成功");
                }

            }
        }

            //看第一层还有没有
        List<String> list3 = Jsoup.parse(Unirest.get(s).asString().getBody())
                                  .select("a:contains(蟑螂)").eachAttr("onclick");

        //没有就清理其他层
        if (list3.size() == 0) {
            Element attr = Jsoup.parse(Unirest.get(s).asString().getBody())
                                .select("img").first();
            String attrs = null;
            if (attr != null) {
                Element href = attr.previousElementSibling();
                if (href != null) {
                    attrs = href.attr("href");
                }
            }


            List<String> list2 = null;
            String[] newfloor = new String[0];
            if (attrs != null) {
                newfloor = attrs.substring(17).split("_");
                list2 = Jsoup.parse(Unirest.get(attrs).asString().getBody())
                             .select("a:contains(蟑螂)").eachAttr("onclick");
            }



        if (list2 != null && list2.size() != 0) {
            System.out.println("其他楼蟑螂位置");
            System.out.println(list2);
        }
        if (list2 != null) {
            for (String res : list2) {
                //    截取位置数字
                String xyz = res.substring(13).replaceAll(".*\\((\\d+)\\).*", "$1");

                killObject killObject = new killObject();
                killObject.setByRestaurantId(Integer.parseInt(s1[0]));
                killObject.setFloor(Integer.parseInt(newfloor[1]));
                killObject.setCockroachXyz(Integer.parseInt(xyz));

                Map<String, Object> stringObjectMap = BeanUtil.beanToMap(killObject);

                HttpResponse<JsonNode> body = Unirest.post("/mxxz/killCockroach")
                                                     .fields(stringObjectMap)
                                                     .asJson();

                if (body.getBody().toString().contains("9100")) {
                    System.out.println("清理其他楼成功");
                    System.out.println("----------------------------");
                    System.out.println("----------------------------");
                    System.out.println("----------------------------");

                }
            }
        }


            }

        }
        System.out.println("清理第" + i + "层成功！");
    }
    System.out.println("当前体力" + energy());
    System.out.println("----------------------------");
    System.out.println("----------------------------");
    if (energy() < 5) {
        System.out.println("体力不足");
        return;
    }


}
}
