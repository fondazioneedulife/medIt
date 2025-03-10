package medicare.medit

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class MeditApplication

fun main(args: Array<String>) {
	runApplication<MeditApplication>(*args)
}
