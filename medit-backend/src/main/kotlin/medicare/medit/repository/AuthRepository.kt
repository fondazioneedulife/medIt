package medicare.medit.repository

import medicare.medit.model.Auth
import org.springframework.data.jpa.repository.JpaRepository

interface AuthRepository : JpaRepository<Auth, Long>
