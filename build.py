import json
import os
from collections import Counter

base = r'C:\Users\m1896\Documents\kimi\workspace\market-mapping-history'
daily_dir = os.path.join(base, 'daily')

json_files = sorted([f for f in os.listdir(daily_dir) if f.endswith('.json')])
all_data = []
for jf in json_files:
    with open(os.path.join(daily_dir, jf), 'r', encoding='utf-8') as f:
        all_data.append(json.load(f))

dates = [d['meta']['date'] for d in all_data]
dim_keys = ['macro', 'micro', 'peripheral', 'internal', 'style']
dim_labels = ['宏观', '微观', '外围', '内卫', '风格']

scores_by_dim = {k: [d['five_dimensions'][k]['score'] for d in all_data] for k in dim_keys}
avg_scores = [d['summary']['avg_score'] for d in all_data]
beating = [d['summary']['beating_index'] for d in all_data]
stages = [d['summary']['stage'] for d in all_data]

latest = all_data[-1]
latest_date = latest['meta']['date']
latest_scores = [latest['five_dimensions'][k]['score'] for k in dim_keys]
latest_biases = [latest['five_dimensions'][k]['bias'] for k in dim_keys]
latest_details = [latest['five_dimensions'][k].get('detail', '') for k in dim_keys]

pred_history = []
for d in all_data:
    if 'predictions' in d:
        for p in d['predictions']:
            pred_history.append({
                'date': d['meta']['date'],
                'id': p['id'],
                'content': p['content'],
                'confidence': p.get('confidence', 0),
                'result': p.get('result', 'unknown'),
                'actual': p.get('actual', '')
            })

pred_counts = Counter([p['result'] for p in pred_history])
total_preds = len(pred_history)
correct_rate = round(pred_counts.get('correct', 0) / total_preds * 100, 1) if total_preds else 0
wrong_rate = round(pred_counts.get('wrong', 0) / total_preds * 100, 1) if total_preds else 0
partial_rate = round(pred_counts.get('partial', 0) / total_preds * 100, 1) if total_preds else 0

variables = []
for d in all_data:
    for v in d.get('market_variables_top3', []):
        variables.append({'date': d['meta']['date'], 'text': v})

insights = []
if len(avg_scores) >= 2:
    if avg_scores[-1] > avg_scores[-2]:
        insights.append(f"五维均分连续上升：{avg_scores[-2]} → {avg_scores[-1]}，市场温度回暖")
    elif avg_scores[-1] < avg_scores[-2]:
        insights.append(f"五维均分下降：{avg_scores[-2]} → {avg_scores[-1]}，市场降温")

if len(beating) >= 2 and beating[-1] < beating[-2]:
    insights.append(f"挨打指数持续下降：{beating[-2]} → {beating[-1]}，压力释放")

if len(stages) >= 2 and stages[-1] != stages[-2]:
    insights.append(f"市场阶段切换：{stages[-2]} → {stages[-1]}")

if total_preds > 0:
    insights.append(f"累计预测 {total_preds} 条，准确率 {correct_rate}%，错误率 {wrong_rate}%")

# 表格行
table_rows = ""
for d in all_data:
    meta = d['meta']
    summary = d['summary']
    dims = d['five_dimensions']
    score_bg = "success" if summary['avg_score'] >= 6 else "warning" if summary['avg_score'] >= 4 else "danger"
    beat_bg = "success" if summary['beating_index'] <= 40 else "warning" if summary['beating_index'] <= 60 else "danger"
    table_rows += f"""
        <tr>
            <td><strong>{meta['date']}</strong></td>
            <td>{dims['macro']['score']}</td>
            <td>{dims['micro']['score']}</td>
            <td>{dims['peripheral']['score']}</td>
            <td>{dims['internal']['score']}</td>
            <td>{dims['style']['score']}</td>
            <td><span class='badge bg-{score_bg}'>{summary['avg_score']}</span></td>
            <td><span class='badge bg-{beat_bg}'>{summary['beating_index']}</span></td>
            <td>{summary['stage']}</td>
        </tr>"""

pred_rows = ""
for p in pred_history:
    badge_map = {"correct": "bg-success", "wrong": "bg-danger", "partial": "bg-warning", "unknown": "bg-secondary"}
    label_map = {"correct": "✓ 正确", "wrong": "✗ 错误", "partial": "~ 部分", "unknown": "? 待验证"}
    badge = badge_map.get(p['result'], "bg-secondary")
    label = label_map.get(p['result'], p['result'])
    actual_short = p.get('actual', '')[:40]
    pred_rows += f"""
        <tr>
            <td>{p['date']}</td>
            <td>{p['id']}</td>
            <td>{p['content']}</td>
            <td>{p['confidence']}</td>
            <td><span class='badge {badge}'>{label}</span></td>
            <td class='small text-muted'>{actual_short}...</td>
        </tr>"""

var_cards = ""
for v in variables:
    var_cards += f"""
        <div class='col-md-4 mb-2'>
            <div class='card var-card'>
                <div class='card-body p-2'>
                    <small class='text-muted'>{v['date']}</small>
                    <p class='mb-0 small'>{v['text']}</p>
                </div>
            </div>
        </div>"""

insight_cards = ""
for ins in insights:
    insight_cards += f"""
        <div class='alert alert-info alert-sm py-2 mb-2'>
            <i class='bi bi-lightbulb'></i> {ins}
        </div>"""

# JSON序列化
j_dates = json.dumps(dates)
j_dim_labels = json.dumps(dim_labels)
j_scores_by_dim = json.dumps(scores_by_dim)
j_avg_scores = json.dumps(avg_scores)
j_beating = json.dumps(beating)
j_stages = json.dumps(stages)
j_latest_scores = json.dumps(latest_scores)
j_latest_biases = json.dumps(latest_biases)
j_latest_details = json.dumps(latest_details)
j_pred_stats = json.dumps({'correct': correct_rate, 'wrong': wrong_rate, 'partial': partial_rate, 'total': total_preds})

html = f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>五维三层市场复盘系统 v2.1 | 智能仪表盘</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<style>
:root {{ --primary:#2c3e50; --success:#27ae60; --danger:#e74c3c; --warning:#f39c12; --info:#3498db; --bg-dark:#0f172a; --bg-card:#1e293b; --text-light:#e2e8f0; }}
body {{ background: var(--bg-dark); color: var(--text-light); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }}
.navbar {{ background: var(--bg-card) !important; border-bottom: 1px solid rgba(255,255,255,0.1); }}
.card {{ background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); }}
.card-header {{ background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 600; }}
.stat-card {{ text-align: center; padding: 1.5rem; }}
.stat-value {{ font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem; }}
.stat-label {{ font-size: 0.875rem; color: #94a3b8; }}
.score-good {{ color: var(--success); }} .score-mid {{ color: var(--warning); }} .score-bad {{ color: var(--danger); }}
.var-card {{ background: rgba(52, 152, 219, 0.08); border-left: 3px solid var(--info); }}
.table-dark-custom {{ background: var(--bg-card); color: var(--text-light); }}
.table-dark-custom th {{ background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); }}
.table-dark-custom td {{ border-color: rgba(255,255,255,0.08); }}
.dim-macro {{ color: #e74c3c; }} .dim-micro {{ color: #9b59b6; }} .dim-peripheral {{ color: #3498db; }} .dim-internal {{ color: #f39c12; }} .dim-style {{ color: #27ae60; }}
.alert-sm {{ font-size: 0.875rem; border-radius: 8px; background: rgba(52, 152, 219, 0.12); border: 1px solid rgba(52, 152, 219, 0.25); color: #93c5fd; }}
.dim-detail {{ font-size: 0.8rem; color: #94a3b8; margin-top: 0.25rem; }}
#radarChart, #trendChart, #dimTrendChart {{ max-height: 340px; }}
#predPieChart {{ max-height: 280px; }}
</style>
</head>
<body>
<nav class="navbar navbar-dark">
  <div class="container-fluid px-4">
    <span class="navbar-brand mb-0 h1"><i class="bi bi-graph-up-arrow"></i> 五维三层市场复盘系统 <span class="badge bg-info">v2.1</span></span>
    <span class="navbar-text"><i class="bi bi-calendar3"></i> 最新: {latest_date} <span class="ms-3"><i class="bi bi-clock"></i> <span id="clock"></span></span></span>
  </div>
</nav>

<div class="container-fluid py-4 px-4">
  <!-- 概览 -->
  <div class="row g-3 mb-4">
    <div class="col-md-3"><div class="card stat-card"><div class="stat-value score-mid" id="latestAvg">-</div><div class="stat-label">五维均分</div><small class="text-muted" id="latestStage">-</small></div></div>
    <div class="col-md-3"><div class="card stat-card"><div class="stat-value score-good" id="latestBeating">-</div><div class="stat-label">挨打指数</div><small class="text-muted">越低越好</small></div></div>
    <div class="col-md-3"><div class="card stat-card"><div class="stat-value score-good" id="predAccuracy">-</div><div class="stat-label">预测准确率</div><small class="text-muted" id="predTotal">累计 - 条</small></div></div>
    <div class="col-md-3"><div class="card stat-card"><div class="stat-value score-mid" id="dataDays">-</div><div class="stat-label">累计复盘天数</div><small class="text-muted">数据越多越智能</small></div></div>
  </div>

  <!-- 智能洞察 -->
  <div class="row mb-4">
    <div class="col-12">
      <div class="card">
        <div class="card-header"><i class="bi bi-lightbulb-fill text-warning"></i> 智能洞察 <span class="float-end small text-muted">基于 {len(dates)} 日数据自动生成</span></div>
        <div class="card-body">{insight_cards}</div>
      </div>
    </div>
  </div>

  <!-- 雷达图 + 趋势 -->
  <div class="row g-3 mb-4">
    <div class="col-md-4">
      <div class="card h-100">
        <div class="card-header"><i class="bi bi-bullseye"></i> {latest_date} 五维雷达图</div>
        <div class="card-body"><canvas id="radarChart"></canvas></div>
      </div>
    </div>
    <div class="col-md-8">
      <div class="card h-100">
        <div class="card-header"><i class="bi bi-graph-up"></i> 五维均分 & 挨打指数趋势</div>
        <div class="card-body"><canvas id="trendChart"></canvas></div>
      </div>
    </div>
  </div>

  <!-- 分维度趋势 -->
  <div class="row mb-4">
    <div class="col-12">
      <div class="card">
        <div class="card-header"><i class="bi bi-layers"></i> 五维分项历史走势</div>
        <div class="card-body"><canvas id="dimTrendChart"></canvas></div>
      </div>
    </div>
  </div>

  <!-- 最新详情 -->
  <div class="row g-3 mb-4">
    <div class="col-12">
      <div class="card">
        <div class="card-header"><i class="bi bi-card-text"></i> {latest_date} 五维详情</div>
        <div class="card-body"><div class="row" id="dimDetails"></div></div>
      </div>
    </div>
  </div>

  <!-- 市场变量 -->
  <div class="row mb-4">
    <div class="col-12">
      <div class="card">
        <div class="card-header"><i class="bi bi-lightning-charge"></i> 市场变量历史</div>
        <div class="card-body"><div class="row">{var_cards}</div></div>
      </div>
    </div>
  </div>

  <!-- 预测追踪 -->
  <div class="row g-3 mb-4">
    <div class="col-md-5">
      <div class="card">
        <div class="card-header"><i class="bi bi-check-circle"></i> 预测准确率分布</div>
        <div class="card-body"><canvas id="predPieChart"></canvas></div>
      </div>
    </div>
    <div class="col-md-7">
      <div class="card">
        <div class="card-header"><i class="bi bi-list-check"></i> 预测记录</div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-dark-custom table-sm mb-0">
              <thead><tr><th>日期</th><th>预测</th><th>置信</th><th>结果</th></tr></thead>
              <tbody>{pred_rows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 历史总表 -->
  <div class="row mb-4">
    <div class="col-12">
      <div class="card">
        <div class="card-header"><i class="bi bi-table"></i> 历史复盘总表</div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-dark-custom table-hover mb-0">
              <thead><tr><th>日期</th><th class="dim-macro">宏观</th><th class="dim-micro">微观</th><th class="dim-peripheral">外围</th><th class="dim-internal">内卫</th><th class="dim-style">风格</th><th>均分</th><th>挨打</th><th>阶段</th></tr></thead>
              <tbody>{table_rows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <footer class="text-center text-muted py-4"><small>五维三层市场分析系统 v2.1 | 数据驱动，越用越智能 | 生成: <span id="genTime"></span></small></footer>
</div>

<script>
const dates = {j_dates};
const dimLabels = {j_dim_labels};
const scoresByDim = {j_scores_by_dim};
const avgScores = {j_avg_scores};
const beatingIndex = {j_beating};
const stages = {j_stages};
const latestScores = {j_latest_scores};
const latestBiases = {j_latest_biases};
const latestDetails = {j_latest_details};
const predStats = {j_pred_stats};

function updateClock() {{ document.getElementById('clock').textContent = new Date().toLocaleTimeString('zh-CN'); }}
setInterval(updateClock, 1000); updateClock();
document.getElementById('genTime').textContent = new Date().toLocaleString('zh-CN');

const latestAvg = avgScores[avgScores.length - 1];
const latestBeat = beatingIndex[beatingIndex.length - 1];
document.getElementById('latestAvg').textContent = latestAvg.toFixed(1);
document.getElementById('latestAvg').className = 'stat-value ' + (latestAvg >= 6 ? 'score-good' : latestAvg >= 4 ? 'score-mid' : 'score-bad');
document.getElementById('latestStage').textContent = stages[stages.length - 1];
document.getElementById('latestBeating').textContent = latestBeat.toFixed(1);
document.getElementById('latestBeating').className = 'stat-value ' + (latestBeat <= 40 ? 'score-good' : latestBeat <= 60 ? 'score-mid' : 'score-bad');
document.getElementById('predAccuracy').textContent = predStats.correct + '%';
document.getElementById('predTotal').textContent = '累计 ' + predStats.total + ' 条预测';
document.getElementById('dataDays').textContent = dates.length;

Chart.defaults.color = '#94a3b8';
Chart.defaults.borderColor = 'rgba(255,255,255,0.08)';

const histScores = dimLabels.map((_, i) => {{
  let key = ['macro','micro','peripheral','internal','style'][i];
  let vals = scoresByDim[key].slice(0, -1);
  return vals.length > 0 ? vals.reduce((a,b)=>a+b,0)/vals.length : 5;
}});

new Chart(document.getElementById('radarChart'), {{
  type: 'radar',
  data: {{
    labels: dimLabels,
    datasets: [
      {{ label: dates[dates.length-1] + ' 当前', data: latestScores, borderColor: '#e74c3c', backgroundColor: 'rgba(231,76,60,0.2)', pointBackgroundColor: '#e74c3c', borderWidth: 2 }},
      {{ label: '历史均值', data: histScores, borderColor: '#3498db', backgroundColor: 'rgba(52,152,219,0.1)', pointBackgroundColor: '#3498db', borderWidth: 2, borderDash: [5,5] }}
    ]
  }},
  options: {{ responsive: true, maintainAspectRatio: false, scales: {{ r: {{ min: 0, max: 10, ticks: {{ stepSize: 2, backdropColor: 'transparent' }}, grid: {{ color: 'rgba(255,255,255,0.1)' }}, pointLabels: {{ color: '#e2e8f0', font: {{ size: 12 }} }} }} }}, plugins: {{ legend: {{ position: 'top' }} }} }}
}});

new Chart(document.getElementById('trendChart'), {{
  type: 'bar',
  data: {{
    labels: dates,
    datasets: [
      {{ label: '挨打指数', data: beatingIndex, backgroundColor: beatingIndex.map(v => v <= 40 ? 'rgba(39,174,96,0.7)' : v <= 60 ? 'rgba(243,156,18,0.7)' : 'rgba(231,76,60,0.7)'), yAxisID: 'y' }},
      {{ type: 'line', label: '五维均分', data: avgScores, borderColor: '#e2e8f0', backgroundColor: 'rgba(226,232,240,0.1)', borderWidth: 2, pointRadius: 4, yAxisID: 'y1' }}
    ]
  }},
  options: {{ responsive: true, maintainAspectRatio: false, interaction: {{ mode: 'index', intersect: false }}, scales: {{ y: {{ type: 'linear', display: true, position: 'left', min: 0, max: 100 }}, y1: {{ type: 'linear', display: true, position: 'right', min: 0, max: 10, grid: {{ drawOnChartArea: false }} }} }} }}
}});

const dimColors = {{ macro: '#e74c3c', micro: '#9b59b6', peripheral: '#3498db', internal: '#f39c12', style: '#27ae60' }};
new Chart(document.getElementById('dimTrendChart'), {{
  type: 'line',
  data: {{
    labels: dates,
    datasets: ['macro','micro','peripheral','internal','style'].map((k, i) => ({{
      label: dimLabels[i], data: scoresByDim[k], borderColor: dimColors[k], backgroundColor: dimColors[k] + '20', borderWidth: 2, pointRadius: 3, tension: 0.3
    }}))
  }},
  options: {{ responsive: true, maintainAspectRatio: false, interaction: {{ mode: 'index', intersect: false }}, scales: {{ y: {{ min: 0, max: 10 }} }} }}
}});

new Chart(document.getElementById('predPieChart'), {{
  type: 'doughnut',
  data: {{ labels: ['正确', '部分', '错误'], datasets: [{{ data: [predStats.correct, predStats.partial, predStats.wrong], backgroundColor: ['#27ae60', '#f39c12', '#e74c3c'], borderWidth: 0 }}] }},
  options: {{ responsive: true, maintainAspectRatio: false, plugins: {{ legend: {{ position: 'bottom' }}, tooltip: {{ callbacks: {{ label: c => c.label + ': ' + c.raw + '%' }} }} }} }}
}});

const dimDetailColors = ['dim-macro','dim-micro','dim-peripheral','dim-internal','dim-style'];
const dimIcons = ['bi-globe','bi-cpu','bi-arrow-repeat','bi-shield','bi-palette'];
let detailHTML = '';
dimLabels.forEach((label, i) => {{
  let badgeClass = latestBiases[i].includes('多') || latestBiases[i].includes('强') || latestBiases[i].includes('成长') || latestBiases[i].includes('承接') ? 'bg-success' : latestBiases[i].includes('空') || latestBiases[i].includes('弱') || latestBiases[i].includes('失血') || latestBiases[i].includes('风险') ? 'bg-danger' : 'bg-warning';
  detailHTML += `<div class='col-md-4 col-sm-6 mb-3'><div class='p-3 rounded' style='background:rgba(255,255,255,0.03)'><div class='d-flex justify-content-between align-items-center'><span class="${{dimDetailColors[i]}}"><i class="bi ${{dimIcons[i]}}"></i> <strong>${{label}}</strong></span><span class="badge bg-secondary">${{latestScores[i]}}/10</span></div><div class="mt-2"><span class="badge ${{badgeClass}}">${{latestBiases[i]}}</span></div><div class="dim-detail">${{latestDetails[i]}}</div></div></div>`;
}});
document.getElementById('dimDetails').innerHTML = detailHTML;
</script>
</body>
</html>'''

output_path = os.path.join(base, 'dashboard', 'index.html')
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html)

print(f"Dashboard saved: {output_path}")
print(f"File size: {len(html):,} bytes")
print(f"Records: {len(all_data)}, Predictions: {total_preds}, Variables: {len(variables)}")
