package at.alex.dqm.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class DqmController {

    private static final Logger LOGGER = LoggerFactory
            .getLogger(DqmController.class.getName());

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String home() {
        LOGGER.info("Requesting home");
        return "home";
    }
}
