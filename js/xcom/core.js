/*
  入力:
    - XCOMダイス数
    - 初期脅威度

  リトライ停止条件
    - 成功マーカーがX個に到達
    - 脅威度がXに到達
    - 死亡

  結果:
        生存  死亡
    - 0 xx%   xx%
    - 1 xx%   xx%
    - 2 xx%   xx%
    - 3 xx%   xx%
*/

/**
 *
 */
function simulate(xcom_dices, initilal_threat, success_limit, threat_limit) {
	/**
	 * @return [0]が0: 生存
	 *         [0]が1: 死亡
	 *         [1]   : 成功マーカーの個数
	 */
	function tryTask(current_threat, current_success) {
		// XCOMダイスを振る
		for(var i=0; i<xcom_dices; i++) {
			if (rollDie(3) == 1) {
				current_success++;
			}
		}
		// エイリアンダイスを振る
		// 死亡したら終了
		if (rollDie(8) <= current_threat) {
			return [1, current_success];
		}

		// 脅威度上昇(上限5)
		if (current_threat < 5) {
			current_threat++;
		}

		// 必要な成功マーカーが集まっていたら終了
		if (current_success >= success_limit) {
			return [0, current_success];
		}

		// 脅威度が上限値を超えていたら終了
		if (current_threat >= threat_limit) {
			return [0, current_success];
		}

		return tryTask(current_threat, current_success);
	}

	// シミュレーションの試行回数
	var simulate_count = 10000;

	// 結果配列の初期化
	// 
	// 結果配列の見方は以下
	//   result[0][0] : 生存, 成功マーカー0個
	//   result[0][1] : 生存, 成功マーカー1個
	//   result[0][2] : 生存, 成功マーカー2個
	//   result[1][0] : 死亡, 成功マーカー0個
	//   result[1][1] : 死亡, 成功マーカー1個
	//   result[1][2] : 死亡, 成功マーカー2個

	var result = [[],[]];
	for(var i=0; i<12; i++) {
		result[0][i] = 0;
		result[1][i] = 0;
	}

	// シミュレーション
	for(var i=0; i<simulate_count; i++) {
		task_result = tryTask(initilal_threat, 0);
		result[task_result[0]][task_result[1]]++;
	}

	// シミュレーション結果をパーセンテージに正規化
	for(var i=0; i<12; i++) {
		result[0][i] = result[0][i] / simulate_count * 100;
		result[1][i] = result[1][i] / simulate_count * 100;
	}

	return result;
}

function rollDie(faces) {
	return Math.floor(Math.random() * faces) + 1;
}
