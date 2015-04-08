<div>
  Quantity: <input type="number" min="0" ng-model="calculator.qty" required >
</div>
<div>
  Costs: <input type="number" min="0" ng-model="calculator.cost" required >
  <select ng-model="calculator.inCurr">
    <option ng-repeat="c in calculator.currencies">{{c}}</option>
  </select>
</div>
<div>
  <b>Total:</b>
  <span ng-repeat="c in calculator.currencies">
    {{calculator.total(c) | currency:c}}
  </span>
  <button id='hidden-button' class="btn" ng-click="calculator.pay()">Pay</button>
</div>

<br>
<br>
Costs: <input type="number" min="0" ng-model="calculator.mycost">
<b>my cost: {{calculator.mycost}}</b>
<br>
