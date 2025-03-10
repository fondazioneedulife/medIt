package medicare.medit.mapper

import medicare.medit.dto.MedicationApiDTO
import medicare.medit.dto.MedicationTypeEnumApiDTO
import medicare.medit.model.Medication
import medicare.medit.model.MedicationTypeEnum
import medicare.medit.model.User
import org.springframework.stereotype.Component
import java.time.LocalDateTime
import java.time.OffsetDateTime

@Component
class MedicationMapper {
    fun toMedication(dto: MedicationApiDTO, user: User): Medication {
        return Medication(
            id = dto.id,
            user = user,
            name = dto.name,
            type = MedicationTypeEnum.valueOf(dto.type.name),
            dose = dto.dose.toString(),
            program = dto.program,
            quantity = dto.quantity.toInt(),
            note = dto.note ?: "",
            createdAt = LocalDateTime.now(),
            updatedAt = LocalDateTime.now(),
            syncedAt = dto.syncedAt.toLocalDateTime()
        )
    }

    fun toMedicationDTO(medication: Medication): MedicationApiDTO {
        return MedicationApiDTO()
            .id(medication.id)
            .name(medication.name)
            .type(MedicationTypeEnumApiDTO.valueOf(medication.type.name))
            .dose(medication.dose.toInt())
            .program(medication.program)
            .quantity(medication.quantity)
            .note(medication.note)
            .createdAt(medication.createdAt.atOffset(OffsetDateTime.now().offset))
            .updatedAt(medication.updatedAt.atOffset(OffsetDateTime.now().offset))
            .syncedAt(medication.syncedAt.atOffset(OffsetDateTime.now().offset))
    }
}
