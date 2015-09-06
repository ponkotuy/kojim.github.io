var counter = 0;
var Product = React.createClass({
  getInitialState: function() {
    return {
      product: science_pack_1,
      cps    : 0.5
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
    $.each(this.state.product.require_ingredient_count(this.state.cps), function(name, icps) {
      result.push(<Ingredient key={thiz.state.product.name + '_' + name} product={getProductByName(name)} cps={icps}/>);
    });
    return result;
  },
  handleProductChanged: function(event) {
    var name = event.target.value;
    this.setState({product: getProductByName(name)});
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
  render: function() {
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
              <th>必要搬入数</th>
            </tr>
          </thead>
          <tbody>
            { this.renderIngredients() }
          </tbody>
        </table>
      </div>
    );
  }
});
var Ingredient = React.createClass({
  getInitialState: function() {
    return {
      isImport: false
    };
  },
  render: function() {
    return (
      <tr>
        <td>{this.props.product.name}</td>
        <td>
          <input type='radio' name={this.props.product.name} defaultChecked={!this.state.isImport} >現地</input>
          <input type='radio' name={this.props.product.name} defaultChecked={this.state.isImport} >搬入</input>
        </td>
        <td>{this.props.product.require_builder_count(this.props.cps).toFixed(1)}</td>
        <td>{this.props.cps.toFixed(3)}/s</td>
      </tr>
    );
  }
});

React.render(
  <Product></Product>,
  document.getElementById('app-container')
);