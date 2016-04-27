---
title: Factorio自分用プレイメモ
---

# 資源ざくざくで囲い込みが容易な立地のMapコード
    >>>AAAMAAMAAAADAwYAAAAEAAAAY29hbAMFBAoAAABjb3BwZXItb3Jl
    AwUECQAAAGNydWRlLW9pbAMFBAoAAABlbmVteS1iYXNlBQUECAAAAGl
    yb24tb3JlAwUEBQAAAHN0b25lAwQEOdHDHvxXAADfmwAAAAAAAAAAAA
    AFAEBJg2Y=<<<


# ツール
[必要施設数計算機](../FactorioCalculator.html)
生産物を秒間いくつ作りたいか入力すると、それに必要な施設数を表示してくれる。
最新データに追従できているかは怪しい。
というかこれを使うくらいなら、公式Forum内で公開されている[こっち](http://www.factorioforums.com/forum/viewtopic.php?f=8&t=5576) のツールを使ったほうが良いと思うよ。


# プレイ方針
自分の場合、ライン設計はシンプルさを重視する。
具体的には、原則銅と鉄のみをベルトコンベアで流し、必要となるインサータや電子回路等の中間部品はその場で生産する。


# 設計コレクション
## 石炭発電所
拡張性を重視して広い場所に建てよう。バージョン0.12になってレーザータレットの消費電力量が増えた結果、中盤以降でも活躍の機会が増えたため、石炭輸送のベルトコンベアは4列にしておいたほうが、拡張性的な意味で良いかもしれない。
![石炭発電所](../images/factorio/line_coalplant.png)

## 鉄板銅板搬出路
入力側は4列で十分足りる。中盤以降は上部を高速分配器に置き換えるのが吉。
![鉄板銅板搬出路](../images/factorio/line_plate_out.png)

## サイエンスパック1 & サイエンスパック2 & 日用品
![サイエンスパック1 & サイエンスパック2 & 日用品](../images/factorio/line_sp12.png)

## 原油コンビナート
液体は地下を移動させるのが楽なので、電池やプラスチックは銅と鉄にアクセスしやすい離れた場所で作ったほうが良い。
![原油コンビナート](../images/factorio/line_oil.png)

## 精錬施設
鉄の生産量が低下しても全ラインに均等に供給され、詰まったラインがあっても余剰分は別のラインに供給される仕組み。端はベルトコンベアを片側しか使えないので鋼材にしてしまっている。  
![精錬施設](../images/factorio/line_refining.png)

## 硫酸生産
![硫酸生産](../images/factorio/line_s_acid.png)

## 発展回路量産
発展回路組立機は縦方向に8つ。このSSは1箇所ミスがあり、実際には銅線組立機は1列につき3つ必要なので注意。サイエンスパック3を作るだけなら1列でこと足りるので、2列目以降は建設ロボが解禁されてからでも良い。  
![発展回路量産](../images/factorio/line_circuit2.png)

## 制御基盤量産
![制御基盤量産](../images/factorio/line_circuit3.png)

# やること一覧
* 精錬設備
    * 燃料は手動運搬
* 石炭発電所
* 初期技術開発
    * 組立機, 分配器を解禁
* 精錬設備
    * 燃料運搬を自動化
* 初期ライン作成
    * 最序盤限定の使い捨てラインを構築。弾薬*3, ベルトコンベア, インサータ生産
* 初期技術開発
    * マシンガン, タレット, 防壁, 鋼材, ランプを解禁
* 防衛体制構築
    * 360度防壁&ガンタレット配置
* SP1,2&日用品ライン作成
    * SP1,2および電柱,ベルトコンベア1&2,インサータ,リペアキット,弾薬をそれぞれ200個くらいずつ生産。
* 技術開発
    * 組立機2, 原油施設, 電気精錬, レーザータレット, ロボットの順番で解禁していく。
* 日用品(素材)ライン
    * 電子回路,鋼材を一定数生産
* 原油コンビナート
* 電池&プラスチック生産ライン
* 発展回路量産ライン
* SP3生産ライン
* 応用原油処理への切り替え
* 電気精錬設備
* ロボットネットワークの構築
* ソーラーパネル&蓄電池用の土地の確保と施設
* 制御基盤量産
* エイリアンアーティファクト確保
* ロケットサイロの下準備

# ライン構成
* 石炭発電所
    * 役割: ソーラーパネルと蓄電池が量産されるまでの発電
    * 搬入資源
        * 石炭(ベルトコンベア1/秒間10個) (発電機48個までで1本, それ以降でもう1本)
    * 備考
        * 採掘機3:ボイラー8:発電機6を1セットで運用。
        * 電力が不足する前に6,12,24,48,96と倍々に増やしていく。48個では中盤やや辛い。
* 1st line
    * 役割: SP1と2、および日用品の生産
    * 搬入資源
        * 鉄(ベルトコンベア2/秒間20個)
        * 銅(ベルトコンベア2/秒間20個)
    * 生産物
        * [SP1(毎秒0.75個)]( http://kojim.github.io/FactorioCalculator.html#product=SciencePack1&cps=0.75&imports=&language=Japanese )
        * [SP2(毎秒0.75個)]( http://kojim.github.io/FactorioCalculator.html#product=SciencePack2&cps=0.75&imports=&language=Japanese )
        * 日用品
            * 電柱
            * ベルトコンベア1
            * ベルトコンベア2
            * インサータ
            * リペアキット
            * 弾薬
            * 歯車
            * パイプ
            * 電子回路
    * 備考
        * 日用品を作るために広いスペースが必要。32マス程の幅があると理想。
        * ラインの末尾に銅鉄格納用チェストを配置しておくと便利。
        * ベルトコンベア2はフル稼働させると大量の鉄を必要とするので注意 [参考]( http://kojim.github.io/FactorioCalculator.html#product=FastTransportBelt&cps=1.5&imports=&language=Japanese )
* 2nd line
    * 役割: 電子回路と鋼材、ソーラーパネルの量産
    * 搬入資源
        * 鉄(ベルトコンベア2/秒間20個)
        * 銅(ベルトコンベア2/秒間20個)
    * 生産物
        * 日用中間素材
            * [電子回路(毎秒4個)]( http://kojim.github.io/FactorioCalculator.html#product=ElectronicCircuit&cps=4&imports=&language=Japanese )
            * [鋼材(毎秒1個)]( http://kojim.github.io/FactorioCalculator.html#product=SteelPlate&cps=1&imports=&language=Japanese )
        * 他
            * [ソーラーパネル(毎秒0.3個)]( http://kojim.github.io/FactorioCalculator.html#product=SolarPanel&cps=0.3&imports=&language=Japanese )
    * 備考
        * 本格的な鋼材生産は電気炉が揃ってからでよい。
        * 早めに作成し電子回路を作りためておかないと、建造ロボの製造がいくら待っても終わらない。
* 3rd line
    * 役割: 原油系資源を使う物資の量産
    * 搬入資源
        * 鉄&銅(ベルトコンベア1/秒間10個)
        * 石炭(ベルトコンベア1/秒間10個
        * プロパンガス
        * 潤滑油
    * 生産物
        * [電池(毎秒4個)]( http://kojim.github.io/FactorioCalculator.html#product=Battery&cps=4&imports=&language=Japanese )
        * [プラスチック(毎秒8個)]( http://kojim.github.io/FactorioCalculator.html#product=PlasticBar&cps=8&imports=&language=Japanese )
        * [飛行ロボットフレーム(毎秒0.075個)]( http://kojim.github.io/FactorioCalculator.html#product=FlyingRobotFrame&cps=0.075&imports=&language=Japanese )
        * [蓄電池(毎秒0.225個)]( http://kojim.github.io/FactorioCalculator.html#product=BasicAccumulator&cps=0.225&imports=&language=Japanese )
    * 備考
        * 終盤必要になってくるので、電気エンジンユニットも作りためておこう。
* 4th line
    * 役割: 発展回路の量産
    * 搬入資源
        * 鉄(ベルトコンベア2/秒間20個)
        * 銅(ベルトコンベア2/秒間20個)
        * プラスチック(ベルトコンベア1/秒間10個)
    * 生産物
        * [発展回路(毎秒3.75個)]( http://kojim.github.io/FactorioCalculator.html#product=AdvancedCircuit&cps=3.75&imports=&language=Japanese )
    * 備考
        * 発展回路組立機は中盤は8個で足りる。終盤は32個でも十分。40個あれば磐石。
* 5th line
    * 役割: SP3の生産
    * 搬入資源
        * 鉄(ベルトコンベア2/秒間20個)
        * 銅(ベルトコンベア2/秒間20個)
        * 発展回路
        * 電池
    * 生産物
        * SP3 ( http://kojim.github.io/FactorioCalculator.html#product=SciencePack3&cps=0.75&imports=&language=Japanese )
            * 秒間生産: 1個(組立機数:12)
    * 備考
        * SP3用の鋼材、スマートインサータもここで生産。
        * 12個あるSP3の組立機を一列に並べるのはさすがに難しい。おとなしく2列にしよう。
        * 電気炉が手に入るまでは鋼材は手で運んでくるのが無難。
* 6th line
    * 役割: 制御基盤と生産速度モジュール1の量産
    * 搬入資源
        * 鉄(ベルトコンベア2/秒間20個)
        * 銅(ベルトコンベア2/秒間20個)
        * 発展回路
        * 硫酸
    * 生産物
        * 制御基盤
        * [生産速度モジュール1(毎秒0.6個)]( http://kojim.github.io/FactorioCalculator.html#product=SpeedModule1&cps=0.6&imports=&language=Japanese )
    * 備考
        * 大量消費する電子回路を搬入してくるのは現実的でないのでここで銅鉄から生産しよう。
        * 生産速度モジュールの量産はロケットサイロの研究が終わるまでは必要ない。それまではパワーアーマーMK2のためのモジュール生産をしていてもらおう。

# Tips
サイエンスパックの生産は秒間0.75個で十分。SP1と2はその気になれば、その倍くらい余裕で作れるが、研究だけ急いでもすぐにそれ以外がボトルネックになってくる。そして何よりサイエンスパック3をそれにあわせて量産するのがキツい。

精錬は、電気掘削機20で採掘した鉱石をベルトコンベア1の両側に乗せて運搬し、電気炉18で精錬するのが良い。
ベルトコンベア2を使えばもっと流量は増やせるが、縦に長すぎるラインは扱いが面倒。

# チートとか
微妙すぎる性能のランプは、 data\base\prototypes\entity\demo-entities.lua の name = "small-lamp" 付近の light = {intensity = 0.9, size = 40} の値を変更してやることで強化することができる。200くらいにして遊ぶのが個人的にはオススメ。

ロボポートの範囲狭すぎだよって人は、data\base\prototypes\entity\entities.lua の name = "roboport" 付近の logistics_radius = 25, construction_radius = 50 あたりを修正すれば広げられる。個人的にはlogistics_radiusは50で良いと思う。

撤去計画で木材だけ選ぶの面倒だよ、最初から撤去計画持たせてくれよ、って人は、ゲーム開始直後にコンソールを開いて以下を打ち込むべし。

    /c game.local_player.get_inventory(1).insert{name = "deconstruction-planner", count = 1}

# 自作MOD
500個スタックできるコンクリートの上位タイルを追加。
[ダウンロード](http://kojim.github.io/files/Asphalt_0.0.1.zip)

# おまけ
data\base\graphics\icons\alien-artifact.png 差し替え画像。  
![クッソ汚いエイリアンアーティファクト](../images/factorio/alien-artifact.png)

使用例  
![使用例](../images/factorio/alien-artifact-ss.png)

