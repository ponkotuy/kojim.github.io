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
elmで実装してありソースコードは[こちら](https://github.com/kojim/FactorioCalculator) 。

# プレイ方針
自分の場合、ライン設計はシンプルさを重視する。
具体的には、原則銅と鉄のみをベルトコンベアで流し、必要となるインサータや電子回路等の中間部品はその場で生産する。

# 設計コレクション
## 石炭発電所
拡張性を重視して広い場所に建てよう。  
![石炭発電所](../images/factorio/line_coalplant.png)

## サイエンスパック1 & サイエンスパック2 & スマートインサータ
![サイエンスパック1 & サイエンスパック2 & スマートインサータ](../images/factorio/line_sp12.png)

## 原油コンビナート
本当はもっと広い場所に建て、重油/軽油分解は離れた場所で行ったほうが何かと楽。  
![原油コンビナート](../images/factorio/line_oil.png)

## 精錬施設
鉄の生産量が低下しても全ラインに均等に供給され、詰まったラインがあっても余剰分は別のラインに供給される仕組み。端はベルトコンベアを片側しか使えないので鋼鉄にしてしまっている。  
![精錬施設](../images/factorio/line_refining.png)

## 発展回路量産
発展回路組立機は縦方向に8つ。このSSは1箇所ミスがあり、実際には銅線組立機は1列につき3つ必要なので注意。サイエンスパック3を作るだけなら1列でこと足りるので、2列目以降は建設ロボが解禁されてからでも良い。  
![発展回路量産](../images/factorio/line_circuit2.png)


# やること一覧
* 精錬設備
* 石炭発電所
* SP1,2&スマートインサータ生産ライン
* 日用品(ツール)ライン
  * 電柱,ベルトコンベア1&2,インサータ,リペアキット,弾薬をそれぞれ200個くらいずつ生産。
* 日用品(素材)ライン
  * 電子回路,鋼鉄を一定数生産
* 原油コンビナート
* 電池&プラスチック生産ライン
* 発展回路量産ライン
  * 
* SP3生産ライン
* 応用原油処理への切り替え
* 電気精錬設備


# おまけ
data\base\graphics\icons\alien-artifact.png 差し替え画像。

![クッソ汚いエイリアンアーティファクト](../images/factorio/alien-artifact.png)

使用例

![使用例](../images/factorio/alien-artifact-ss.png)
