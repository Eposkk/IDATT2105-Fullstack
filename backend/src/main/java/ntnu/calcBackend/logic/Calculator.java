package ntnu.calcBackend.logic;

public class Calculator {
    private double firstNumber;
    private double secondNumber;
    private String operator;
    private String answer;

    public Calculator(double firstNumber, double secondNumber, String operator) {
        this.firstNumber = firstNumber;
        this.secondNumber = secondNumber;
        this.operator = operator;
    }

    public String doCalc(){
        switch(operator){
            case "+":
               answer = String.valueOf(firstNumber + secondNumber);
               break;
            case "-":
                answer = String.valueOf(firstNumber - secondNumber);
                break;
            case "*":
                answer = String.valueOf(firstNumber * secondNumber);
                break;
            case "/":
                answer = String.valueOf(firstNumber / secondNumber);
                break;
            default:
                this.answer = String.valueOf(0);
                throw new IllegalArgumentException("Not an operator");
        }
        if (Double.parseDouble(answer) % 1 == 0){
            return String.valueOf(answer);
        }else return String.valueOf(answer);
    }

    public String getHistory(){
        return (firstNumber + " " + operator + " " + secondNumber + " = " + answer);
    }

}
