package medicare.medit.model

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "reminders")
data class Reminder(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    @ManyToOne
    @JoinColumn(name = "medication_id")
    val medication: Medication,
    val reminderDateTime: LocalDateTime,
    @Column(unique = true)
    val idGroup: String,
    val syncedAt: LocalDateTime
)
