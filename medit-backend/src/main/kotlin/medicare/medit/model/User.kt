package medicare.medit.model

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "users")
data class User(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    @Column(unique = true)
    val email: String,
    val firstName: String,
    val role: RoleEnum,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime,
    val timezone: String,
    val language: String,
    val syncedAt: LocalDateTime
)
