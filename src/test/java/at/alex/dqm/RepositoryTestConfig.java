package at.alex.dqm;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableAutoConfiguration
@EnableJpaAuditing
@ComponentScan(basePackages = {"at.alex.dqm.domain", "at.alex.dqm.repository"})
public class RepositoryTestConfig {

}