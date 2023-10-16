@Service
public class sihaiGamelmpl implements GameQuery {
    @Override
    public Game queryAllGame() {

//        String filePath = "F:\\nohup.out";
        String filePath = "/home/sihai/nohup.out";
        List<String> list=new ArrayList<>();
        List<String> list1=new ArrayList<>();
        try {
            File file = new File(filePath);
            int linesToRead = 200; // 读取最后10行

            ReversedLinesFileReader reader = new ReversedLinesFileReader(file);

            String line;
            int count = 0;
            while ((line = reader.readLine()) != null && count < linesToRead) {
                list.add(line);
                count++;
            }

        } catch (IOException e) {
            e.printStackTrace();
        }


        String str=list.toString();
        Pattern pattern=Pattern.compile("(\\d+\\.\\d+)|当前等级：(\\d+)");
//        Pattern pattern1=Pattern.compile("当前等级：\\d+");
        Matcher matcher=pattern.matcher(str);
//        Matcher matcher1=pattern1.matcher(str);

        while (matcher.find()){
            list1.add(matcher.group());
        }

//        while (matcher1.find()){
//            list1.add(matcher.group());
//        }






        Game game=new Game();
        game.setName("等级");
        game.setLevel(Integer.valueOf(list1.get(2).substring(5)));
        game.setExperienceNeed(Double.valueOf(list1.get(1)));
        game.setExperienceNow(Double.valueOf(list1.get(0)));

//        return game;
        return game;
    }

}