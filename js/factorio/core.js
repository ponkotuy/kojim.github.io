// -------------------------------------------
// クラス定義
// -------------------------------------------
// 生産物用抽象クラス
var Product = function(){};
Product.prototype = {
	/*
	 * 生産物を秒間 product_per_sec個作るのに必要な施設数
	 */
	require_builder_count: function(product_per_sec) {
		return product_per_sec / ((1/this.req_time) * this.result_count * this.build_rate);
	},
	/*
	 * 生産物を秒間 product_per_sec個作るのに必要な素材と量
	 * import_ingredientsに含まれる素材は計上しない
	 */
	require_ingredient_count: function(product_per_sec, import_ingredients) {
		var thiz = this;
		// map   : [{鉄:毎秒1}, {銅:毎秒2, 鉄:毎秒1}], {}] のようなリストを作る。
		// reduce: {鉄:毎秒3, 銅:毎秒2} ハッシュを作る。
		var result = this.ingredients.map(function(i) {
			var ingredient       = i[0]
			var ingredient_count = i[1];

			// 素材が搬入品に含まれていれば素材の素材の作成は不要
			if ($.inArray(ingredient.name, import_ingredients) !== -1) {
				var result = {};
				result[ingredient.name] = ingredient_count;
				return result;
			}
			// 計算式:
			//   施設1つあたりの必要素材数
			//   / ビルド時間
			//   * 施設数
			var build_time     = thiz.req_time/thiz.build_rate;
			var ingredient_cps = ingredient_count / build_time * thiz.require_builder_count(product_per_sec);
			var result         = ingredient.require_ingredient_count(ingredient_cps, import_ingredients);
			return result;
		}).reduce(function(pre, cur) {
			$.each(cur, function(ingredient_name, ingredient_count) {
				if (pre[ingredient_name] === undefined) {
					// 値がまだないとき
					pre[ingredient_name] = 0;
				}
				pre[ingredient_name] += ingredient_count;
			});
			return pre;
		}, {});
		if (product_per_sec != 0) {
			result[this.name] = product_per_sec;
		}
		return result;
	}
};

// 組立機で作るもの
var AssemblyProduct = function(name, req_time, result_count, ingredients) {
	this.name         = name;
	this.req_time     = req_time;
	this.result_count = result_count;
	this.ingredients  = ingredients;
};
AssemblyProduct.prototype = new Product();
AssemblyProduct.prototype.build_rate = 0.75;

// 化学プラントで作るもの
var ChemicalProduct = function(name, req_time, result_count, ingredients) {
	this.name         = name;
	this.req_time     = req_time;
	this.result_count = result_count;
	this.ingredients  = ingredients;
};
ChemicalProduct.prototype = new Product();
ChemicalProduct.prototype.build_rate = 1.25;

// 原油精製
var OilRefinery = function(name, req_time, result_count, ingredients) {
	this.name         = name;
	this.req_time     = req_time;
	this.result_count = result_count;
	this.ingredients  = ingredients;
};
OilRefinery.prototype = new Product();
OilRefinery.prototype.build_rate = 1;

// 採掘機で掘り出すもの
var Ore = function(name, hardness, req_time) {
	this.name     = name;
	this.hardness = hardness;
	this.req_time = req_time;
};
Ore.prototype = new Product();
Ore.prototype.ingredients = [];
Ore.prototype.require_builder_count =  function(product_per_sec) {
	var power = 3;
	var speed = 0.5;
	return product_per_sec / (this.req_time / ((power - this.hardness) * speed));
};

// 溶鉱炉で作るもの
var MetalPlate = function(name, req_time, result_count, ingredients) {
	this.name         = name;
	this.req_time     = req_time;
	this.result_count = result_count;
	this.ingredients  = ingredients;
};
MetalPlate.prototype = new Product();
MetalPlate.prototype.build_rate = 2;


// -------------------------------------------
// データ定義
// -------------------------------------------
// -----------------
// 鉱石
// -----------------
var iron_ore = new Ore(
  "鉄鉱石", 0.9, 2
);
var copper_ore = new Ore(
  "銅鉱石", 0.9, 2
);
var coal = new Ore(
  "石炭", 0.9, 2
);

// -----------------
// 精錬系
// -----------------
var iron_plate = new MetalPlate(
  "鉄板", 3.5, 1, [[iron_ore, 1]]
);
var copper_plate = new MetalPlate(
  "銅板", 3.5, 1, [[copper_ore, 1]]
);
var steel_plate = new MetalPlate(
  "鋼材", 17.5, 1, [[iron_plate, 5]]
);

// -----------------
// 原油系
// -----------------
var crude_oil = new OilRefinery(
  "原油", 1, 5, []
);
var petroleum_gas = new OilRefinery(
  "プロパンガス", 5, 5.5, [[crude_oil, 10]]
);
var light_oil = new OilRefinery(
  "軽油", 5, 4.5, [[crude_oil, 10]]
);
var heavy_oil = new OilRefinery(
  "重油", 5, 1, [[crude_oil, 10]]
);
var lubricant = new ChemicalProduct(
  "潤滑油", 1, 1, [[heavy_oil, 1]]
);

// -----------------
// 化学系
// -----------------
var plastic_bar = new ChemicalProduct(
  "プラスチック棒", 1, 2, [[coal, 1], [petroleum_gas, 3]]
);
var sulfur = new ChemicalProduct(
  "硫黄", 1, 2, [[petroleum_gas, 3]]
);
var sulfuric_acid = new ChemicalProduct(
  "硫酸", 1, 5, [[sulfur, 2], [iron_plate, 1]]
);
var explosives = new ChemicalProduct(
  "火薬", 5, 1, [[sulfur, 1], [coal, 1]]
);

// -----------------
// 中間素材
// -----------------
var iron_gear_wheel = new AssemblyProduct(
  "歯車", 0.5, 1, [[iron_plate, 2]]
);
var copper_cable = new AssemblyProduct(
  "銅線", 0.5, 2, [[copper_plate, 1]]
);
var pipe = new AssemblyProduct(
  "パイプ", 0.5, 1, [[iron_plate, 1]]
);
var electronic_circuit = new AssemblyProduct(
  "電子回路", 0.5, 1, [[iron_plate, 1], [copper_cable, 3]]
);
var advanced_circuit = new AssemblyProduct(
  "発展回路", 8, 1, [[electronic_circuit, 2], [plastic_bar, 2], [copper_cable, 4]]
);
var processing_unit = new AssemblyProduct(
  "制御基盤", 8, 1, [[electronic_circuit, 20], [advanced_circuit, 2], [sulfuric_acid, 0.5]]
);

// -----------------
// 物流系
// -----------------
var basic_transport_belt = new AssemblyProduct(
  "ベルトコンベア", 0.5, 2, [[iron_plate, 1], [iron_gear_wheel, 1]]
);
var basic_inserter = new AssemblyProduct(
  "インサーター", 0.5, 1, [[electronic_circuit, 1], [iron_gear_wheel, 1], [iron_plate, 1]]
);
var fast_inserter = new AssemblyProduct(
  "高速インサーター", 0.5, 1, [[electronic_circuit, 2], [iron_plate, 2], [basic_inserter, 1]]
);
var smart_inserter = new AssemblyProduct(
  "スマートインサーター", 0.5, 1, [[fast_inserter, 1], [electronic_circuit, 4]]
);

// -----------------
// 機械類
// -----------------
var battery = new ChemicalProduct(
  "電池", 5, 1, [[sulfuric_acid, 2], [iron_plate, 1], [copper_plate, 1]]
);
var engine_unit = new AssemblyProduct(
  "エンジンユニット", 20, 1, [[steel_plate, 1], [iron_gear_wheel, 1], [pipe, 2]]
);
var electric_engine_unit = new AssemblyProduct(
  "電気エンジンユニット", 20, 1, [[engine_unit, 1], [lubricant, 2], [electronic_circuit, 2]]
);
var flying_robot_frame = new AssemblyProduct(
  "飛行ロボットフレーム", 20, 1, [[electric_engine_unit, 1], [battery, 2], [steel_plate, 1], [electronic_circuit, 3]]
);

// -----------------
// 電気系
// -----------------
var solar_panel = new AssemblyProduct(
  "ソーラーパネル", 10, 1, [[steel_plate, 5], [electronic_circuit, 15], [copper_plate, 5]]
);
var basic_accumulator = new AssemblyProduct(
  "蓄電池", 10, 1, [[iron_plate, 2], [battery, 5]]
);

// -----------------
// サイエンスパック
// -----------------
var science_pack_1 = new AssemblyProduct(
  "サイエンスパック1", 5, 1, [[copper_plate, 1], [iron_gear_wheel, 1]]
);
var science_pack_2 = new AssemblyProduct(
  "サイエンスパック2", 6, 1, [[basic_transport_belt, 1], [basic_inserter, 1]]
);
var science_pack_3 = new AssemblyProduct(
  "サイエンスパック3", 12, 1, [[battery, 1], [advanced_circuit, 1], [smart_inserter, 1], [steel_plate, 1]]
);

// -----------------
// モジュール
// -----------------
var speed_module1 = new AssemblyProduct(
  "生産速度モジュール1", 15, 1, [[electronic_circuit, 5], [advanced_circuit, 5]]
);
var speed_module2 = new AssemblyProduct(
  "生産速度モジュール2", 30, 1, [[speed_module1, 4], [advanced_circuit, 5], [processing_unit, 5]]
);
var speed_module3 = new AssemblyProduct(
  "生産速度モジュール3", 60, 1, [[speed_module2, 4], [advanced_circuit, 5], [processing_unit, 5]]
);
var productivity_module1 = new AssemblyProduct(
  "エネルギー効率モジュール1", 15, 1, [[electronic_circuit, 5], [advanced_circuit, 5]]
);
var productivity_module2 = new AssemblyProduct(
  "エネルギー効率モジュール2", 30, 1, [[productivity_module1, 4], [advanced_circuit, 5], [processing_unit, 5]]
);
var productivity_module3 = new AssemblyProduct(
  "エネルギー効率モジュール3", 60, 1, [[productivity_module2, 4], [advanced_circuit, 5], [processing_unit, 5]]
);
var effectivity_module1 = new AssemblyProduct(
  "効率化モジュール1", 15, 1, [[electronic_circuit, 5], [advanced_circuit, 5]]
);
var effectivity_module2 = new AssemblyProduct(
  "効率化モジュール2", 30, 1, [[effectivity_module1, 4], [advanced_circuit, 5], [processing_unit, 5]]
);
var effectivity_module3 = new AssemblyProduct(
  "効率化モジュール3", 60, 1, [[effectivity_module2, 4], [advanced_circuit, 5], [processing_unit, 5]]
);

// -----------------
// 戦闘系
// -----------------
var laser_turret = new AssemblyProduct(
  "レーザータレット", 20, 1, [[steel_plate, 20], [electronic_circuit, 20], [battery, 12]]
);
var rocket = new AssemblyProduct(
  "ロケット弾", 8, 1, [[electronic_circuit, 1], [explosives, 2], [iron_plate, 2]]
);
var power_armor_mk2 = new AssemblyProduct(
  "パワーアーマーMK2", 25, 1, [[effectivity_module3, 5], [speed_module3, 5], [processing_unit, 200], [steel_plate, 50]]
);

var products = [
	iron_ore, copper_ore, coal, iron_plate, copper_plate, steel_plate, crude_oil, petroleum_gas, light_oil, heavy_oil, lubricant,
	iron_gear_wheel, copper_cable, pipe, electronic_circuit, advanced_circuit, processing_unit,
	basic_transport_belt, basic_inserter, fast_inserter, smart_inserter,
	plastic_bar, sulfur, sulfuric_acid, explosives,
	battery, engine_unit, electric_engine_unit, flying_robot_frame,
	solar_panel, basic_accumulator,
	science_pack_1, science_pack_2, science_pack_3,
	speed_module1, speed_module2, speed_module3,
	productivity_module1, productivity_module2, productivity_module3,
	effectivity_module1, effectivity_module2, effectivity_module3,
	laser_turret, rocket, power_armor_mk2
];

function getProductByName(name) {
	return products.filter(function(e) {
		return e.name == name;
	})[0];
}
