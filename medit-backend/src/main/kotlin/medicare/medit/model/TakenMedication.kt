package medicare.medit.model

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "taken_medications")
data class TakenMedication(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    @ManyToOne
    @JoinColumn(name = "reminder_id")
    val reminder: Reminder,
    val dateTime: LocalDateTime,
    var syncedAt: LocalDateTime
)
