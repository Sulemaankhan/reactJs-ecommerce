package example;

import org.springframework.web.bind.annotation.*;

/**
 * Controller-level CORS with @CrossOrigin.
 * Use this on individual controllers if you prefer over global config.
 */
@RestController
@RequestMapping("/shopping-service/products")
@CrossOrigin(
    originPatterns = "*",
    allowedHeaders = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS, RequestMethod.HEAD},
    allowCredentials = "true",
    maxAge = 86400
)
public class ControllerCrossOriginExample {

    @GetMapping
    public String list() {
        return "[]";
    }

    @PostMapping
    public String create(@RequestBody Object body) {
        return "created";
    }
}
