package ntnu.calcBackend.repositories;

import ntnu.calcBackend.model.Calculation;
import ntnu.calcBackend.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface CalculationRepository extends CrudRepository<Calculation, Long> {
    ArrayList<Calculation> findCalculationsByUser(User user);
}
