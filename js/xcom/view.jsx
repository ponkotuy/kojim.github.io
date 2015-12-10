var Product = React.createClass({
  getInitialState: function() {
    return {
      xcom_dices     : 1,
      initilal_threat: 1,
      success_limit  : 1,
      threat_limit   : 2
    };
  },
  handleXcomDiceChanged: function(event) {
    this.setState({xcom_dices: event.target.value});
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
    return (
      <div>
        <h1>条件設定</h1>
        <h2>初期値</h2>
        <ul>
          <li>
            XCOMダイス数
            <select onChange={this.handleXcomDiceChanged}>
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
