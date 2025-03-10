package medicare.medit.mapper

import medicare.medit.dto.ReminderApiDTO
import medicare.medit.model.Medication
import medicare.medit.model.Reminder
import org.springframework.stereotype.Component
import java.time.OffsetDateTime

@Component
class ReminderMapper {
    fun toReminder(dto: ReminderApiDTO, medication: Medication): Reminder {
        return Reminder(
            id = dto.id,
            medication = medication,
            reminderDateTime = dto.reminderDateTime.toLocalDateTime(),
            idGroup = dto.idGroup,
            syncedAt = dto.syncedAt.toLocalDateTime()
        )
    }

    fun toReminderDTO(reminder: Reminder): ReminderApiDTO {
        return ReminderApiDTO()
            .id(reminder.id)
            .medicationId(reminder.medication.id)
            .reminderDateTime(reminder.reminderDateTime.atOffset(OffsetDateTime.now().offset))
            .idGroup(reminder.idGroup)
    }
}
