 public Boolean addOil() {

        //忽略ssl
        Unirest.config().verifySsl(false);
        //封包
        Unirest.config().defaultBaseUrl("https://dream233.com/mxxz")
                        .addDefaultCookie(new Cookie("cache=e2bcebb2"));


        for (int i = 0; i < 5; i++) {
            //请求添油
           add = Unirest.post("/addFullOil").asString();

           //有数据则跳出
           if (add!=null){
               break;
           }
            //没有数据则休眠5秒再请求，避免服务器的异常
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }

        return add.getBody().contains("请求成功");
    }



