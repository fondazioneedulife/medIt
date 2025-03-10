package medicare.medit.mapper

import medicare.medit.dto.TakenMedicationApiDTO
import medicare.medit.model.Reminder
import medicare.medit.model.TakenMedication
import org.springframework.stereotype.Component
import java.time.OffsetDateTime

@Component
class TakenMedicationMapper {
    fun toTakenMedication(dto: TakenMedicationApiDTO, reminder: Reminder): TakenMedication {
        return TakenMedication(
            id = dto.id,
            reminder = reminder,
            dateTime = dto.dateTime.toLocalDateTime(),
            syncedAt = dto.syncedAt.toLocalDateTime()
        )
    }

    fun toTakenMedicationDTO(takenMedication: TakenMedication): TakenMedicationApiDTO {
        return TakenMedicationApiDTO()
            .id(takenMedication.id)
            .reminderId(takenMedication.reminder.id)
            .dateTime(takenMedication.dateTime.atOffset(OffsetDateTime.now().offset))
            .syncedAt(takenMedication.syncedAt.atOffset(OffsetDateTime.now().offset))
    }
}
