package at.alex.dqm.repository;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.lessThan;
import static org.junit.Assert.assertThat;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.transaction.Transactional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import at.alex.dqm.RepositoryTestConfig;
import at.alex.dqm.domain.Check;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = RepositoryTestConfig.class)
@Transactional
public class CheckRepositoryTest {

    private static final Logger LOGGER = LoggerFactory.getLogger(CheckRepositoryTest.class.getName());

    @PersistenceContext(unitName = "default", type = PersistenceContextType.TRANSACTION)
    protected EntityManager entityManager;

    @Autowired
    private CheckRepository repository;

    @Before
    public void setup() {

        entityManager.clear();
        entityManager.flush();
    }

    @Test
    public void modifiedD() {
    	
        Check check = new Check();
//        check.setCreatedDate(LocalDateTime.now());
//        entityManager.persist(check);
//        entityManager.flush();
        repository.saveAndFlush(check);
        
        List<Check> all = repository.findAll();
        assertThat(all.size(), equalTo(1));
        Check check2 = all.get(0);
		assertThat(check2.getId(), equalTo(1L));
        LocalDateTime createdDate = check2.getCreatedDate();
		assertThat(createdDate, lessThan(LocalDateTime.now()));
		assertThat(createdDate, equalTo(check2.getModifiedDate()));
		
		check2.setName("name");
		repository.saveAndFlush(check2);
		
		Check findOne = repository.findOne(check2.getId());
		assertThat(findOne.getModifiedDate(), greaterThan(findOne.getCreatedDate()));
        
    }
}