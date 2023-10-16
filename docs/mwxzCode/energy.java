public int energy() {

        //封包
       Unirest.config().defaultBaseUrl("https://dream233.com")
                       .addDefaultCookie(new Cookie("cache=ebceb3a"));
       Unirest.config().verifySsl(false);

       String text = Jsoup.parse(Unirest
                     .get("/mxxz/energy_card").asString().getBody())
                     .select("#current_energy")
                     .text();

       if (!text.isEmpty()) {
            return Integer.parseInt(text);
       }
       return -1;
    }