// 自动生成 — 数据源: daily/*.json
// 请勿手动修改，使用 build_data.py 重新生成

const dataAll = [
  {
    "meta": {
      "system": "五维三层市场分析系统 v3.2",
      "date": "2026-07-06",
      "signal_id": "SIG-20260706-001",
      "version": "3.2"
    },
    "market_variables_top3": [
      "科创50暴跌-7.7%，半导体算力硬件产业链大幅回调",
      "上证跌破4100点，深成指/创业板暴跌",
      "全市场超5000只个股下跌，恐慌情绪蔓延"
    ],
    "five_dimensions": {
      "macro": {
        "name": "宏观",
        "score": 2,
        "max": 10,
        "bias": "偏空",
        "detail": "上证-2.03%跌破4100，深成指-3.85%/创业板-5.71%，全面暴跌"
      },
      "micro": {
        "name": "微观",
        "score": 2,
        "max": 10,
        "bias": "全面调整",
        "detail": "科创50暴跌-7.7%，半导体、算力、存储全线下挫；仅超硬材料/黄金逆势"
      },
      "peripheral": {
        "name": "外围",
        "score": 3,
        "max": 10,
        "bias": "偏空",
        "detail": "美股科技股调整传导，亚太市场情绪受压"
      },
      "internal": {
        "name": "内围",
        "score": 2,
        "max": 10,
        "bias": "失血",
        "detail": "全市场恐慌抛售，主力资金大幅净流出，融资盘踩踏"
      },
      "style": {
        "name": "风格",
        "score": 2,
        "max": 10,
        "bias": "无差别杀跌",
        "detail": "成长价值双杀，科技蓝筹普跌；无明显风格偏好"
      }
    },
    "summary": {
      "avg_score": 2.2,
      "beating_index": 80.0,
      "stage": "暴跌期",
      "stage_desc": "利空集中释放，全市场恐慌性杀跌"
    },
    "prediction_verify": {
      "source": "前序预测",
      "content": "科技板块短期承压，注意风险",
      "actual": "科创50暴跌-7.7%，验证悲观预期",
      "result": "correct"
    },
    "model_learning": {
      "lessons": [
        "高位科技板块回调幅度远超预期，需加强风险预警",
        "利空半衰期模型启动：暴跌当日为最坏时刻"
      ],
      "weight_adjustments": {
        "risk_warning": "+1.5",
        "time_decay": "+1.0"
      }
    },
    "next_day_prediction": {
      "direction": "探底企稳",
      "confidence": 55,
      "reason": "暴跌后次日通常有技术性反弹"
    },
    "sector_heat": {
      "半导体": 0,
      "AI算力": 0,
      "新能源": 0,
      "消费": 1.2,
      "金融": 2.7,
      "医药": 6.2,
      "军工": 6.7,
      "周期": 9.2
    },
    "capital_flow": {
      "inflow": [
        {
          "name": "黄金",
          "amount": 28.5
        },
        {
          "name": "超硬材料",
          "amount": 12.3
        },
        {
          "name": "银行",
          "amount": 8.7
        }
      ],
      "outflow": [
        {
          "name": "半导体",
          "amount": -156.2
        },
        {
          "name": "AI算力",
          "amount": -98.5
        },
        {
          "name": "消费电子",
          "amount": -67.3
        }
      ]
    },
    "stock_picks": [
      {
        "code": "000100.SZ",
        "name": "TCL科技",
        "signal": "观望",
        "score": 3.5,
        "reason": "主升浪后洗盘，等待缩量止跌信号"
      },
      {
        "code": "688981.SH",
        "name": "中芯国际",
        "signal": "回避",
        "score": 2.0,
        "reason": "半导体板块暴跌，短期回避"
      },
      {
        "code": "601899.SH",
        "name": "紫金矿业",
        "signal": "关注",
        "score": 6.5,
        "reason": "黄金避险属性，资金流入"
      }
    ]
  },
  {
    "meta": {
      "system": "五维三层市场分析系统 v3.2",
      "date": "2026-07-07",
      "signal_id": "SIG-20260707-001",
      "version": "3.2"
    },
    "market_variables_top3": [
      "大盘下探4000点关口，市场寻底",
      "科创50连续3日微涨企稳，科技板块止跌信号",
      "深成指/创业板持续走弱，资金向主板集中"
    ],
    "five_dimensions": {
      "macro": {
        "name": "宏观",
        "score": 3,
        "max": 10,
        "bias": "偏空",
        "detail": "上证-1.26%下探4000点，但科创50微涨+0.27%止跌；外围暂无新增利空"
      },
      "micro": {
        "name": "微观",
        "score": 5,
        "max": 10,
        "bias": "结构性机会",
        "detail": "大盘调整但科技板块初步止跌；深成指-1.24%/创业板-0.94%仍弱"
      },
      "peripheral": {
        "name": "外围",
        "score": 4,
        "max": 10,
        "bias": "中性偏弱",
        "detail": "外围市场平稳，亚太情绪缓和"
      },
      "internal": {
        "name": "内围",
        "score": 3,
        "max": 10,
        "bias": "失血",
        "detail": "上证缩量跌至3990，量能萎缩至5144亿；科创放量止跌"
      },
      "style": {
        "name": "风格",
        "score": 5,
        "max": 10,
        "bias": "均衡",
        "detail": "科技成长初步企稳，价值蓝筹补跌；风格向成长倾斜"
      }
    },
    "summary": {
      "avg_score": 4.0,
      "beating_index": 60.0,
      "stage": "寻底期",
      "stage_desc": "大盘调整但科技先行企稳，市场处于寻底阶段"
    },
    "prediction_verify": {
      "source": "SIG-20260706",
      "content": "暴跌后次日技术性反弹",
      "actual": "上证继续下跌-1.26%，预测部分错误",
      "result": "partial"
    },
    "model_learning": {
      "lessons": [
        "暴跌次日不反弹，说明抛压未完全释放",
        "科创50领先企稳，可作为先行指标"
      ],
      "weight_adjustments": {
        "leading_index": "+0.5",
        "rebound_timing": "-0.3"
      }
    },
    "next_day_prediction": {
      "direction": "继续筑底",
      "confidence": 50,
      "reason": "科创50三连阳，但主板仍弱，分化加剧"
    },
    "sector_heat": {
      "半导体": 0,
      "AI算力": 1,
      "新能源": 0.5,
      "消费": 4,
      "金融": 6.5,
      "医药": 5,
      "军工": 8.5,
      "周期": 8
    },
    "capital_flow": {
      "inflow": [
        {
          "name": "半导体",
          "amount": 15.2
        },
        {
          "name": "科创50ETF",
          "amount": 8.6
        },
        {
          "name": "黄金",
          "amount": 5.3
        }
      ],
      "outflow": [
        {
          "name": "银行",
          "amount": -32.1
        },
        {
          "name": "地产",
          "amount": -18.5
        },
        {
          "name": "保险",
          "amount": -12.7
        }
      ]
    },
    "stock_picks": [
      {
        "code": "000100.SZ",
        "name": "TCL科技",
        "signal": "观望",
        "score": 4.0,
        "reason": "洗盘持续，量能未缩至地量"
      },
      {
        "code": "688981.SH",
        "name": "中芯国际",
        "signal": "关注",
        "score": 5.0,
        "reason": "科创50止跌，半导体或有修复"
      },
      {
        "code": "688012.SH",
        "name": "中微公司",
        "signal": "关注",
        "score": 5.5,
        "reason": "科技板块先行企稳信号"
      }
    ]
  },
  {
    "meta": {
      "system": "五维三层市场分析系统 v3.2",
      "date": "2026-07-08",
      "signal_id": "SIG-20260708-001",
      "version": "3.2"
    },
    "market_variables_top3": [
      "深成指/创业板加速下行，创阶段新低",
      "科创50三连阳逆势走强，资金持续流入科技",
      "上证逼近3970，市场恐慌情绪蔓延"
    ],
    "five_dimensions": {
      "macro": {
        "name": "宏观",
        "score": 5,
        "max": 10,
        "bias": "中性",
        "detail": "上证-0.49%续跌，深成指-1.87%/创业板-1.70%加速下行"
      },
      "micro": {
        "name": "微观",
        "score": 5,
        "max": 10,
        "bias": "结构性机会",
        "detail": "科创50+0.73%三连阳，科技板块逆势走强；中小盘承压"
      },
      "peripheral": {
        "name": "外围",
        "score": 4,
        "max": 10,
        "bias": "中性偏弱",
        "detail": "外围平稳，A股内部调整为主"
      },
      "internal": {
        "name": "内围",
        "score": 5,
        "max": 10,
        "bias": "震荡",
        "detail": "上证缩量至4962亿，科创放量至1572亿；资金从主板向科创迁移"
      },
      "style": {
        "name": "风格",
        "score": 5,
        "max": 10,
        "bias": "均衡",
        "detail": "科技成长三连阳，价值蓝筹持续调整；风格切换明显"
      }
    },
    "summary": {
      "avg_score": 4.8,
      "beating_index": 52.0,
      "stage": "筑底期",
      "stage_desc": "科技先行筑底，主板持续寻底，分化加剧"
    },
    "prediction_verify": {
      "source": "SIG-20260707",
      "content": "继续筑底，分化加剧",
      "actual": "科创50三连阳，主板续跌，分化验证",
      "result": "correct"
    },
    "model_learning": {
      "lessons": [
        "科创50三连阳确认领先性，资金向科技迁移",
        "风格切换信号明确：主板→科创"
      ],
      "weight_adjustments": {
        "style_rotation": "+1.0",
        "leading_index": "+0.8"
      }
    },
    "next_day_prediction": {
      "direction": "科技修复",
      "confidence": 60,
      "reason": "科创50三连阳，AI硬件板块3个交易日内存在情绪修复反弹"
    },
    "sector_heat": {
      "半导体": 1.3,
      "AI算力": 1.8,
      "新能源": 3.3,
      "消费": 2.8,
      "金融": 7.3,
      "医药": 9.8,
      "军工": 9.3,
      "周期": 10
    },
    "capital_flow": {
      "inflow": [
        {
          "name": "半导体",
          "amount": 42.8
        },
        {
          "name": "AI算力",
          "amount": 28.5
        },
        {
          "name": "先进封装",
          "amount": 18.3
        }
      ],
      "outflow": [
        {
          "name": "银行",
          "amount": -28.6
        },
        {
          "name": "白酒",
          "amount": -15.2
        },
        {
          "name": "地产",
          "amount": -11.8
        }
      ]
    },
    "stock_picks": [
      {
        "code": "000100.SZ",
        "name": "TCL科技",
        "signal": "关注",
        "score": 5.0,
        "reason": "洗盘进入尾声，关注量能变化"
      },
      {
        "code": "688981.SH",
        "name": "中芯国际",
        "signal": "看多",
        "score": 7.0,
        "reason": "科创50三连阳，半导体资金持续流入"
      },
      {
        "code": "002371.SZ",
        "name": "北方华创",
        "signal": "看多",
        "score": 6.5,
        "reason": "半导体设备龙头，资金净流入"
      }
    ]
  },
  {
    "meta": {
      "system": "五维三层市场分析系统 v3.2",
      "date": "2026-07-09",
      "signal_id": "SIG-20260709-001",
      "version": "3.2"
    },
    "market_variables_top3": [
      "科创50暴涨+8.41%，AI硬件板块情绪修复",
      "三大指数全面大涨，市场信心恢复",
      "量能显著放大至2.93万亿，增量资金入场"
    ],
    "five_dimensions": {
      "macro": {
        "name": "宏观",
        "score": 7,
        "max": 10,
        "bias": "偏多",
        "detail": "上证大涨+1.65%收复4000点报4036.59，深成指+3.07%/创业板+4.49%，全面修复"
      },
      "micro": {
        "name": "微观",
        "score": 8,
        "max": 10,
        "bias": "科技爆发",
        "detail": "科创50暴涨+8.41%创阶段最大单日涨幅；半导体全线爆发，中芯国际涨超14%"
      },
      "peripheral": {
        "name": "外围",
        "score": 6,
        "max": 10,
        "bias": "中性偏强",
        "detail": "美股芯片股普涨，应用材料涨近10%；SK海力士ADR定价催化全球半导体情绪"
      },
      "internal": {
        "name": "内围",
        "score": 7,
        "max": 10,
        "bias": "承接",
        "detail": "上证放量至5530亿，科创放量至2245亿；增量资金入场，主力资金回流半导体"
      },
      "style": {
        "name": "风格",
        "score": 7,
        "max": 10,
        "bias": "科技成长",
        "detail": "科技成长暴力反弹，双创领涨；风格切换至成长确认，长鑫科技申购催化"
      }
    },
    "summary": {
      "avg_score": 6.4,
      "beating_index": 36.0,
      "stage": "修复期",
      "stage_desc": "科技板块暴力修复，市场从筑底转向反弹"
    },
    "prediction_verify": {
      "source": "SIG-20260708 P4",
      "content": "AI硬件板块3个交易日内存在情绪修复反弹",
      "actual": "7/9科创50暴涨+8.41%，3日累计涨幅+9.45%，预测完全验证",
      "result": "correct"
    },
    "model_learning": {
      "lessons": [
        "利空半衰期模型有效：7/2暴跌→7/6企稳→7/9修复，完整3日周期",
        "A股对美股利空的脱敏能力强于预期：7/6当日即反弹",
        "科创50领先性确认：7/7-7/8三连阳领先主板见底"
      ],
      "weight_adjustments": {
        "time_decay": "+1.0（3日修复窗口验证有效，延长权重）",
        "leading_index": "+0.8（科创50领先上证1-2日，提高权重）",
        "internal_resilience": "+0.5（A股内生性韧性被持续低估）"
      }
    },
    "next_day_prediction": {
      "direction": "震荡分化",
      "confidence": 55,
      "reason": "暴涨次日通常分化，关注半导体持续性；上证4036点压力需消化"
    },
    "sector_heat": {
      "半导体": 3.5,
      "AI算力": 6,
      "新能源": 7.5,
      "消费": 6,
      "金融": 9.5,
      "医药": 9,
      "军工": 10,
      "周期": 10
    },
    "capital_flow": {
      "inflow": [
        {
          "name": "半导体",
          "amount": 128.5
        },
        {
          "name": "AI算力",
          "amount": 86.3
        },
        {
          "name": "中芯国际",
          "amount": 45.2
        },
        {
          "name": "先进封装",
          "amount": 38.7
        }
      ],
      "outflow": [
        {
          "name": "银行",
          "amount": -22.1
        },
        {
          "name": "白酒",
          "amount": -8.5
        },
        {
          "name": "保险",
          "amount": -6.3
        }
      ]
    },
    "stock_picks": [
      {
        "code": "000100.SZ",
        "name": "TCL科技",
        "signal": "看多",
        "score": 6.5,
        "reason": "市场情绪全面修复，科技股普涨"
      },
      {
        "code": "688981.SH",
        "name": "中芯国际",
        "signal": "强烈看多",
        "score": 8.5,
        "reason": "暴涨14%，半导体情绪全面爆发"
      },
      {
        "code": "601138.SH",
        "name": "工业富联",
        "signal": "强烈看多",
        "score": 8.0,
        "reason": "业绩预增100%，算力板块龙头"
      }
    ]
  },
  {
    "meta": {
      "system": "五维三层市场分析系统 v3.2",
      "date": "2026-07-10",
      "signal_id": "SIG-20260710-001",
      "version": "3.2"
    },
    "market_variables_top3": [
      "沪指跌破4000点收-1.00%，深成指暴跌-2.29%，但全市场涨多跌少呈现指数与个股背离",
      "商业航天历史性突破：长征十号乙运载火箭一子级可控回收成功，板块集体暴涨",
      "医药生物爆发成当日最强主线：CRO概念指数大涨超8%，板块获超百亿主力资金净流入"
    ],
    "five_dimensions": {
      "macro": {
        "name": "宏观",
        "score": 6,
        "max": 10,
        "bias": "中性偏弱",
        "detail": "沪指跌破4000点收3996.16（-1.00%），深成指暴跌-2.29%，创业板指跌约-1.70%，主要指数全线收跌。但全市场约3554只个股上涨、仅1635只下跌，呈现典型的指数跌个股涨的背离格局。两市成交额维持3.39万亿高位，流动性充裕。半年报业绩预告披露223家、预喜率约87%，基本面提供支撑。"
      },
      "micro": {
        "name": "微观",
        "score": 7,
        "max": 10,
        "bias": "结构性活跃",
        "detail": "板块剧烈分化。医药生物成最强主线，CRO概念大涨超8%，双鹭药业涨停封单近30万手，板块获超百亿主力资金净流入。商业航天见证历史，长征十号乙成功实现一子级可控回收，6大卫星ETF集体涨停。算力龙头浪潮信息两连板创新高，先进封装板块高开。但能源金属、机器人板块跌幅居前，科技内部高低切换明显。"
      },
      "peripheral": {
        "name": "外围",
        "score": 5,
        "max": 10,
        "bias": "中性",
        "detail": "外围环境平稳。美股芯片股近期维持震荡，费城半导体指数上半年累计涨幅超101%后进入高位整理。SK海力士ADS定价、应用材料等业绩向好支撑全球半导体基本面。美联储2026年预计再降息1-2次，政策预期稳定。中美关税谈判暂无新变数，外围对A股影响中性。"
      },
      "internal": {
        "name": "内围",
        "score": 6,
        "max": 10,
        "bias": "分化",
        "detail": "主力资金全天净流出397.91亿，其中超大单净流出290.98亿、大单净流出106.94亿，机构资金明显撤离。但中单净流入64.26亿、小单净流入333.66亿，散户和游资情绪活跃，承接力较强。板块资金流向极度分化：医药生物获超百亿净流入，而能源金属、机器人等前期热门板块遭大幅抛售。量能维持3.39万亿，高成交说明市场参与度仍高。"
      },
      "style": {
        "name": "风格",
        "score": 7,
        "max": 10,
        "bias": "题材驱动",
        "detail": "市场风格由纯科技成长转向题材驱动+事件催化。商业航天（政策/技术突破）、医药生物（业绩/避险）双主线并行，软件开发和IT服务也表现活跃。双创内部剧烈分化：半导体/算力延续强势，但机器人/能源金属回调。指数权重（金融、周期）拖累大盘，而中小盘题材股活跃，市场呈现\"轻指数重个股\"特征。"
      }
    },
    "summary": {
      "avg_score": 6.2,
      "beating_index": 42.0,
      "stage": "修复期",
      "stage_desc": "指数回调但个股活跃，结构性行情延续，题材与事件驱动为主"
    },
    "prediction_verify": {
      "source": "SIG-20260709",
      "content": "暴涨次日通常分化，关注半导体持续性；上证4036点压力需消化",
      "actual": "7/10沪指跌破4000点收-1.00%，深成指-2.29%，但个股涨多跌少，半导体/算力延续强势、医药/航天爆发，分化预测验证",
      "result": "partial"
    },
    "model_learning": {
      "lessons": [
        "暴涨次日分化规律验证：7/9科创50暴涨+8.41%→7/10指数回调，但题材接力维持热度",
        "指数与个股背离信号需重视：沪指跌1%但个股涨多跌少，说明权重股抛压而非系统性风险",
        "事件驱动型题材的爆发力超预期：商业航天技术突破可催生板块涨停潮",
        "医药生物在指数调整期具备避险+业绩双击属性，可作为防御性配置"
      ],
      "weight_adjustments": {
        "index_breadth_divergence": "+1.0（指数与个股背离信号有效性确认）",
        "event_driven_momentum": "+0.8（重大技术/政策事件对题材板块的催化权重提升）",
        "pharma_defensive": "+0.5（医药在调整期的避险价值被低估）"
      }
    },
    "next_day_prediction": {
      "direction": "震荡修复",
      "confidence": 58,
      "reason": "沪指3996点接近4000整数关口存在技术性支撑，医药和商业航天高潮后预计分化，关注半导体/算力能否持续引领。个股情绪仍活跃，结构性机会持续。"
    },
    "sector_heat": {
      "半导体": 5.5,
      "AI算力": 4.8,
      "商业航天": 2.0,
      "医药生物": 2.5,
      "新能源": 6.5,
      "消费": 7.5,
      "金融": 8.5,
      "周期": 9.0
    },
    "capital_flow": {
      "inflow": [
        {
          "name": "医药生物",
          "amount": 115.3
        },
        {
          "name": "商业航天",
          "amount": 68.5
        },
        {
          "name": "软件开发",
          "amount": 42.7
        },
        {
          "name": "IT服务",
          "amount": 35.2
        }
      ],
      "outflow": [
        {
          "name": "能源金属",
          "amount": -58.6
        },
        {
          "name": "机器人",
          "amount": -45.3
        },
        {
          "name": "银行",
          "amount": -32.1
        }
      ]
    },
    "stock_picks": [
      {
        "code": "688981.SH",
        "name": "中芯国际",
        "signal": "看多",
        "score": 7.0,
        "reason": "半导体主线延续，长鑫上市在即催化产业链"
      },
      {
        "code": "002001.SZ",
        "name": "双鹭药业",
        "signal": "关注",
        "score": 6.5,
        "reason": "医药板块爆发龙头，但涨停后需警惕分化"
      },
      {
        "code": "000100.SZ",
        "name": "TCL科技",
        "signal": "关注",
        "score": 6.0,
        "reason": "面板+半导体双主业，调整中关注承接力度"
      }
    ]
  }
];

const dates = ["2026-07-06", "2026-07-07", "2026-07-08", "2026-07-09", "2026-07-10"];

const fiveDimAvg = [4.6, 5.4, 4.4, 4.6, 5.2];

const sectors = ["半导体", "AI算力", "新能源", "消费", "金融", "医药", "军工", "周期"];

const sectorHeat = {"2026-07-06": [0, 0, 0, 1.2, 2.7, 6.2, 6.7, 9.2], "2026-07-07": [0, 1, 0.5, 4, 6.5, 5, 8.5, 8], "2026-07-08": [1.3, 1.8, 3.3, 2.8, 7.3, 9.8, 9.3, 10], "2026-07-09": [3.5, 6, 7.5, 6, 9.5, 9, 10, 10], "2026-07-10": [5.5, 4.8, 6.5, 7.5, 8.5, 0, 0, 9.0]};

const fiveDimHistory = {"2026-07-06": [2, 2, 3, 2, 2], "2026-07-07": [3, 5, 4, 3, 5], "2026-07-08": [5, 5, 4, 5, 5], "2026-07-09": [7, 8, 6, 7, 7], "2026-07-10": [6, 7, 5, 6, 7]};

const capitalFlowHistory = {"2026-07-06": {"inflow": [{"name": "黄金", "amount": 28.5}, {"name": "超硬材料", "amount": 12.3}, {"name": "银行", "amount": 8.7}], "outflow": [{"name": "半导体", "amount": -156.2}, {"name": "AI算力", "amount": -98.5}, {"name": "消费电子", "amount": -67.3}]}, "2026-07-07": {"inflow": [{"name": "半导体", "amount": 15.2}, {"name": "科创50ETF", "amount": 8.6}, {"name": "黄金", "amount": 5.3}], "outflow": [{"name": "银行", "amount": -32.1}, {"name": "地产", "amount": -18.5}, {"name": "保险", "amount": -12.7}]}, "2026-07-08": {"inflow": [{"name": "半导体", "amount": 42.8}, {"name": "AI算力", "amount": 28.5}, {"name": "先进封装", "amount": 18.3}], "outflow": [{"name": "银行", "amount": -28.6}, {"name": "白酒", "amount": -15.2}, {"name": "地产", "amount": -11.8}]}, "2026-07-09": {"inflow": [{"name": "半导体", "amount": 128.5}, {"name": "AI算力", "amount": 86.3}, {"name": "中芯国际", "amount": 45.2}, {"name": "先进封装", "amount": 38.7}], "outflow": [{"name": "银行", "amount": -22.1}, {"name": "白酒", "amount": -8.5}, {"name": "保险", "amount": -6.3}]}, "2026-07-10": {"inflow": [{"name": "医药生物", "amount": 115.3}, {"name": "商业航天", "amount": 68.5}, {"name": "软件开发", "amount": 42.7}, {"name": "IT服务", "amount": 35.2}], "outflow": [{"name": "能源金属", "amount": -58.6}, {"name": "机器人", "amount": -45.3}, {"name": "银行", "amount": -32.1}]}};

const stockPicksHistory = {"2026-07-06": [{"code": "000100.SZ", "name": "TCL科技", "signal": "观望", "score": 3.5, "reason": "主升浪后洗盘，等待缩量止跌信号"}, {"code": "688981.SH", "name": "中芯国际", "signal": "回避", "score": 2.0, "reason": "半导体板块暴跌，短期回避"}, {"code": "601899.SH", "name": "紫金矿业", "signal": "关注", "score": 6.5, "reason": "黄金避险属性，资金流入"}], "2026-07-07": [{"code": "000100.SZ", "name": "TCL科技", "signal": "观望", "score": 4.0, "reason": "洗盘持续，量能未缩至地量"}, {"code": "688981.SH", "name": "中芯国际", "signal": "关注", "score": 5.0, "reason": "科创50止跌，半导体或有修复"}, {"code": "688012.SH", "name": "中微公司", "signal": "关注", "score": 5.5, "reason": "科技板块先行企稳信号"}], "2026-07-08": [{"code": "000100.SZ", "name": "TCL科技", "signal": "关注", "score": 5.0, "reason": "洗盘进入尾声，关注量能变化"}, {"code": "688981.SH", "name": "中芯国际", "signal": "看多", "score": 7.0, "reason": "科创50三连阳，半导体资金持续流入"}, {"code": "002371.SZ", "name": "北方华创", "signal": "看多", "score": 6.5, "reason": "半导体设备龙头，资金净流入"}], "2026-07-09": [{"code": "000100.SZ", "name": "TCL科技", "signal": "看多", "score": 6.5, "reason": "市场情绪全面修复，科技股普涨"}, {"code": "688981.SH", "name": "中芯国际", "signal": "强烈看多", "score": 8.5, "reason": "暴涨14%，半导体情绪全面爆发"}, {"code": "601138.SH", "name": "工业富联", "signal": "强烈看多", "score": 8.0, "reason": "业绩预增100%，算力板块龙头"}], "2026-07-10": [{"code": "688981.SH", "name": "中芯国际", "signal": "看多", "score": 7.0, "reason": "半导体主线延续，长鑫上市在即催化产业链"}, {"code": "002001.SZ", "name": "双鹭药业", "signal": "关注", "score": 6.5, "reason": "医药板块爆发龙头，但涨停后需警惕分化"}, {"code": "000100.SZ", "name": "TCL科技", "signal": "关注", "score": 6.0, "reason": "面板+半导体双主业，调整中关注承接力度"}]};

const weeklyReviews = {};

const dimNames = ["宏观", "微观", "外围", "内围", "风格"];

const dimKeys = ["macro", "micro", "peripheral", "internal", "style"];

const colorPalette = ["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#06b6d4","#f97316"];
