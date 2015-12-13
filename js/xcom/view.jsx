var Product = React.createClass({
  getInitialState: function() {
    return {
      employees      : 1,
      xcom_dices     : 1,
      xcom_dice_eq   : true,
      initilal_threat: 1,
      success_limit  : 1,
      threat_limit   : 2,
      shortage_cost  : false,
      unit_lost_cost : false,
      benefit        : 0
    };
  },
  handleEmployeeChanged: function(event) {
    var newState = {}
    newState['employees'] = event.target.value;
    if (this.state.xcom_dice_eq) {
      newState['xcom_dices'] = event.target.value;
    }
    this.setState(newState);
  },
  handleXcomDiceChanged: function(event) {
    this.setState({xcom_dices: event.target.value});
  },
  handleXcomDiceEqChanged: function(event) {
    var newState = {}
    newState['xcom_dice_eq'] = event.target.checked;
    if (event.target.checked) {
      newState['xcom_dices'] = this.state.employees;
    }
    this.setState(newState);
  },
  handleInitialThreatChanged: function(event) {
    this.setState({initilal_threat: event.target.value});
  },
  handleSuccessLimitChanged: function(event) {
    this.setState({success_limit: event.target.value});
  },
  handleThreatLimitChanged: function(event) {
    this.setState({threat_limit: event.target.value});
  },
  handleShortageCostChange: function(event) {
    this.setState({shortage_cost: event.target.checked});
  },
  handleUnitLostCostChange: function(event) {
    this.setState({unit_lost_cost: event.target.checked});
  },
  handleBenefitChange: function(event) {
    this.setState({benefit: event.target.value});
  },
  renderTbody: function(simulate_result) {
    var result = []
    for(var i=0; i<simulate_result[0].length; i++) {
      result.push(
        <tr>
          <td>{i}個</td>
          <td>{simulate_result[0][i].toFixed(2)}%</td>
          <td>{simulate_result[1][i].toFixed(2)}%</td>
        </tr>
      );
    }
    return result;
  },
  render: function() {
    options = [1,2,3,4,5,6].map(function(p) {
      return(
        <option>{p}</option>
      );
    });

    var simulate_result = simulate(this.state.xcom_dices,
                                   this.state.initilal_threat,
                                   this.state.success_limit,
                                   this.state.threat_limit);

    var result_table = [[0,0],[0,0]];
    for(var i=0; i<simulate_result[0].length; i++) { // クッソ雑
      if (i < this.state.success_limit) {
        result_table[0][0] += simulate_result[0][i];
        result_table[1][0] += simulate_result[1][i];
      } else {
        result_table[0][1] += simulate_result[0][i];
        result_table[1][1] += simulate_result[1][i];
      }
    }

    // コスト期待値計算
    var total_cost = [];
    // 雇用コスト
    total_cost[0] = Number(this.state.employees);

    // 撃ち漏らし損害
    total_cost[1] = 0;
    if (this.state.shortage_cost) {
      // 成功マーカー不足数 * 確率 の総和
      for(var i=0; i<simulate_result[0].length; i++) {
        if (i < this.state.success_limit) {
          total_cost[1] += (this.state.success_limit - i) * (simulate_result[0][i] + simulate_result[1][i]) / 100 * 3;
        }
      }
    }

    // 死亡損害
    total_cost[2] = 0;
    if (this.state.unit_lost_cost) {
      // 雇用数 * 死亡率
      total_cost[2] = this.state.employees * (result_table[1][0] + result_table[1][1]) / 100;
    }

    // 成功時利益
    total_cost[3] = this.state.benefit * (result_table[0][1] + result_table[1][1]) / 100 * (-1);

    // 合計
    total_cost[4] = total_cost[0] + total_cost[1] + total_cost[2] + total_cost[3];

    return (
      <div>
        <h1>条件設定</h1>
        <h2>初期値</h2>
        <ul>
          <li>
            雇用人数/機数
            <select onChange={this.handleEmployeeChanged}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
            </select>
          </li>
          <li>
            XCOMダイス数
            <select onChange={this.handleXcomDiceChanged}
                    disabled={this.state.xcom_dice_eq}
                    value={this.state.xcom_dices}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
            </select>
            &nbsp; &nbsp; (<input type='checkbox'
                                  defaultChecked={this.state.xcom_dice_eq}
                                  onChange={this.handleXcomDiceEqChanged}>
                             雇用人数/機数と同じ
                           </input>)
          </li>
          <li>
            初期脅威度
            <select onChange={this.handleInitialThreatChanged}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </li>
        </ul>
        <h2>ダイスロール終了条件</h2>
        <ul>
          <li>
            成功マーカーが
            <select onChange={this.handleSuccessLimitChanged}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            個に到達
          </li>
          <li>
            脅威度が
            <select onChange={this.handleThreatLimitChanged}>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </select>
            に到達
          </li>
          <li>死亡する</li>
        </ul>
        <h2>コスト条件</h2>
        <ul>
          <li>雇用コスト</li>
          <li><input type='checkbox' onChange={this.handleShortageCostChange}>撃ち漏らし損害(成功マーカーの不足=3$で計算)</input></li>
          <li><input type='checkbox' onChange={this.handleUnitLostCostChange}>死亡時損害</input></li>
          <li>
            成功時利益
            <select onChange={this.handleBenefitChange}>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </li>
        </ul>
        <h1>結果</h1>
        <h2>概要</h2>
        <table style={{textAlign: 'center'}}>
          <thead>
            <tr>
              <th></th>
              <th>生存</th>
              <th>死亡</th>
              <th>合計</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>失敗</th>
              <td>{result_table[0][0].toFixed(2)}%</td>
              <td>{result_table[1][0].toFixed(2)}%</td>
              <td>{(result_table[0][0] + result_table[1][0]).toFixed(2)}%</td>
            </tr>
            <tr>
              <th>成功</th>
              <td>{result_table[0][1].toFixed(2)}%</td>
              <td>{result_table[1][1].toFixed(2)}%</td>
              <td>{(result_table[0][1] + result_table[1][1]).toFixed(2)}%</td>
            </tr>
            <tr>
              <th>合計</th>
              <td>{(result_table[0][0] + result_table[0][1]).toFixed(2)}%</td>
              <td>{(result_table[1][0] + result_table[1][1]).toFixed(2)}%</td>
            </tr>
          </tbody>
        </table>

        <h2>総コスト期待値</h2>
        <table style={{textAlign: 'center'}}>
          <tbody>
            <tr>
              <th>雇用コスト</th>
              <td>{total_cost[0]}</td>
            </tr>
            <tr>
              <th>撃ち漏らし損害</th>
              <td>{total_cost[1].toFixed(2)}</td>
            </tr>
            <tr>
              <th>死亡損害</th>
              <td>{total_cost[2].toFixed(2)}</td>
            </tr>
            <tr>
              <th>成功時利益</th>
              <td>{total_cost[3].toFixed(2)}</td>
            </tr>
            <tr>
              <th>合計</th>
              <td>{total_cost[4].toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <h2>確率分布詳細</h2>
        <table style={{textAlign: 'center'}}>
          <thead>
            <tr>
              <th>成功マーカー数</th>
              <th>生存</th>
              <th>死亡</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTbody(simulate_result)}
          </tbody>
        </table>
      </div>
    );
  }
});

React.render(
  <Product></Product>,
  document.getElementById('app-container')
);
