package ntnu.calcBackend.model;

import javax.persistence.*;

@Entity
public class Calculation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String calculation;
    @ManyToOne
    private User user;

    protected Calculation() {

    }

    public Calculation(String calculation, User user){
        this.calculation = calculation;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public String getCalculation() {
        return calculation;
    }
}
