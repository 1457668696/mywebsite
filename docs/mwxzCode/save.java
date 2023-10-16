public Mwxz Saveoil() {


        //封包
        Unirest.config().defaultBaseUrl("https://dream233.com/mxxz")
                        .addDefaultCookie(new Cookie("cache=e98ae3a"));
        Unirest.config().verifySsl(false);


        //请求首页
        HttpResponse<String> home = Unirest.get("/").asString();

        Mwxz mwxz = new Mwxz();

        if (home !=null){
        //匹配油量
        Matcher resultOil = Pattern
                            .compile("油壶</a>：(\\d+)|金币</a>：(\\d+)")
                            .matcher(home.getBody());

        if (resultOil.find()) {
            Integer oil = Integer.parseInt(resultOil.group(1));
            mwxz.setOil(oil);

            if (resultOil.find()) {
                Integer gold = Integer.parseInt(resultOil.group(2));
                mwxz.setGold(gold);
            }

            mwxz.setDate(TimeUtils.getTime());
            save(mwxz);

        }
        else {
            log.info("未匹配到金币油量");
        }
        }

        else {
            log.info("小镇服务器异常，未返回到响应体");
        }