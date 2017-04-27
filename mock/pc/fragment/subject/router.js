var Router = require("express").Router;
var router = new Router();


// 获取问题列表
router.get("/pc/fragment/subject/list", (req, res) => {
  setTimeout(() => {
    res.status(200).json(
        {
            "msg": {
                "list": [
                    {
                        "title": "为什么你思维严谨却没有创新？",
                        "upName": "Chloé🌸",
                        "upTime": "2017-04-26",
                        "headPic": "http://wx.qlogo.cn/mmopen/Bqm3aw1TmGlHZDT30nZLHgYsBTxNN5eWWzX7ibBgulX8TVUhWMx9RQ2awkFbkGPt0kDfplxFmzVDErWpQvEr3yibmgGY8PIHeX/0",
                        "content": "内容提要：\n1.逻辑严密的垂直思维存在局限性，天马行空的水平思维，会让你更有创造力\n2.创造力人人都有，但需要被开发被训练，才能发挥它的潜力\n3.创造力五字诀：信、放、虑、收、行\n4.开脑洞（放）的正确姿势：打破思维定式、转换角度、联系不相关事物、催化\n5.解除思维限制、打开脑洞之前，先解除外在标签对自我的限制\n\n\n这是之前发给朋友们的问题：一家咖啡厅开在地......",
                        "voteCount": 1,
                        "commentCount": 7,
                        "submitId": 15,
                        "type": 3,
                        "perfect": true,
                        "authorType": 2,
                        "isMine": false,
                        "labelList": null,
                        "picList": null,
                        "publishTime": null,
                        "priority": null,
                        "role": 3,
                        "signature": "孙可爱"
                    }
                ],
                "highlightList": null,
                "end": true
            },
            "code": 200
        }
    )
  }, Math.random() * 1500)
});


router.get("/pc/fragment/subject/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
        "msg": {
            "title": "为什么你思维严谨却没有创新？",
            "upName": "Chloé🌸",
            "upTime": "2017年04月26日",
            "headImg": "http://wx.qlogo.cn/mmopen/Bqm3aw1TmGlHZDT30nZLHgYsBTxNN5eWWzX7ibBgulX8TVUhWMx9RQ2awkFbkGPt0kDfplxFmzVDErWpQvEr3yibmgGY8PIHeX/0",
            "content": "内容提要：\n1.逻辑严密的垂直思维存在局限性，天马行空的水平思维，会让你更有创造力\n2.创造力人人都有，但需要被开发被训练，才能发挥它的潜力\n3.创造力五字诀：信、放、虑、收、行\n4.开脑洞（放）的正确姿势：打破思维定式、转换角度、联系不相关事物、催化\n5.解除思维限制、打开脑洞之前，先解除外在标签对自我的限制\n\n\n这是之前发给朋友们的问题：一家咖啡厅开在地价昂贵的闹市区，咖啡20元一杯，与周边竞争对手价格相同，口味类似，但环境更好，所以座位常常爆满。然而，盈利依然未达预期。请问，你有哪些方法提高它的利润呢（为了简化问题，假设它仍然只卖咖啡，不卖其它周边产品）？\n\n朋友们的想法，我挑了一些，大概归类如下：\n\n提价类：心理定价、提升口味、主打高端品类、主打高端客户、收取服务费等等\n增销类：拓展外卖、拓展线上渠道、流动车、限时喝完优惠、提前下单、售卖套餐、重新布局座位、会员卡、延长营业时间、限制wifi等等\n降本类：缩小容量、找兼职员工、降低采购成本、推自助服务、优化流程等等\n\n这个问题，很多朋友都用了结构化思维，思考过程类似于：\n\n利润=收入-成本\n收入=单价x数量\n\n以上方法符合MECE原则，非常完善了。可是，有没有其它方法呢？\n\n有几位朋友给出了不一样的回复，跟大家分享一个：将咖啡价格降到略高于成本价，但在此基础上，按照堂饮的时间来实行计时收费。对于一个环境好的咖啡厅来说，环境也是一种可收费的价值。如此一来，外带客人猛增，咖啡厅的座位利用率也会增加。\n\n这个方案如何？\n\n有人会说：太天真了，咖啡馆都是按杯收费的，哪有按时间收费的？\n\n可谁规定不能呢？\n\n实际结果我们都不知道会如何，但在现实中，已经有一些火锅店开始按时计费了，而最后的数据表明，确实对利润有积极贡献。\n\n给大家做这个案例，并不是要找出一个正确答案，事实上，哪个策略更加有效，还需要充分的市场调研，所以本来也没有正确答案。\n\n只是，通过这个案例，大家可以体会到思维方式的差异。\n\n我们此前提到的结构化思维，属于垂直思维（vertical thinking），它能够让我们从一个点开始，跟随严密的逻辑一步步往下推导，就像我们上面写的公式那样。\n\n但是它有缺陷，因为忽略了水平方向的可能性，比如，收入=单价X杯数，它的假设前提是我们仍然按照每杯咖啡来收费，忽略了按时间收费的可能性。\n\n这种水平方向的思考，我们称为水平思维（lateral thinking），维基百科的定义是：以非直接、非传统的方式或者显然非逻辑、非一步步推导的方式，来寻求解决问题的办法。\n\n是的，你看这个定义的含义：解决问题，也可以用非逻辑的方式。\n\n所以有些时候，你会发现，一些结构化思维很好的人，条理非常清楚，却好像没什么特别的洞见。而另一些人，条理没那么清楚，却时常能提出些脑洞大开的想法。\n\n原因就在于思维方式的不同：垂直思维让你的思考更清晰、想法更完善、表达更逻辑，但是要有更创新的洞见，往往还需要结合水平思维。\n\n那么我们今天要说的“创造力”，跟这些思维方式有什么关系呢？\n\n《心理学与生活》中，创造力的定义是：个体产生新异的和合适的思想和产品的能力。当然，这里的产品包括一切有形无形的产品。\n\n所以，创造力其实是一种综合概念，而思维是创造的方式，我们在创造的过程中，垂直思维和水平思维都是必要的。\n\n既然结构化思维这种垂直思维是可以培养的，那么水平思维是否可培养呢，另外，创造力是否可培养呢？\n\n创造力是可以培养的，而且是有方法的。\n\n斯坦福开设了一门创新课程《创意速成课》，就来教大家如何产生创意。而各类研究也表明，创造力取决于很多要素（智力、思维、社会环境等等），而这些要素中很多是可以后天培养的。\n\n虽然说“人人都有创造力”，然而，不是每个人的这种潜力都能随时任意表现出来，关键是进行思维训练。\n\n我们今天，就以解决问题的流程为基础，看看如何使用垂直思维和水平思维，提升创造力。当然，我们今天所聊的创造力，更多是技术创造力，而非艺术创造力。\n\n技术创造力是为了解决问题，而艺术创造力并没有明确的目的。\n\n为了便于理解，整个流程我总结成了五字诀“信放虑收行”，如下图：\n\n信：从观念上、信息上做好创造的准备；\n放：将自己的思维信马由缰地放出去，打开脑洞；\n虑：过滤掉那些不靠谱的想法；\n收：将思维收回来，进行整理归纳，形成方案；\n行：执行和跟进。\n\n这里面的“放”，更多是水平思维，而“收”，更多是垂直思维。以这样的流程，便能够确保，我们的方案中，既有创新大胆天马行空，又有深思熟虑严密逻辑。\n\n这五个字中的“收”，在此前结构化思维中讲过，所以只是简单提及，另外，“行”，今天也不会讲，我们把重点放在“信”、“放”、“虑”三个字上。\n\n1.  信：从观念上、信息上做好创造的准备\n\n1.1.  改变观念\n\n我们经常会看到，那些有创造力的人往往对待问题的态度十分积极，比起怕麻烦地讨厌问题出现，他们会将问题视为发挥创造力、进行创新的机会。\n\n因此，要变成一个有创造力的人，我们需要在心态上做到：第一，我们要解决的不仅仅是涌现出来的现存问题，更重要地是，要善于发现潜在问题并解决。第二，任何变化、挫折、失败都是创新的好机会，而不是一个麻烦。第三，随时关注外部变化和趋势。\n\n只有做到这三点，我们的大脑才有可能成为创造力的土壤。\n\n1.2. 收集信息\n\n除了积极的态度之外，创造力并非空中楼阁，不是无来由的灵感，它建立在我们掌握的信息之上。基本上解决问题之前，我们需要收集三类信息：\n\n第一类是特征信息，即该领域内一些好的方案所具备的特征，这能够确保我们时刻记住最终目标，而不会跑偏。例如，我朋友想要开个美食类的公众号，那就要先去看看其它做得好的号，都有怎样的特点。\n\n第二类是主题信息，即与待解决问题相关的方法论/学习材料，这能够确保你的方案有实质内容。仍然以美食公众号为例，她需要学习美食相关的理论、公众号的用法等等。\n\n第三类是对象信息，即你的受众的需求，这能够确保你的方案能够接地气地解决问题。所以，需要了解那些看美食公众号的人群，他们的需求如何。\n\n2.  放：将自己的思维信马由缰地放出去，打开脑洞 \n\n在你收集到足够多的信息之后，接下来就是脑洞大开的时刻了！关于脑洞的正确打开姿势，我总结了四点：\n\n2.1 打破原有思维模式\n\n我们的思维在多次解决同类问题、处理同类信息之后，会逐渐形成习惯，也就是思维定式。\n\n思维定式一方面让我们处理同类问题更加快速，但另一方面，也会让我们的思维受限。就像开头那个例子一样，“收入=单价X杯数”就是一种思维定式。\n\n另外，我们也都玩过一个游戏：让对方说10遍老鼠，接着问他猫怕谁，八成对方会回答老鼠。\n\n如何打破思维定式呢？核心要义是拒绝下意识的条件反射。\n\n所以，如果我们能够将问题用非习惯的方式进行表述，或者问自己一些从未思考过的问题，都能帮助我们打破思维定式。\n\n基于此，这里提供几个打破定式的方法：拓展问题、重新表述问题、反向问题、SCAMPER。\n\nA.   拓展问题\n\n拿到一个问题的时候，将它拓展成为六个问题，分别进行思考：\"Who\", \"What\", \"Why,\" \"Where,\" \"When,\" and \"How\"。\n\n比如，你在一家生产文具的公司工作，老板让你策划一款新的笔记本。如果按照过去的工作惯性，你会思考笔记本封面、纸质、大小、页数等等，然后开始制作。\n\n然而用这六个问题，你会发现自己的思维会更加活跃。\n\nWho：谁来设计（我自己？找明星合作？找漫画师？）、谁会使用（学生还是白领？男士还是女士？）\n\nWhat：笔记本是什么样式（形状、大小、颜色等等）\n\nWhy：为什么人们会买、为什么竞争对手没有推出过这个样式\n\nWhere：应该放在哪里卖、在哪里打广告\n\nWhen：什么时候设计完成、何时推出\n\nHow：笔记本如何更好使用、如何宣传\n\n这六个问题一来，你的脑洞会更容易打开。前面的咖啡店案例，你也可以试着问自己上面六个问题，应该会比你之前得到的想法更多。\n\nB.   重新表述问题\n\n尝试问自己这个问题：我的人生目标是什么？\n\n你会觉得，这个问题好难回答。\n\n但是，换种方式：你希望自己百年之后的葬礼上，人们如何评价你？\n\n或许，你会开始滔滔不绝，甚至开始给自己写悼词了。\n\n所以，当我们面临一些问题，没有任何思路的时候，试着将问题用不同的方式问自己，可能会有惊喜。\n\nC.   反向问题\n\n如果你问一个女生：你喜欢什么样的男生呢？\n她很难回答，一般会说：嗯，没有具体要求，看缘分吧。\n\n但是，倘若你问她：你讨厌什么样的男生呢？\n她就会有很多答案：不爱干净、歧视女性、没有责任心……\n\n试着把这个答案反过来：爱干净、尊重女性、责任心强，就是原问题的答案了。\n\n另外，开头的咖啡馆例子也可以用这个方法。原本的问题是“如何增加利润”，反向问法可以是“为什么现在利润不高”，你就会想到可能的原因：很多人冲着环境好、价格不贵，买杯咖啡坐一下午，导致堂饮客人有限。\n\n然后，接下去思考，如何提高堂饮的翻台率，可能就会想到计时收费的办法。\n\n所以，试着把问题反过来问，常常会有意外发现。\n\nD.   SCAMPER\n\n当有产品/服务出现问题、需要改进的时候，SCAMPER是个很好的工具，可以帮我们拓展思路。\n\nSubstitute替代：原材料、资源、流程等，是否有可替代的其它方案\n\nCombine合并：资源、品类、功能等，是否存在合并的可能性\n\nAdapt适应：产品还可以适用于何种场景，需要作何改变\n\nModify修改：产品的形状、颜色等特征，可以作何修改\n\nPut to another use用途：产品还可以有哪些新用途\n\nEliminate简化：产品的哪些地方还可以更简化/忽略\n\nReverse反向：你想做的这个改变，如果反过来，会如何\n\n2.2. 换个角度\n\n脑洞打开的第二类方法，就是换个角度，一是换自己，二是换问题。\n\n换自己的意思是，转换自己的角色，假设自己是其他人；换问题的意思是，使用比喻，将这个问题转换成其它问题。\n\nA   转换角色：客户/老板、偶像/超级英雄\n\n比如，开一个美食公众号，思考应该放什么类型的内容，很纠结。但是，如果你转换角色，想象自己是读者，会如何挑剔内容，可能就有想法了。\n\n再比如，依云水的广告里，每个人都遇见了自己小时候，如果我让你思考更多好玩的类似案例，你可以想象自己是蜘蛛侠：如果蜘蛛侠遇到了自己小时候，会是怎样的情景。\n\nB   用比喻：转换成熟悉问题\n\n当我们面对一些不太熟悉的问题时，往往会没有任何思路，这时候可以借助比喻，以我们熟悉的事物作为参照，来寻找灵感。\n\n比如我问你：为什么第一份工作大多很难坚持到最后？\n如果你还未工作过，这个问题可能很难有什么想法。\n\n但是，如果将工作跟爱情做个类比，问题换成：为什么初恋大多很难走到最后？你可能就可以想到很多原因了，比如：当时不知道自己要什么，后来有了更好的选择，等等。\n\n2.3. 将不同事物进行联系\n\n第三类打开脑洞的方法是，将看似不可能的事物联系起来，以及使用思维导图作为辅助。\n\nA 随机输入\n\n随手拿起一本书、一张照片，或者听一首歌，强行将它们跟你的问题联系在一起，迫使你跳出思维定式。\n\n另外，把你的问题用图形化的方式展现出来，也是一个非常好的方法。这个过程，不在于你画画技巧如何，而在于将你的笔作为大脑的延伸，跳出思维习惯，启发灵感。\n\nB 思维导图\n\n思维导图它跟金字塔是什么区别？\n\n实际上，两者的区别在这里就可以看出来，导图用来“放”，而金字塔用来“收”。所以，这步用的是导图，而最后归纳整理方案用的是金字塔。\n\n关于思维导图的用法，网上有很多介绍，我就不多说了。\n\n2.4. 催化\n\n前面三种打开脑洞的方法都是内在的，从思考的角度入手。但是，你所处的环境同样很重要，所以放空自己和更换环境，都是催化灵感的有用方法。\n\n不知道你们有没有过这样的经历：一个问题苦思不得其解，但是突然坐在马桶上想通了；你坐在电脑前毫无头绪，但是突然泡着澡灵光乍现了。\n\n实际上，这是因为你的大脑已经积累了足够多的素材，所以当你做一些无需动脑的琐事的时候，对周围环境的敏感度减弱，大脑开始对之前的信息进行处理。这种现象称为大脑的静息默认网络（default mode network）。\n\n研究表明：要引导大脑进入这种状态，你需要做一些琐事，而这些事情必须维持一种频繁的活跃状态，但又不需要太多的注意力，同时还必须让你足够投入，能够持续足够长的时间，比如泡澡，散步，蹲马桶等等。\n\n当然，在这个等待灵感的过程中，你心里不能有一个明确的目标，如果你真的带了纸笔坐在澡盆里找灵感，八成是会失败的，你必须真的让大脑放空。\n\n3.   虑：过滤掉那些不靠谱的想法\n\n在上一步的“放”，我们需要天马行空、脑洞大开，迸发尽可能多的想法，但是这其中必然有靠谱和不靠谱的部分。所以，这一步的任务是：过滤掉不靠谱的想法。\n\n过滤的方法是分析一下这些想法的风险、潜在影响以及阻力，同时对各个想法进行比对。\n\n3.1. 考虑各个想法的风险、影响、阻力\n\n风险分析：发掘哪些地方可能会出现问题\n影响分析：该方案可能产生的方方面面的影响有哪些\n阻力分析：该方案可能面临的压力和阻力，阻力排除的可能性\n\n3.2. 在此基础上对方案进行比对和决策\n\n在分析了以上要素之后，将不靠谱的想法进行删除。\n\n\n4.   收：将思维收回来，进行整理归纳，形成方案\n\n当你脑中有了足够多的靠谱想法之后，现在就可以往回收了。你需要把这些零散的想法进行结构化，将它们去重、归纳，确保想法考虑全面。\n 四 自主性是创新者的内在基础\n在Mihaly Csikszentmihalyi那本极具影响力的书《Creativity》中，他研究了90多位创新者，最后指出：创新者的性格与普通人最大的区别是，他们的性格复杂，往往能兼容对立的两面。\n\n比如活跃与安静、玩乐与守纪、幻想与现实、内向与外向、谦逊与骄傲、传统与叛逆等等。正是这种兼容的性格让他们可以既做出创新，又能够将之传播出去。\n\n可是，为什么普通人很少具备复杂的性格呢？往往是因为自主性的缺失。\n\n普通人喜欢给别人、给自己贴标签，就像学校和父母在小时候给我们贴标签一样。\n\n当我们缺乏自主性的时候，往往就会被外界贴的标签所限制。而创新者的高自主性，让他们得以摆脱社会对性格的偏好和定义，保持自己的兼容性。\n\n想要让自己的思维突破定式的限制，首先就要让自我突破外在标签的限制。\n\n所以，当你说“我是XX性格的人，所以我的行为通常是XX”的时候，你就已经失去了成为一名创新者的可能。\n\n参考资料：\n1. 五字诀的理论来源：G.Wallas提出的四阶段论、Mihaly Csikszentmihalyi提出的创造力五步骤，在此基础上进行提炼\n2.《创造力：心流与创新心理学》，Mihaly Csikszentmihalyi 著，黄珏苹 译，浙江人民出版社，2015\n3. SCAMPER用法的进一步解释：https://litemind.com/scamper/\n4. Lateral Thinking, Wikipedia, https://en.wikipedia.org/wiki/Lateral_thinking\n5. Vertical Thinking, Wikipedia, https://en.wikipedia.org/wiki/Vertical_thinking\n6. A Crash Course on Creativity（创意速成课）, Tina Seelig, Stanford University\n\n\n\n",
            "submitId": 15,
            "type": "subject",
            "isMine": false,
            "voteCount": 1,
            "voteStatus": 0,
            "planId": null,
            "workId": null,
            "picList": [],
            "signature": "孙可爱",
            "role": 3,
            "desc": "学习是为了更好地实践。不妨跟大家分享一下，你运用创新想法解决了什么问题。好的分享能有机会获得圈外教练的点评，其他童鞋的点赞，以及被收录为精华！",
            "labelList": [
                {
                    "id": 4,
                    "problemId": 3,
                    "name": "生活情感",
                    "selected": false,
                    "del": false
                },
                {
                    "id": 5,
                    "problemId": 3,
                    "name": "工作职场",
                    "selected": false,
                    "del": false
                },
                {
                    "id": 6,
                    "problemId": 3,
                    "name": "产品/服务",
                    "selected": false,
                    "del": false
                },
                {
                    "id": 7,
                    "problemId": 3,
                    "name": "改进",
                    "selected": false,
                    "del": false
                },
                {
                    "id": 8,
                    "problemId": 3,
                    "name": "其它",
                    "selected": false,
                    "del": false
                }
            ]
        },
        "code": 200
    });
  }, Math.random() * 1500);
});


router.post("/pc/fragment/vote", (req, res) => {
    setTimeout(() => {
        res.status(200).json(
            {
                "msg": "ok",
                "code": 200
            }
        )
    }, Math.random() * 1500)
});


module.exports = router;
