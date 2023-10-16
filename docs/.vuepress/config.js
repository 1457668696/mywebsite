import {defaultTheme} from "vuepress";
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({

    // base: "./",

    port: 8088,

    // sidebar: true,

    lang: 'zh-Ch',
    title: '最爱吃炸鸡⭐️',
    description: '喜欢写一些有趣的小玩意',
    head: [
        ['link', { rel: 'icon', href: '/logo.jpg' }],
        ['link', { rel: 'stylesheet', href: '/styles/custom-prism-theme.css' }]
    ],


    theme: defaultTheme({

        navbar: [
            {
                text: 'Web',
                children: [
                    { text: '心得', link: '/html/pdf.md/' },
                    { text: 'weecho', link: '/html/echo.md/' },
                    { text: '纵横四海', link: '/html/zhsh.md/' },
                    // { text: 'web播放器', link: '/html/music.md/' },
                ]
            },
            {
                text: 'Linux',
                children: [
                    { text: 'shell自动化', link: '/linux/shell.md/' },
                ]
            },
            {
                text: 'Java',
                children: [
                    { text: '美味小镇挂机', link: '/java/mwxz/' },
                    { text: '纵横四海刷怪', link: '/java/zhsh.md/' },
                    { text: '漫画爬虫下载', link: '/java/manhua.md/' }
                ]
            },
            {
                text: 'Python',
                children: [
                    { text: '强制删除文件', link: '/python/del.md/' },
                    { text: '快速启动游戏', link: '/python/autogame.md/'},
                    { text: '微信定时问候', link: '/python/weixin.md/'},
                    { text: '批量加密压缩', link: '/python/zip.md/'},
                    { text: '批量命名文件', link: '/python/rename.md/'},
                ]
            },
            // {
            //     text: 'Exception',
            //     children: [
            //
            //     ]
            // },

            {
                text: 'Demo',
                children: [
                    { text: 'html', link: '/htmlDemo/html.md/' },
                    { text: 'mysql', link: '/htmlDemo/mysql.md/' },
                    { text: 'tools', link: '/htmlDemo/tools.md/' },
                    { text: 'java', link: '/htmlDemo/java.md/' },
                    { text: '配置', link: '/config/custom.md/' },
                    { text: '异常', link: '/exception/exception.md/' },
                    { text: '问题', link: '/question/5.md/' },
                    { text: '计划', link: '/question/plan.md/' },
                ]
            },
            // {
            //     text: 'Plan',
            //     children: [
            //         { text: '2023.5月', link: '/question/5.md/' },
            //     ]
            // },
            {
                text: 'Practice',
                children: [
                    { text: '管理系统', link: '/practice/admin.md/' },
                    { text: '瑞吉外卖', link: '/practice/ruiji.md/' },
                    { text: '黑马点评', link: '/practice/dianping.md/' },
                    { text: '学成在线', link: '/practice/xczx.md/' },
                    { text: '尚品汇聚', link: '/practice/sph.md/' },
                    { text: '谷粒商城', link: '/practice/glsc.md/' },
                    { text: '理解业务', link: '/practice/understand.md/' },
                ]
            },
            {
                text: '命理',
                children: [
                    { text: '总纲', link: '/mingli/top.md/' },
                    { text: '食神', link: '/mingli/shishen.md/' },
                    { text: '伤官', link: '/mingli/shangguan.md/' },
                    { text: '正印', link: '/mingli/zhengyin.md/' },
                    { text: '偏印', link: '/mingli/pianyin.md/' },
                    { text: '正财', link: '/mingli/zhengcai.md/' },
                    { text: '偏财', link: '/mingli/piancai.md/' },
                    { text: '日主', link: '/mingli/rizhu.md/' },
                    { text: '神煞', link: '/mingli/shensha.md/' },
                ]
            },
            {
                text: '影视',
                children: [
                    { text: '构图', link: '/photo/goutou.md/' },
                    { text: '主题', link: '/photo/topic.md/' },
                    { text: '器材', link: '/photo/qicai.md/' },
                    { text: '色彩', link: '/photo/color.md/' },
                    { text: '鉴赏', link: '/photo/xingshang.md/' },
                ]
            },
            // {
            //     text: '阅读',
            //     children: [
            //         { text: '笔记', link: '/book/note.md/' },
            //         { text: '计划', link: '/book/plan.md/' },
            //         { text: '启示', link: '/book/find.md/' },
            //         { text: '行动', link: '/book/action.md/' },
            //         { text: '鉴赏', link: '/book/like.md/' },
            //     ]
            // },
            {
                text: '烹饪',
                children: [
                    // { text: '分类', link: '/book/note.md/' },
                    // { text: '基础', link: '/book/plan.md/' },
                    { text: '基础', link: '/book/find.md/' },
                    { text: '加工', link: '/book/action.md/' },
                    { text: '烹饪', link: '/book/like.md/' },
                    { text: '调味', link: '/book/note.md/' },
                ]
            },



        ],
    }),




})
