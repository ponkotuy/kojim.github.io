var counter = 0;
var Product = React.createClass({
  getInitialState: function() {
    var product, cps, imports;
    if (this.props.product === undefined) {
      product = science_pack_1;
    } else {
      product = getProductByName(decodeURI(this.props.product));
    }
    if (this.props.cps === undefined) {
      cps = 0.5;
    } else {
      cps = Number(this.props.cps);
    }
    if (this.props.imports === undefined) {
      imports = []
    } else {
      imports = decodeURI(this.props.imports).split('_');
    }
    return {
      product: product,
      cps    : cps,
      imports: imports
    };
  },
  renderProductOptions: function() {
    var thiz = this;
    return products.map(function(p) {
      return(
        <option>{p.name}</option>
      );
    });
  },
  renderIngredients: function() {
    var thiz = this;
    var result = []
    $.each(this.state.product.require_ingredient_count(this.state.cps, this.state.imports), function(name, icps) {
      result.push(
        <Ingredient key={thiz.state.product.name + '_' + name}
                    product={getProductByName(name)} cps={icps}
                    addImport={thiz.addImport}
                    removeImport={thiz.removeImport}
                    cannotImport={thiz.state.product.name == name}
                    isImport={$.inArray(name, thiz.state.imports) !== -1} />
      );
    });
    return result;
  },
  handleProductChanged: function(event) {
    var name = event.target.value;
    this.setState({product: getProductByName(name), imports: []});
  },
  handleCpsChanged: function(event) {
    if (event.target.value == "") {
      return;
    }
    var val = Number(event.target.value);
    if (isNaN(val)) {
      return;
    }
    if (val == 0) {
      return;
    }
    this.setState({cps: Number(event.target.value)});
  },
  addImport: function(name) {
    var imports = this.state.imports;
    imports.push(name);
    this.setState({imports: $.unique(imports)});
  },
  removeImport: function(name) {
    var imports = this.state.imports.filter(function(i) {
      return i != name;
    });
    this.setState({imports: imports});
  },
  render: function() {
    var url = 'http://kojim.github.io/FactorioCalculator.html?product=' + encodeURI(this.state.product.name) +
              '&cps=' + this.state.cps +
              '&imports=' + encodeURI(this.state.imports.join('_'));
    return (
      <div>
        <h2>生産物</h2>
        <p>
        <select onChange={this.handleProductChanged} defaultValue={this.state.product.name}>
          {this.renderProductOptions()}
        </select>
        <input type='text' onChange={this.handleCpsChanged} defaultValue={this.state.cps}></input>/s
        </p>
        <h2>必要素材</h2>
        <table style={{textAlign: 'center'}}>
          <thead>
            <tr>
              <th>名前</th>
              <th>生産方法</th>
              <th>必要設備数</th>
              <th>消費電力</th>
              <th>生産数/搬入数</th>
            </tr>
          </thead>
          <tbody>
            { this.renderIngredients() }
          </tbody>
        </table>
        <p className='parentonly'>
        現在の設定のURL: 
        <input type='text' value={url}/>
        </p>
        <p className='parentonly'>
          <a href='http://kojim.github.io/Factorio%E8%87%AA%E5%88%86%E7%94%A8%E3%83%A1%E3%83%A2/'>戻る</a><br/>
          <a href='http://kojim.github.io/FactorioCalculator_help.html'>ヘルプ</a>
        </p>
      </div>
    );
  }
});
var Ingredient = React.createClass({
  getInitialState: function() {
    return {
      isImport: this.props.isImport,
      cannotImport: false
    };
  },
  handleNotImport: function() {
    this.setState({isImport: false});
    this.props.removeImport(this.props.product.name);
  },
  handleImport: function() {
    this.setState({isImport: true});
    this.props.addImport(this.props.product.name);
  },
  render: function() {
    var req_builder = this.props.product.require_builder_count(this.props.cps);
    return (
      <tr>
        <td>{this.props.product.name}</td>
        <td>
          <input type='radio' name={this.props.product.name} onChange={this.handleNotImport}
                              defaultChecked={!this.state.isImport} >現地</input>
          <input type='radio' name={this.props.product.name} onChange={this.handleImport}
                              defaultChecked={this.state.isImport}
                              disabled={this.props.cannotImport}>搬入</input>
        </td>
        <td>{req_builder.toFixed(1)}</td>
        <td>{this.state.isImport? 0 :(req_builder*this.props.product.energy_usage).toFixed(0)}W</td>
        <td>{this.props.cps.toFixed(3)}/s</td>
      </tr>
    );
  }
});

var params = {}
$.each(window.location.search.substring(1).split('&'), function(i, kv) {
	kv_array = kv.split('=');
	params[kv_array[0]] = kv_array[1];
});
React.render(
  <Product product={params['product']} cps={params['cps']} imports={params['imports']} ></Product>,
  document.getElementById('app-container')
);
if (window !== window.parent) {
  $('#parentonly').css('display', 'none');
}
