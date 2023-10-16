@GetMapping("/all")
    public R<MwxzDto> queryGame() {

        //只返回必要的信息
        MwxzDto mwxzDto = BeanUtil.toBean(mwxz.queryOil(), MwxzDto.class);
        return R.success("查询成功",mwxzDto);

    }