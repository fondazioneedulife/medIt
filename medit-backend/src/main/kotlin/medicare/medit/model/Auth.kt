package medicare.medit.model

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "auth")
data class Auth(
    @Id
    val userId: Long,
    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    val user: User,
    val password: String,
    val failedAttempts: Int,
    val lastLogin: LocalDateTime,
    val syncedAt: LocalDateTime
)
