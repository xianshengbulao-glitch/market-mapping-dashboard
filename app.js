
let currentDate = dates[dates.length - 1];
let currentData = dataAll[dataAll.length - 1];
function getDataByDate(date) {
  const idx = dates.indexOf(date);
  return idx >= 0 ? dataAll[idx] : dataAll[3];
}
function getPrevData(date) {
  const idx = dates.indexOf(date);
  return idx > 0 ? dataAll[idx-1] : null;
}
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
    setTimeout(() => {
      if(btn.dataset.tab === 'overview') { initRadar(); renderOverview(); }
      if(btn.dataset.tab === 'verify') { initVerifyChart(); initAccuracyTrend(); }
      if(btn.dataset.tab === 'strategy') { initStrategyChart(); }
      if(btn.dataset.tab === 'history') { initBeatingChart(); initSectorHeat(); initFiveDimTrend(); initSentimentChart(); }
      if(btn.dataset.tab === 'capital') { initCapitalChart(); renderCapital(); }
      if(btn.dataset.tab === 'stocks') { initStocksChart(); renderStocks(); }
      if(btn.dataset.tab === 'weekly') { renderWeekly(); }
      if(btn.dataset.tab === 'model') { initAccuracyPie(); initDimCompare(); }
      requestAnimationFrame(() => {
        if(radarChartInst) radarChartInst.resize();
        if(verifyChartInst) verifyChartInst.resize();
        if(strategyChartInst) strategyChartInst.resize();
        if(beatingChartInst) beatingChartInst.resize();
        if(sectorHeatInst) sectorHeatInst.resize();
        if(fiveDimTrendInst) fiveDimTrendInst.resize();
        if(accuracyPieInst) accuracyPieInst.resize();
      });
    }, 300);
  });
});
document.getElementById('dateSelect').addEventListener('change', e => {
  currentDate = e.target.value;
  currentData = getDataByDate(currentDate);
  renderOverview();
  renderEngine();
  renderVerify();
  renderStrategy();
  renderCapital();
  renderStocks();
  renderWeekly();
  renderModel();
  initRadar();
});
function renderOverview() {
  const s = currentData.summary;
  const prev = getPrevData(currentDate);
  document.getElementById('kpi-score').textContent = s.avg_score;
  document.getElementById('kpi-beating').textContent = s.beating_index + '%';
  document.getElementById('kpi-stage').textContent = s.stage;
  document.getElementById('kpi-stage-desc').textContent = s.stage_desc;
  const deltaScore = prev ? (s.avg_score - prev.summary.avg_score).toFixed(1) : '0';
  const deltaBeating = prev ? (s.beating_index - prev.summary.beating_index).toFixed(0) : '0';
  const sdEl = document.getElementById('kpi-score-delta');
  sdEl.textContent = prev ? `较昨日 ${deltaScore > 0 ? '+' : ''}${deltaScore}` : '首日';
  sdEl.className = 'kpi-delta ' + (deltaScore > 0 ? 'positive' : deltaScore < 0 ? 'negative' : 'neutral');
  const bdEl = document.getElementById('kpi-beating-delta');
  bdEl.textContent = prev ? `较昨日 ${deltaBeating > 0 ? '+' : ''}${deltaBeating}%` : '首日';
  bdEl.className = 'kpi-delta ' + (deltaBeating < 0 ? 'positive' : deltaBeating > 0 ? 'negative' : 'neutral');
  const bars = document.getElementById('fiveDimBars');
  bars.innerHTML = '';
  dimKeys.forEach((k, i) => {
    const d = currentData.five_dimensions[k];
    const pct = (d.score / d.max * 100).toFixed(0);
    const colors = ["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6"];
    const row = document.createElement('div');
    row.className = 'bar-row';
    row.innerHTML = `<div class="bar-label">${d.name}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${colors[i]}"></div>
      <div class="bar-val">${d.score}/${d.max}</div></div>`;
    bars.appendChild(row);
  });
  const core = document.getElementById('coreVariables');
  core.innerHTML = '<ul class="monitor-list">' +
    currentData.market_variables_top3.map(v => `<li>${v}</li>`).join('') + '</ul>';
  let correct = 0, partial = 0, wrong = 0;
  dataAll.forEach(d => {
    const r = d.prediction_verify.result;
    if (r === 'correct') correct++;
    else if (r === 'partial') partial++;
    else if (r === 'wrong') wrong++;
  });
  const total = correct + partial + wrong;
  const accuracy = total > 0 ? Math.round((correct + partial * 0.5) / total * 100) : 0;
  document.getElementById('kpi-accuracy').textContent = accuracy + '%';
  document.getElementById('kpi-accuracy-detail').textContent = `${correct}正确 / ${partial}部分 / ${wrong}错误`;
  const timeline = document.getElementById('stageTimeline');
  timeline.innerHTML = '';
  const stages = ['暴跌期', '寻底期', '筑底期', '修复期'];
  const stageColors = {'暴跌期': '#ef4444', '寻底期': '#f59e0b', '筑底期': '#8b5cf6', '修复期': '#10b981'};
  const stageIdx = stages.indexOf(s.stage);
  stages.forEach((st, i) => {
    const div = document.createElement('div');
    div.style.cssText = `display:inline-flex;align-items:center;gap:8px;padding:10px 18px;margin:4px;border-radius:8px;font-size:14px;font-weight:500;transition:all 0.3s;`;
    if (i === stageIdx) {
      div.style.background = `rgba(${stageColors[st].slice(1).match(/.{2}/g).map(h=>parseInt(h,16)).join(',')},0.2)`;
      div.style.color = stageColors[st];
      div.style.border = `1px solid ${stageColors[st]}`;
      div.innerHTML = `<span style="font-size:18px">●</span> ${st} (当前)`;
    } else if (i < stageIdx) {
      div.style.background = 'rgba(30,41,59,0.5)';
      div.style.color = '#64748b';
      div.style.border = '1px solid var(--border)';
      div.innerHTML = `<span style="font-size:18px;color:#10b981">✓</span> ${st}`;
    } else {
      div.style.background = 'rgba(30,41,59,0.3)';
      div.style.color = '#475569';
      div.style.border = '1px solid var(--border)';
      div.innerHTML = `<span style="font-size:18px">○</span> ${st}`;
    }
    timeline.appendChild(div);
  });
  const thermo = document.getElementById('thermometerBars');
  thermo.innerHTML = '';
  const thermoItems = [
    {label: '恐慌/贪婪', score: currentData.summary.avg_score, max: 10, colors: ['#ef4444','#f59e0b','#10b981']},
    {label: '承压程度', score: currentData.summary.beating_index/10, max: 10, colors: ['#10b981','#f59e0b','#ef4444']},
    {label: '科技热度', score: currentData.five_dimensions.micro.score, max: 10, colors: ['#3b82f6','#8b5cf6','#ec4899']},
    {label: '资金承接', score: currentData.five_dimensions.internal.score, max: 10, colors: ['#ef4444','#f59e0b','#10b981']}
  ];
  thermoItems.forEach(item => {
    const pct = (item.score / item.max * 100).toFixed(0);
    const color = item.score >= 7 ? item.colors[2] : item.score >= 4 ? item.colors[1] : item.colors[0];
    const row = document.createElement('div');
    row.className = 'bar-row';
    row.innerHTML = `<div class="bar-label">${item.label}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${color}"></div>
      <div class="bar-val">${item.score.toFixed(1)}</div></div>`;
    thermo.appendChild(row);
  });
}
let gaugeChartInst = null;
function initGauge() {
  const dom = document.getElementById('gaugeChart');
  if(!dom) return;
  if(gaugeChartInst) { gaugeChartInst.dispose(); }
  gaugeChartInst = echarts.init(dom);
  const score = currentData.summary.avg_score;
  const option = {
    backgroundColor:'#111827', textStyle:{color:'#e2e8f0'},
    series:[{
      type:'gauge',
      startAngle:180, endAngle:0,
      min:0, max:10,
      splitNumber:10,
      axisLine:{lineStyle:{width:20,color:[[0.3,'#ef4444'],[0.6,'#f59e0b'],[1,'#10b981']]}},
      pointer:{length:'55%',width:6},
      axisTick:{distance:-20,length:8,lineStyle:{color:'#fff'}},
      splitLine:{distance:-20,length:20,lineStyle:{color:'#fff'}},
      axisLabel:{distance:-15,color:'#e2e8f0',fontSize:12},
      detail:{valueAnimation:true,formatter:'{value}',color:'#e2e8f0',fontSize:28,fontWeight:'bold',offsetCenter:[0,'60%']},
      data:[{value:score, name:'五维评分'}]
    }]
  };
  gaugeChartInst.setOption(option);
}
function initThermometer() {
}
let radarChartInst = null;
function initRadar() {
  const dom = document.getElementById('radarChart');
  if(!dom) return;
  if(radarChartInst) { radarChartInst.dispose(); }
  radarChartInst = echarts.init(dom);
  const d = currentData.five_dimensions;
  const vals = dimKeys.map(k => d[k].score);
  const option = {
    backgroundColor:'#111827',
    textStyle:{color:'#e2e8f0'},
    tooltip:{trigger:'item'},
    radar:{
      indicator:dimNames.map((n,i) => ({name:n, max:10})),
      axisName:{color:'#e2e8f0'},
      splitArea:{areaStyle:{color:['rgba(30,41,59,.5)','rgba(17,24,39,.8)']}},
      axisLine:{lineStyle:{color:'#334155'}},
      splitLine:{lineStyle:{color:'#334155'}}
    },
    series:[{
      type:'radar',
      data:[{
        value:vals,
        name:currentDate,
        areaStyle:{color:'rgba(59,130,246,.25)'},
        lineStyle:{color:'#3b82f6',width:2},
        itemStyle:{color:'#3b82f6'}
      }]
    }]
  };
  radarChartInst.setOption(option);
}
function renderEngine() {
  const ov = document.getElementById('engineOverview');
  ov.innerHTML = '';
  dimKeys.forEach(k => {
    const d = currentData.five_dimensions[k];
    const pct = (d.score / d.max * 100).toFixed(0);
    const scoreClass = d.score >= 7 ? 'score-high' : d.score >= 4 ? 'score-mid' : 'score-low';
    const row = document.createElement('div');
    row.className = 'derivation-path';
    row.innerHTML = `
      <span class="score-badge ${scoreClass}">${d.score}</span>
      <span style="font-weight:600;min-width:60px">${d.name}</span>
      <span class="derivation-arrow">→</span>
      <span style="color:var(--muted)">${d.bias}</span>
      <span class="derivation-arrow">→</span>
      <span style="flex:1">${d.detail}</span>
    `;
    ov.appendChild(row);
  });
  const deep = document.getElementById('engineDeep');
  deep.innerHTML = '';
  dimKeys.forEach(k => {
    const d = currentData.five_dimensions[k];
    const box = document.createElement('div');
    box.className = 'factor-item';
    const scoreClass = d.score >= 7 ? 'score-high' : d.score >= 4 ? 'score-mid' : 'score-low';
    box.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="factor-title">${d.name}</div>
        <span class="score-badge ${scoreClass}">${d.score}</span>
      </div>
      <div class="factor-desc">${d.detail}</div>
      <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
        <span class="weight-chip">偏向: ${d.bias}</span>
        <span class="weight-chip">满分: ${d.max}</span>
        <span class="weight-chip">得分率: ${(d.score/d.max*100).toFixed(0)}%</span>
      </div>
    `;
    deep.appendChild(box);
  });
  deep.className = 'factor-grid';
  const mapping = document.getElementById('engineMapping');
  mapping.innerHTML = '';
  currentData.market_variables_top3.forEach((v, i) => {
    const map = document.createElement('div');
    map.className = 'derivation-path';
    map.innerHTML = `
      <span style="background:var(--accent);color:#fff;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:600">变量${i+1}</span>
      <span style="flex:1">${v}</span>
      <span class="derivation-arrow">→</span>
      <span style="color:var(--muted)">影响维度</span>
    `;
    mapping.appendChild(map);
  });
  const mapNote = document.createElement('div');
  mapNote.style.cssText = 'margin-top:12px;padding:12px;background:rgba(59,130,246,0.06);border-radius:8px;font-size:13px;color:#94a3b8;line-height:1.7';
  mapNote.innerHTML = '映射逻辑：核心变量通过传导链影响各维度评分。例如"科创50暴涨"→微观评分↑→科技成长风格↑→整体五维评分↑。每个变量的权重根据其历史验证准确率动态调整。';
  mapping.appendChild(mapNote);
  const pred = document.getElementById('enginePrediction');
  pred.innerHTML = '';
  const nd = currentData.next_day_prediction;
  const predPath = document.createElement('div');
  predPath.className = 'derivation-path';
  predPath.style.cssText = 'background:linear-gradient(145deg, rgba(59,130,246,0.1), rgba(17,24,39,0.8));border:1px solid rgba(59,130,246,0.2);padding:14px 18px;';
  predPath.innerHTML = `
    <span style="font-weight:700;color:var(--accent)">当前状态</span>
    <span class="derivation-arrow">→</span>
    <span>五维评分 ${currentData.summary.avg_score}</span>
    <span class="derivation-arrow">→</span>
    <span>挨打指数 ${currentData.summary.beating_index}%</span>
    <span class="derivation-arrow">→</span>
    <span style="font-weight:700">${nd.direction}</span>
    <span style="color:var(--muted);margin-left:auto">(置信度 ${nd.confidence}%)</span>
  `;
  pred.appendChild(predPath);
  const predReason = document.createElement('div');
  predReason.style.cssText = 'margin-top:10px;font-size:13px;color:#94a3b8;line-height:1.7';
  predReason.textContent = nd.reason;
  pred.appendChild(predReason);
  const wh = document.getElementById('engineWeights');
  wh.innerHTML = '';
  if (currentData.model_learning && currentData.model_learning.weight_adjustments) {
    const wa = currentData.model_learning.weight_adjustments;
    Object.entries(wa).forEach(([k, v]) => {
      const chip = document.createElement('span');
      chip.className = 'weight-chip';
      chip.style.margin = '4px';
      chip.textContent = `${k}: ${v}`;
      wh.appendChild(chip);
    });
  }
  const lessons = document.createElement('div');
  lessons.style.cssText = 'margin-top:14px;font-size:13px;color:#94a3b8;line-height:1.7';
  if (currentData.model_learning && currentData.model_learning.lessons) {
    lessons.innerHTML = '<strong style="color:var(--text)">学习记录：</strong><br>' + currentData.model_learning.lessons.join('<br>');
  }
  wh.appendChild(lessons);
}
function renderVerify() {
  const tbody = document.querySelector('#verifyTable tbody');
  tbody.innerHTML = '';
  dataAll.forEach(d => {
    const pv = d.prediction_verify;
    const tagCls = pv.result === 'correct' ? 'tag-correct' : pv.result === 'partial' ? 'tag-partial' : 'tag-wrong';
    const tagText = pv.result === 'correct' ? '正确' : pv.result === 'partial' ? '部分' : '错误';
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${d.meta.date}</td><td>${pv.content}</td><td>-</td><td>${pv.actual}</td><td><span class="tag ${tagCls}">${tagText}</span></td>`;
    tbody.appendChild(tr);
  });
  const ml = document.getElementById('modelLearning');
  ml.innerHTML = '';
  dataAll.forEach(d => {
    const box = document.createElement('div');
    box.style.cssText = 'margin-bottom:12px;padding:12px;border:1px solid var(--border);border-radius:8px;';
    const wa = d.model_learning.weight_adjustments;
    const waStr = Object.entries(wa).map(([k,v]) => `${k}: ${v}`).join('<br>');
    box.innerHTML = `<strong>${d.meta.date}</strong><br>${d.model_learning.lessons.join('<br>')}<br><em style="color:#94a3b8">权重: ${waStr}</em>`;
    ml.appendChild(box);
  });
}
let verifyChartInst = null;
function initVerifyChart() {
  const dom = document.getElementById('verifyChart');
  if(!dom) return;
  if(verifyChartInst) { verifyChartInst.dispose(); }
  verifyChartInst = echarts.init(dom);
  const results = {correct:0, partial:0, wrong:0};
  dataAll.forEach(d => { if(d.prediction_verify.result) results[d.prediction_verify.result]++; });
  const option = {
    backgroundColor:'#111827', textStyle:{color:'#e2e8f0'},
    tooltip:{trigger:'item'},
    legend:{bottom:10, textStyle:{color:'#e2e8f0'}},
    series:[{
      type:'pie', radius:['45%','70%'], center:['50%','45%'],
      data:[
        {value:results.correct, name:'正确', itemStyle:{color:'#10b981'}},
        {value:results.partial, name:'部分', itemStyle:{color:'#f59e0b'}},
        {value:results.wrong, name:'错误', itemStyle:{color:'#ef4444'}}
      ],
      label:{color:'#e2e8f0',formatter:'{b}: {c} ({d}%)'}
    }]
  };
  verifyChartInst.setOption(option);
}
function renderStrategy() {
  const nd = currentData.next_day_prediction;
  const dir = document.getElementById('strategyDirection');
  dir.innerHTML = `<div style="font-size:24px;font-weight:700;color:var(--accent)">${nd.direction}</div>`;
  const badge = document.getElementById('strategyConfidenceBadge');
  if (badge) {
    badge.textContent = `置信度 ${nd.confidence}%`;
    if (nd.confidence >= 60) badge.style.cssText = 'background:rgba(16,185,129,0.2);color:#34d399';
    else if (nd.confidence >= 45) badge.style.cssText = 'background:rgba(245,158,11,0.2);color:#fbbf24';
    else badge.style.cssText = 'background:rgba(239,68,68,0.2);color:#f87171';
  }
  const reason = document.getElementById('strategyReason');
  if (reason) reason.textContent = nd.reason;
  const assumptions = document.getElementById('strategyAssumptions');
  if (assumptions) {
    assumptions.innerHTML = '';
    const assumptions_data = [
      '外围市场不出现重大利空',
      '量能维持在2万亿以上',
      '北向资金不大幅流出',
      '政策面无突发变化'
    ];
    assumptions_data.forEach(a => {
      const div = document.createElement('div');
      div.className = 'derivation-path';
      div.innerHTML = `<span style="color:var(--accent)">✓</span> ${a}`;
      assumptions.appendChild(div);
    });
  }
  const ml = document.getElementById('monitorList');
  ml.innerHTML = '';
  currentData.market_variables_top3.forEach((v, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<span style="background:var(--accent);color:#fff;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:600;margin-right:8px">TOP${i+1}</span>${v}`;
    ml.appendChild(li);
  });
  const risks = document.getElementById('strategyRisks');
  if (risks) {
    risks.innerHTML = '';
    const risk_data = [
      {level: '高', text: '中东局势升级可能影响全球风险偏好'},
      {level: '中', text: '特朗普关税政策不确定性'},
      {level: '中', text: '科技板块获利盘回吐压力'},
      {level: '低', text: '周末消息面真空期波动'}
    ];
    risk_data.forEach(r => {
      const color = r.level === '高' ? '#ef4444' : r.level === '中' ? '#f59e0b' : '#10b981';
      const div = document.createElement('div');
      div.className = 'derivation-path';
      div.innerHTML = `<span style="color:${color};font-weight:700">${r.level}</span> <span style="flex:1">${r.text}</span>`;
      risks.appendChild(div);
    });
  }
}
let strategyChartInst = null;
function initStrategyChart() {
  const dom = document.getElementById('strategyChart');
  if(!dom) return;
  if(strategyChartInst) { strategyChartInst.dispose(); }
  strategyChartInst = echarts.init(dom);
  const option = {
    backgroundColor:'#111827', textStyle:{color:'#e2e8f0'},
    tooltip:{trigger:'item'},
    series:[{
      type:'graph', layout:'none', symbolSize:60, roam:false,
      label:{show:true, color:'#e2e8f0', fontSize:12},
      edgeSymbol:['circle','arrow'], edgeSymbolSize:[4,10],
      lineStyle:{color:'#334155', width:2},
      data:[
        {name:'当前', x:400, y:100, itemStyle:{color:'#3b82f6'}},
        {name:'科技修复', x:250, y:220, itemStyle:{color:'#10b981'}},
        {name:'震荡分化', x:550, y:220, itemStyle:{color:'#f59e0b'}},
        {name:'继续冲高', x:180, y:340, itemStyle:{color:'#8b5cf6'}},
        {name:'回落整理', x:320, y:340, itemStyle:{color:'#ec4899'}},
        {name:'主板补涨', x:480, y:340, itemStyle:{color:'#06b6d4'}},
        {name:'全面回调', x:620, y:340, itemStyle:{color:'#ef4444'}}
      ],
      links:[
        {source:'当前', target:'科技修复'},
        {source:'当前', target:'震荡分化'},
        {source:'科技修复', target:'继续冲高'},
        {source:'科技修复', target:'回落整理'},
        {source:'震荡分化', target:'主板补涨'},
        {source:'震荡分化', target:'全面回调'}
      ]
    }]
  };
  strategyChartInst.setOption(option);
}
let beatingChartInst = null;
function initBeatingChart() {
  const dom = document.getElementById('beatingChart');
  if(!dom) return;
  if(beatingChartInst) { beatingChartInst.dispose(); }
  beatingChartInst = echarts.init(dom);
  const scores = dates.map(d => dataAll[dates.indexOf(d)].summary.avg_score);
  const beatings = dates.map(d => dataAll[dates.indexOf(d)].summary.beating_index);
  const option = {
    backgroundColor:'#111827', textStyle:{color:'#e2e8f0'},
    tooltip:{trigger:'axis'},
    legend:{data:['五维平均分','挨打指数'], textStyle:{color:'#e2e8f0'}},
    xAxis:{type:'category', data:dates, axisLine:{lineStyle:{color:'#334155'}}, axisLabel:{color:'#e2e8f0'}},
    yAxis:{type:'value', axisLine:{lineStyle:{color:'#334155'}}, axisLabel:{color:'#e2e8f0'}, splitLine:{lineStyle:{color:'#1e293b'}}},
    series:[
      {type:'line', name:'五维平均分', data:scores, smooth:true, lineStyle:{color:'#3b82f6'}, itemStyle:{color:'#3b82f6'}, areaStyle:{color:'rgba(59,130,246,.15)'}},
      {type:'line', name:'挨打指数', data:beatings, smooth:true, lineStyle:{color:'#ef4444'}, itemStyle:{color:'#ef4444'}}
    ]
  };
  beatingChartInst.setOption(option);
}
let sectorHeatInst = null;
function initSectorHeat() {
  const dom = document.getElementById('sectorHeatChart');
  if(!dom) return;
  if(sectorHeatInst) { sectorHeatInst.dispose(); }
  sectorHeatInst = echarts.init(dom);
  const series = sectors.map((s, i) => ({
    name:s, type:'bar', stack:'total',
    data: dates.map(d => sectorHeat[d][i]),
    itemStyle:{color:colorPalette[i]}
  }));
  const option = {
    backgroundColor:'#111827', textStyle:{color:'#e2e8f0'},
    tooltip:{trigger:'axis', axisPointer:{type:'shadow'}},
    legend:{data:sectors, textStyle:{color:'#e2e8f0'}},
    xAxis:{type:'category', data:dates, axisLine:{lineStyle:{color:'#334155'}}, axisLabel:{color:'#e2e8f0'}},
    yAxis:{type:'value', name:'热度', axisLine:{lineStyle:{color:'#334155'}}, axisLabel:{color:'#e2e8f0'}, splitLine:{lineStyle:{color:'#1e293b'}}},
    series:series
  };
  sectorHeatInst.setOption(option);
}
let accuracyTrendInst = null;
function initAccuracyTrend() {
  const dom = document.getElementById('accuracyTrendChart');
  if(!dom) return;
  if(accuracyTrendInst) { accuracyTrendInst.dispose(); }
  accuracyTrendInst = echarts.init(dom);
  let correct = 0; let total = 0;
  const trendData = dataAll.map(d => {
    if (d.prediction_verify.result === 'correct') correct++;
    if (d.prediction_verify.result === 'partial') correct += 0.5;
    total++;
    return { date: d.meta.date, value: Math.round(correct / total * 100) };
  });
  const option = {
    backgroundColor:'#111827', textStyle:{color:'#e2e8f0'},
    tooltip:{trigger:'axis'},
    xAxis:{type:'category', data:trendData.map(d=>d.date), axisLine:{lineStyle:{color:'#334155'}}, axisLabel:{color:'#e2e8f0'}},
    yAxis:{type:'value', min:0, max:100, axisLine:{lineStyle:{color:'#334155'}}, axisLabel:{color:'#e2e8f0',formatter:'{value}%'}, splitLine:{lineStyle:{color:'#1e293b'}}},
    series:[{
      type:'line', data:trendData.map(d=>d.value), smooth:true, lineStyle:{color:'#10b981',width:2},
      itemStyle:{color:'#10b981'}, areaStyle:{color:'rgba(16,185,129,.15)'},
      markLine:{data:[{yAxis:60,lineStyle:{color:'#f59e0b'},label:{formatter:'及格线 60%',color:'#f59e0b'}}]}
    }]
  };
  accuracyTrendInst.setOption(option);
}
let sentimentInst = null;
function initSentimentChart() {
  const dom = document.getElementById('sentimentChart');
  if(!dom) return;
  if(sentimentInst) { sentimentInst.dispose(); }
  sentimentInst = echarts.init(dom);
  const scores = dates.map(d => dataAll[dates.indexOf(d)].summary.avg_score);
  const beatings = dates.map(d => dataAll[dates.indexOf(d)].summary.beating_index);
  const sentiment = scores.map((s, i) => Math.round(s * 10 - beatings[i] / 10));
  const option = {
    backgroundColor:'#111827', textStyle:{color:'#e2e8f0'},
    tooltip:{trigger:'axis'},
    legend:{data:['市场情绪指数'], textStyle:{color:'#e2e8f0'}},
    xAxis:{type:'category', data:dates, axisLine:{lineStyle:{color:'#334155'}}, axisLabel:{color:'#e2e8f0'}},
    yAxis:{type:'value', min:-50, max:50, axisLine:{lineStyle:{color:'#334155'}}, axisLabel:{color:'#e2e8f0'}, splitLine:{lineStyle:{color:'#1e293b'}}},
    series:[{
      type:'line', name:'市场情绪指数', data:sentiment, smooth:true, lineStyle:{color:'#8b5cf6',width:2},
      itemStyle:{color:'#8b5cf6'}, areaStyle:{color:'rgba(139,92,246,.15)'},
      markLine:{data:[{yAxis:0,lineStyle:{color:'#94a3b8'},label:{formatter:'中性线',color:'#94a3b8'}}]}
    }]
  };
  sentimentInst.setOption(option);
}
let fiveDimTrendInst = null;
function initFiveDimTrend() {
  const dom = document.getElementById('fiveDimTrendChart');
  if(!dom) return;
  if(fiveDimTrendInst) { fiveDimTrendInst.dispose(); }
  fiveDimTrendInst = echarts.init(dom);
  const series = dimNames.map((n, i) => ({
    name:n, type:'line', smooth:true,
    data: dates.map(d => fiveDimHistory[d][i]),
    itemStyle:{color:colorPalette[i]}, lineStyle:{width:2}
  }));
  const avgSeries = {
    name:'历史均值', type:'line', data:fiveDimAvg, lineStyle:{type:'dashed',color:'#94a3b8'}, itemStyle:{color:'#94a3b8'}, symbol:'none'
  };
  const option = {
    backgroundColor:'#111827', textStyle:{color:'#e2e8f0'},
    tooltip:{trigger:'axis'},
    legend:{data:[...dimNames,'历史均值'], textStyle:{color:'#e2e8f0'}},
    xAxis:{type:'category', data:dates, axisLine:{lineStyle:{color:'#334155'}}, axisLabel:{color:'#e2e8f0'}},
    yAxis:{type:'value', min:0, max:10, axisLine:{lineStyle:{color:'#334155'}}, axisLabel:{color:'#e2e8f0'}, splitLine:{lineStyle:{color:'#1e293b'}}},
    series:[...series, avgSeries]
  };
  fiveDimTrendInst.setOption(option);
}
let dimCompareInst = null;
function initDimCompare() {
  const dom = document.getElementById('dimCompareChart');
  if(!dom) return;
  if(dimCompareInst) { dimCompareInst.dispose(); }
  dimCompareInst = echarts.init(dom);
  const currentScores = dimKeys.map(k => currentData.five_dimensions[k].score);
  const option = {
    backgroundColor:'#111827', textStyle:{color:'#e2e8f0'},
    tooltip:{trigger:'axis'},
    legend:{data:['当前评分','历史均值'], textStyle:{color:'#e2e8f0'}},
    xAxis:{type:'category', data:dimNames, axisLine:{lineStyle:{color:'#334155'}}, axisLabel:{color:'#e2e8f0'}},
    yAxis:{type:'value', min:0, max:10, axisLine:{lineStyle:{color:'#334155'}}, axisLabel:{color:'#e2e8f0'}, splitLine:{lineStyle:{color:'#1e293b'}}},
    series:[
      {type:'bar', name:'当前评分', data:currentScores, itemStyle:{color:'#3b82f6'}, barWidth:'30%'},
      {type:'bar', name:'历史均值', data:fiveDimAvg, itemStyle:{color:'rgba(148,163,184,0.5)'}, barWidth:'30%'}
    ]
  };
  dimCompareInst.setOption(option);
}
let accuracyPieInst = null;
function initAccuracyPie() {
  const dom = document.getElementById('accuracyPie');
  if(!dom) return;
  if(accuracyPieInst) { accuracyPieInst.dispose(); }
  accuracyPieInst = echarts.init(dom);
  const option = {
    backgroundColor:'#111827', textStyle:{color:'#e2e8f0'},
    tooltip:{trigger:'item'},
    legend:{bottom:5, textStyle:{color:'#e2e8f0'}},
    series:[{
      type:'pie', radius:'60%', center:['50%','45%'],
      data:[
        {value:3, name:'正确', itemStyle:{color:'#10b981'}},
        {value:1, name:'部分', itemStyle:{color:'#f59e0b'}},
        {value:0, name:'错误', itemStyle:{color:'#ef4444'}}
      ],
      label:{color:'#e2e8f0', formatter:'{b}: {c}'}
    }]
  };
  accuracyPieInst.setOption(option);
}
function renderCapital() {
  const cf = capitalFlowHistory[currentDate];
  if (!cf) return;
  const inflow = cf.inflow || [];
  const outflow = cf.outflow || [];
  const netIn = inflow.reduce((s, i) => s + i.amount, 0);
  const netOut = outflow.reduce((s, o) => s + o.amount, 0);
  const net = netIn + netOut;
  document.getElementById('capital-net').textContent = (net > 0 ? '+' : '') + net.toFixed(1) + '亿';
  document.getElementById('capital-net').style.color = net >= 0 ? '#34d399' : '#f87171';
  document.getElementById('capital-net-delta').textContent = net >= 0 ? '资金净流入' : '资金净流出';
  if (inflow.length > 0) {
    document.getElementById('capital-in1').textContent = inflow[0].name;
    document.getElementById('capital-in1-amount').textContent = '+' + inflow[0].amount + '亿';
    document.getElementById('capital-in1-amount').className = 'kpi-delta positive';
  }
  if (outflow.length > 0) {
    document.getElementById('capital-out1').textContent = outflow[0].name;
    document.getElementById('capital-out1-amount').textContent = outflow[0].amount + '亿';
    document.getElementById('capital-out1-amount').className = 'kpi-delta negative';
  }
  const sentiment = net > 50 ? '积极' : net > 0 ? '温和' : net > -50 ? '谨慎' : '恐慌';
  const sentimentColor = net > 50 ? 'background:rgba(16,185,129,0.2);color:#34d399' : net > 0 ? 'background:rgba(245,158,11,0.2);color:#fbbf24' : 'background:rgba(239,68,68,0.2);color:#f87171';
  const sb = document.getElementById('capital-sentiment');
  sb.textContent = sentiment;
  sb.style.cssText = sentimentColor;
  document.getElementById('capital-sentiment-desc').textContent = '基于主力资金净流入判断';
  const tbody = document.querySelector('#capitalTable tbody');
  tbody.innerHTML = '';
  [...inflow.map(i => ({name: i.name, amount: i.amount, dir: 'in'})), ...outflow.map(o => ({name: o.name, amount: o.amount, dir: 'out'}))]
    .sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount))
    .forEach((item, idx) => {
      const tr = document.createElement('tr');
      const color = item.dir === 'in' ? '#34d399' : '#f87171';
      const sign = item.dir === 'in' ? '+' : '';
      tr.innerHTML = `<td>${item.name}</td><td style="color:${color}">${sign}${item.amount}亿</td><td>Top ${idx+1}</td><td><span class="tag ${item.dir === 'in' ? 'tag-correct' : 'tag-wrong'}">${item.dir === 'in' ? '流入' : '流出'}</span></td>`;
      tbody.appendChild(tr);
    });
}
let capitalInInst = null;
let capitalOutInst = null;
function initCapitalChart() {
  const cf = capitalFlowHistory[currentDate];
  if (!cf) return;
  const inflow = cf.inflow || [];
  const outflow = cf.outflow || [];
  const domIn = document.getElementById('capitalInChart');
  if (domIn) {
    if (capitalInInst) capitalInInst.dispose();
    capitalInInst = echarts.init(domIn);
    capitalInInst.setOption({
      backgroundColor:'#111827', textStyle:{color:'#e2e8f0'},
      tooltip:{trigger:'axis'},
      xAxis:{type:'value', axisLine:{lineStyle:{color:'#334155'}}, axisLabel:{color:'#e2e8f0'}, splitLine:{lineStyle:{color:'#1e293b'}}},
      yAxis:{type:'category', data:inflow.map(i=>i.name).reverse(), axisLine:{lineStyle:{color:'#334155'}}, axisLabel:{color:'#e2e8f0'}},
      series:[{type:'bar', data:inflow.map(i=>i.amount).reverse(), itemStyle:{color:'#10b981'}, label:{show:true,position:'right',formatter:'+{c}亿',color:'#e2e8f0'}}]
    });
  }
  const domOut = document.getElementById('capitalOutChart');
  if (domOut) {
    if (capitalOutInst) capitalOutInst.dispose();
    capitalOutInst = echarts.init(domOut);
    capitalOutInst.setOption({
      backgroundColor:'#111827', textStyle:{color:'#e2e8f0'},
      tooltip:{trigger:'axis'},
      xAxis:{type:'value', axisLine:{lineStyle:{color:'#334155'}}, axisLabel:{color:'#e2e8f0'}, splitLine:{lineStyle:{color:'#1e293b'}}},
      yAxis:{type:'category', data:outflow.map(o=>o.name).reverse(), axisLine:{lineStyle:{color:'#334155'}}, axisLabel:{color:'#e2e8f0'}},
      series:[{type:'bar', data:outflow.map(o=>Math.abs(o.amount)).reverse(), itemStyle:{color:'#ef4444'}, label:{show:true,position:'right',formatter:'-{c}亿',color:'#e2e8f0'}}]
    });
  }
}
function renderStocks() {
  const picks = stockPicksHistory[currentDate];
  if (!picks) return;
  const container = document.getElementById('stockPicksCards');
  container.innerHTML = '';
  picks.forEach(p => {
    const scoreClass = p.score >= 7 ? 'score-high' : p.score >= 4 ? 'score-mid' : 'score-low';
    const signalColor = p.signal.includes('强烈看多') ? '#34d399' : p.signal.includes('看多') ? '#10b981' : p.signal.includes('关注') ? '#fbbf24' : '#f87171';
    const card = document.createElement('div');
    card.className = 'glass-card';
    card.style.cssText = 'display:inline-block;width:100%;max-width:400px;margin-right:12px;';
    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <div>
          <div style="font-size:18px;font-weight:700">${p.name}</div>
          <div style="font-size:13px;color:#94a3b8">${p.code}</div>
        </div>
        <span class="score-badge ${scoreClass}">${p.score}</span>
      </div>
      <div style="font-size:13px;color:#94a3b8;line-height:1.6;margin-bottom:10px">${p.reason}</div>
      <div style="display:flex;gap:8px">
        <span class="weight-chip" style="background:${signalColor}20;color:${signalColor}">${p.signal}</span>
      </div>
    `;
    container.appendChild(card);
  });
  const tbody = document.querySelector('#stockHistoryTable tbody');
  tbody.innerHTML = '';
  Object.entries(stockPicksHistory).forEach(([date, dayPicks]) => {
    dayPicks.forEach(p => {
      const tr = document.createElement('tr');
      const signalColor = p.signal.includes('看多') ? '#34d399' : p.signal.includes('关注') ? '#fbbf24' : '#f87171';
      tr.innerHTML = `<td>${date}</td><td>${p.code}</td><td>${p.name}</td><td style="color:${signalColor}">${p.signal}</td><td>${p.score}</td><td>${p.reason}</td>`;
      tbody.appendChild(tr);
    });
  });
}
let stockTrendInst = null;
function initStocksChart() {
  const dom = document.getElementById('stockTrendChart');
  if (!dom) return;
  if (stockTrendInst) stockTrendInst.dispose();
  stockTrendInst = echarts.init(dom);
  const codes = [...new Set(Object.values(stockPicksHistory).flat().map(p => p.code))];
  const names = {};
  Object.values(stockPicksHistory).flat().forEach(p => names[p.code] = p.name);
  const series = codes.map(code => ({
    name: names[code] || code,
    type: 'line',
    smooth: true,
    data: dates.map(d => {
      const pick = (stockPicksHistory[d] || []).find(p => p.code === code);
      return pick ? pick.score : null;
    })
  }));
  stockTrendInst.setOption({
    backgroundColor:'#111827', textStyle:{color:'#e2e8f0'},
    tooltip:{trigger:'axis'},
    legend:{data:codes.map(c => names[c] || c), textStyle:{color:'#e2e8f0'}},
    xAxis:{type:'category', data:dates, axisLine:{lineStyle:{color:'#334155'}}, axisLabel:{color:'#e2e8f0'}},
    yAxis:{type:'value', min:0, max:10, axisLine:{lineStyle:{color:'#334155'}}, axisLabel:{color:'#e2e8f0'}, splitLine:{lineStyle:{color:'#1e293b'}}},
    series: series
  });
}
function renderWeekly() {
  const wr = weeklyReviews[currentDate];
  if (!wr) {
    document.getElementById('weeklySummary').innerHTML = '<div style="color:#94a3b8;padding:20px">当前日期暂无周度复盘数据</div>';
    document.getElementById('weeklyEvents').innerHTML = '';
    document.getElementById('weeklyVerify').innerHTML = '';
    document.getElementById('weeklyOutlook').innerHTML = '';
    document.getElementById('weeklyMonitor').innerHTML = '';
    return;
  }
  const s = document.getElementById('weeklySummary');
  s.innerHTML = `
    <div style="font-size:14px;color:#e2e8f0;line-height:1.8;margin-bottom:10px">${wr.weekly_summary}</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <span class="weight-chip">时间范围: ${wr.week_range}</span>
    </div>
  `;
  const e = document.getElementById('weeklyEvents');
  e.innerHTML = '<ul class="monitor-list">' + wr.key_events.map(ev => `<li>${ev}</li>`).join('') + '</ul>';
  const v = document.getElementById('weeklyVerify');
  v.innerHTML = '';
  if (wr.weekly_prediction_verify) {
    const table = document.createElement('table');
    table.innerHTML = '<thead><tr><th>日期</th><th>预测</th><th>实际</th><th>验证</th></tr></thead><tbody></tbody>';
    wr.weekly_prediction_verify.forEach(pv => {
      const tagCls = pv.result === 'correct' ? 'tag-correct' : pv.result === 'partial' ? 'tag-partial' : 'tag-wrong';
      const tagText = pv.result === 'correct' ? '正确' : pv.result === 'partial' ? '部分' : '错误';
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${pv.date}</td><td>${pv.prediction}</td><td>${pv.actual}</td><td><span class="tag ${tagCls}">${tagText}</span></td>`;
      table.querySelector('tbody').appendChild(tr);
    });
    v.appendChild(table);
  }
  const o = document.getElementById('weeklyOutlook');
  if (wr.next_week_outlook) {
    const no = wr.next_week_outlook;
    const confColor = no.confidence >= 60 ? '#34d399' : no.confidence >= 45 ? '#fbbf24' : '#f87171';
    o.innerHTML = `
      <div style="font-size:18px;font-weight:700;color:var(--accent);margin-bottom:10px">${no.direction}</div>
      <div style="font-size:14px;color:#e2e8f0;margin-bottom:10px">置信度: <span style="color:${confColor};font-weight:700">${no.confidence}%</span></div>
      <div style="font-size:13px;color:#94a3b8;margin-bottom:10px"><strong>催化剂:</strong><br>${no.key_catalysts.join('<br>')}</div>
      <div style="font-size:13px;color:#94a3b8"><strong>风险:</strong><br>${no.risks.join('<br>')}</div>
    `;
  }
  const m = document.getElementById('weeklyMonitor');
  if (wr.next_week_outlook && wr.next_week_outlook.monitor_list) {
    m.innerHTML = wr.next_week_outlook.monitor_list.map(item => `<li>${item}</li>`).join('');
  }
}
function renderModel() {
  const wh = document.getElementById('weightHistory');
  wh.innerHTML = '';
  dataAll.forEach(d => {
    const box = document.createElement('div');
    box.style.cssText = 'margin-bottom:10px;padding:10px;border:1px solid var(--border);border-radius:6px;';
    const wa = d.model_learning.weight_adjustments;
    const waStr = Object.entries(wa).map(([k,v]) => `${k}: ${v}`).join(' | ');
    box.innerHTML = `<strong>${d.meta.date}</strong> — ${waStr}`;
    wh.appendChild(box);
  });
  const tbody = document.querySelector('#historyTable tbody');
  tbody.innerHTML = '';
  dataAll.forEach(d => {
    const pv = d.prediction_verify;
    const tagCls = pv.result === 'correct' ? 'tag-correct' : pv.result === 'partial' ? 'tag-partial' : 'tag-wrong';
    const tagText = pv.result === 'correct' ? '正确' : pv.result === 'partial' ? '部分' : '错误';
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${d.meta.date}</td><td>${d.meta.signal_id}</td><td>${d.next_day_prediction.direction}</td><td>${d.next_day_prediction.confidence}%</td><td>${pv.actual}</td><td><span class="tag ${tagCls}">${tagText}</span></td>`;
    tbody.appendChild(tr);
  });
}
function initAll() {
  const sel = document.getElementById('dateSelect');
  sel.innerHTML = dates.map(d => `<option value="${d}"${d === currentDate ? ' selected' : ''}>${d}</option>`).join('');
  currentData = getDataByDate(currentDate);
  renderOverview();
  renderEngine();
  renderVerify();
  renderStrategy();
  renderCapital();
  renderStocks();
  renderWeekly();
  renderModel();
  initRadar();
  initGauge();
  initThermometer();
}
window.addEventListener('resize', () => {
  if(radarChartInst) radarChartInst.resize();
  if(gaugeChartInst) gaugeChartInst.resize();
  if(verifyChartInst) verifyChartInst.resize();
  if(strategyChartInst) strategyChartInst.resize();
  if(beatingChartInst) beatingChartInst.resize();
  if(sectorHeatInst) sectorHeatInst.resize();
  if(fiveDimTrendInst) fiveDimTrendInst.resize();
  if(accuracyPieInst) accuracyPieInst.resize();
  if(dimCompareInst) dimCompareInst.resize();
  if(accuracyTrendInst) accuracyTrendInst.resize();
  if(sentimentInst) sentimentInst.resize();
  if(capitalInInst) capitalInInst.resize();
  if(capitalOutInst) capitalOutInst.resize();
  if(stockTrendInst) stockTrendInst.resize();
});
document.addEventListener('DOMContentLoaded', initAll);
document.addEventListener('keydown', e => {
  if (e.altKey) {
    const tabs = ['overview','engine','verify','strategy','history','capital','stocks','weekly','model'];
    const idx = parseInt(e.key) - 1;
    if (idx >= 0 && idx < tabs.length) {
      const btn = document.querySelector(`.tab-btn[data-tab="${tabs[idx]}"]`);
      if (btn) btn.click();
    }
  }
});
