public class ZhshServiceImpl{


    private final Zhsh game = new Zhsh();
    @Resource
    private RedisUtils redisUtils;

    @Resource
    private AsyncSaveSql saveSql;
    private     int count = 0;
    private      Boolean stop;

    @Override
    public void attack() {
       stop=true;
       while (stop) {

            Unirest.config().verifySsl(false);
            Unirest.config().defaultBaseUrl("https://sea.pccsh.cn");

            // 刷新页面，请求1
            HttpResponse<String> home =
            Unirest.get("/Map/340_264?sid=2HsGTdIXRs71FJNFjsImIT320Cf51JF3")
                   .asString();



            //如果处于攻击状态，直接攻击返回
            if (home.getBody().contains("攻击")){
                String find4 = Jsoup.parse(home.getBody())
                                    .select("a:matchesOwn(^攻击$)")
                                    .attr("href");
                HttpResponse<String> stringHttpResponse = Unirest
                                                        .get(find4)
                                                        .asString();

            }

           //正常状态，开始找怪物
           HttpResponse<String> home1 = Unirest
                                       .get("/Map/340_264?sid=2")
                                       .asString();
            String find = Jsoup.parse(home1.getBody())
                               .select("a:contains(哥斯拉龙)")
                               .attr("href");
            // 进入攻击状态，请求1
            HttpResponse<String> attack = Unirest.get(find).asString();



            String attackOne = Jsoup.parse(attack.getBody())
                                    .select("a:matchesOwn(^攻击$)")
                                    .attr("href");
            // 第一次攻击 请求2
            HttpResponse<String> attack2 = Unirest.get(attackOne)
                                                  .asString();



            Pattern three = Pattern.compile("经验:\\+\\d+");

            Matcher level = three.matcher(attack2.getBody());
           while (level.find()){
               count++;
               String group = level.group();
               String countall="第"+count+"次打怪:"+ group;
               String countall1="已经获得经验"+count*25600;
               redisUtils.set("zhsh",countall+" "+countall1);

           }

            //写入缓存
            if (count % 300==0){
                //构造对象
                Zhsh game1 = getGame();
                //写入缓存
                redisUtils.set("game_", game1,600);
            }

            //写入数据库
            if (count %10000==0){

                saveSql.saveSqlTask();

            }
        }
}


    @Override
    public Zhsh getGame() {
        Unirest.config().verifySsl(false);
        Unirest.config().defaultBaseUrl("https://sea.pccsh.cn");
        HttpResponse<String> user = Unirest.get("/User/Index/Index?sid=2")
                                           .asString();

        if (user.getBody().contains("撤退")){
            String exit = Jsoup.parse(user.getBody())
                               .select("a:contains(撤退)")
                               .attr("href");
            HttpResponse<String> use = Unirest.get(exit).asString();
        }

        HttpResponse<String> user1 = Unirest.get("/User/Index/Index?sid=3")
                                            .asString();
        Pattern one = Pattern.compile("(?<=经验:)\\d+\\/\\d+");
        Pattern two = Pattern.compile("(?<=等级:)\\d+");

        Matcher level = two.matcher(user1.getBody());
        Matcher matcher = one.matcher(user1.getBody());

        while (matcher.find()) {
            String ex = matcher.group();
            String[] split = ex.split("/");
            game.setExperienceNow(Double.parseDouble(split[0]) / 10000);
            game.setExperienceNeed(Double.parseDouble(split[1]) / 10000);
        }

        while (level.find()) {
            String leve = level.group();
            game.setLevel(Integer.parseInt(leve));
        }


        //返回对象
        return game;

    }

    //控制服务的运行
    @Override
    public void stop() {
        stop=false;
    }


    //根据数据库查
    @Override
    public Zhsh getNew() {

        //先查缓存，不存在再查数据库
        Object game2 = redisUtils.get("game_");
        if (game2 != null){
            return  BeanUtil.toBean(game2, Zhsh.class);
        }

        LambdaQueryWrapper<Zhsh> queryWrapper=
        new LambdaQueryWrapper<>();

        //根据id倒叙查询
        queryWrapper.orderByDesc(Zhsh::getLevel)
                    .last("limit 1");
        return  getOne(queryWrapper);
    }
