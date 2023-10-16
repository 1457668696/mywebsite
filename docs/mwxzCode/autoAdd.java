@Component
@Slf4j
public class AutoAddOil {

    private int count = 0;

    @Resource
    private MwxzService mwxz;

    @Scheduled(cron = "0 0/30 * * * ? ")
    public void addOil() {
        Boolean state = mwxz.addOil();
        count++;
        if (state) {
            log.info("第{}次加油", count);
        } else {
            log.info("定时任务执行中，但却失败了，因为addOil返回了false。");
        }
        System.out.println(count);
    }
}