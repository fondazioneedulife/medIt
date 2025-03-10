package medicare.medit.model

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "medications")
data class Medication(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    @ManyToOne
    @JoinColumn(name = "user_id")
    val user: User,
    val name: String,
    val type: MedicationTypeEnum,
    val dose: String,
    val program: String,
    val quantity: Int,
    val note: String,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime,
    var syncedAt: LocalDateTime
)
