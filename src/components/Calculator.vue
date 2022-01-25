<template>
  <h1 id="title">Calculator</h1>
  <div id="page">
    <div id="calc">
      <div id="input">{{ current }}</div>

      <div class="buttons">
        <button id="clear" @click="clear">C</button>
        <button id="ans" @click="previousButton">Ans</button>
        <button id="delete" @click="deleteButton()">Del</button>
        <button id="pluss" @click="operatorSelection('+')">+</button>

        <button @click="buttonClick(1)">1</button>
        <button @click="buttonClick(2)">2</button>
        <button @click="buttonClick(3)">3</button>
        <button id="minus" @click="operatorSelection('-')">-</button>

        <button @click="buttonClick(4)">4</button>
        <button @click="buttonClick(5)">5</button>
        <button @click="buttonClick(6)">6</button>
        <button id="multiply" @click="operatorSelection('*')">*</button>

        <button @click="buttonClick(7)">7</button>
        <button @click="buttonClick(8)">8</button>
        <button @click="buttonClick(9)">9</button>
        <button id="divide" @click="operatorSelection('/')">/</button>

        <button id="null"></button>
        <button id="0" @click="buttonClick(0)">0</button>
        <button id="comma" @click="comma">.</button>
        <button id="equals" @click="equals()">=</button>
      </div>
    </div>
    <div id="historyBox">
      <div id="history">
        <ul id="list">
          <li v-for="value in history" v-bind:key="value">{{ value }}</li>
        </ul>
      </div>
      <button id="clearBtn" @click="clearButton()">Clear</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: "",
      previous: "",
      operator: "",
      firstValue: "",
      secondValue: "",
      history: [],
    };
  },
  methods: {
    buttonClick(value) {
      this.current = this.current + "" + value;
    },
    clear() {
      this.current = "";
    },
    equals() {
      this.secondValue = this.current;
      switch (this.operator) {
        case "+":
          this.current =
            parseFloat(this.firstValue) + parseFloat(this.secondValue);
          this.history.push(
            this.firstValue + "+" + this.secondValue + "=" + this.current + "\n"
          );
          break;
        case "-":
          this.current =
            parseFloat(this.firstValue) - parseFloat(this.secondValue);
          this.history.push(
            this.firstValue + "-" + this.secondValue + "=" + this.current + "\n"
          );
          break;
        case "*":
          this.current =
            parseFloat(this.firstValue) * parseFloat(this.secondValue);
          this.history.push(
            this.firstValue + "*" + this.secondValue + "=" + this.current + "\n"
          );
          break;
        case "/":
          this.current =
            parseFloat(this.firstValue) / parseFloat(this.secondValue);
          this.history.push(
            this.firstValue + "/" + this.secondValue + "=" + this.current + "\n"
          );
          break;
        default:
          console.log("Dust");
      }
    },
    operatorSelection(operator) {
      this.operator = operator;
      this.firstValue = this.current;
      this.current = "";
    },
    deleteButton() {
      this.current = this.current.slice(0, -1);
    },
    previousButton() {
      this.current = this.previous;
    },
    comma() {
      if (!this.current.includes(".")) {
        this.current = this.current + ".";
      }
    },
    clearButton() {
      this.history = [];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#title {
  padding: 10px;
}

#calc {
  max-width: 1000px;
  margin: auto;
}

#historyBox {
  background-color: #1c1b18;
  width: 70%;
  border-radius: 15px;
  height: 100%;
  alignment: left;
  border: 2px solid #333029;
  color: #ccc2a6;
  max-height: 265px;

}

#history{
  align-items: center;
  max-height: 205px;
  overflow: auto;
}

#page {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: 0;
  width: 100%;
  max-width: 800px;
  gap: 10px;
  margin: auto;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  alignment: right;
}

button {
  box-shadow: 0px 1px 0px 0px #1c1b18;
  background: #eae0c2 linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%);
  border-radius: 15px;
  border: 2px solid #333029;
  display: inline-block;
  cursor: pointer;
  color: #505739;
  font-family: Arial;
  font-size: 14px;
  font-weight: bold;
  padding: 12px 16px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ffffff;
}

button:hover {
  background: linear-gradient(to bottom, #ccc2a6 5%, #eae0c2 100%);
  background-color: #ccc2a6;
}
button:active {
  position: relative;
  top: 1px;
}

h1 {
  color: #111;
  font-family: "Helvetica Neue", sans-serif;
  font-size: 40px;
  font-weight: bold;
  letter-spacing: -1px;
  line-height: 1;
  text-align: center;
}

#input {
  width: 94%;
  height: 30px;
  background-color: #d5a021;
  margin: 3px;
  padding: 4px;
  border-radius: 15px;
  border: 2px solid #333029;
  font-size: 190%;
  color: #000000;
  text-align: right;
}

#list {
  list-style-type: none;
  padding: 0px;
}

#clearBtn {
  margin: 10px;
  padding: 10px;
}
</style>
