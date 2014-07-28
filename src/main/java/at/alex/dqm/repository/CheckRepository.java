package at.alex.dqm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import at.alex.dqm.domain.Check;

@Repository
public interface CheckRepository extends JpaRepository<Check, Long> {

}
