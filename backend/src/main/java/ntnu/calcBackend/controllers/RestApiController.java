package ntnu.calcBackend.controllers;

import ntnu.calcBackend.logic.Calculator;
import ntnu.calcBackend.model.Calculation;
import ntnu.calcBackend.model.User;
import ntnu.calcBackend.repositories.CalculationRepository;
import ntnu.calcBackend.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin()
@RestController
public class RestApiController {

    Logger logger = LoggerFactory.getLogger(RestApiController.class);

    @Autowired
    private CalculationRepository calculationRepository;
    @Autowired
    private UserRepository userRepository;

    @CrossOrigin()
    @RequestMapping(value="/calc", method=RequestMethod.POST)
    public Map<String, String> process(@RequestBody Map<String, Object> payload, Authentication authentication) {
        if (authentication!=null){
            if (authentication.isAuthenticated()){
                Calculator calc = new Calculator(Double.parseDouble((String) payload.get("firstValue")), Double.parseDouble((String)payload.get("secondValue")), (String)payload.get("operator"));
                Map<String, String> returnObject = new HashMap<>();
                logger.info("Processing calculation: "+payload.get("firstValue") + " " +payload.get("operator") + " " +payload.get("secondValue"));
                String answer = calc.doCalc();
                String history = calc.getHistory();
                returnObject.put("answer", answer);
                returnObject.put("history", history);
                logger.info("Answer: " + answer);
                authentication.getName();
                User user = userRepository.findByUsername(authentication.getName());
                calculationRepository.save(new Calculation(history, user));
                return returnObject;
            }
        }
        Map<String, String> returnObject = new HashMap<>();
        returnObject.put("history", "Not authorized");
        returnObject.put("answer", "Not authorized");
        return returnObject;
    }

    @CrossOrigin
    @RequestMapping(value = "/history", method=RequestMethod.GET)
    public ArrayList<String> getHistory(Authentication authentication){
        User user = userRepository.findByUsername(authentication.getName());
        logger.info("Sending all calculations by: "+user.getUsername());
        ArrayList<Calculation> arr= calculationRepository.findCalculationsByUser(user);
        ArrayList<String> strings = new ArrayList<>();
        for(Calculation calc: arr){
            strings.add(calc.getCalculation());
        }
        return strings;
    }
}