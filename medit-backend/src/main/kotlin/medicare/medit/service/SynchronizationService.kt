package medicare.medit.service

import medicare.medit.dto.*
import medicare.medit.mapper.*
import medicare.medit.repository.*
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Service
class SynchronizationService(
    private val userRepository: UserRepository,
    private val authRepository: AuthRepository,
    private val medicationRepository: MedicationRepository,
    private val reminderRepository: ReminderRepository,
    private val takenMedicationRepository: TakenMedicationRepository,
    private val userMapper: UserMapper,
    private val authMapper: AuthMapper,
    private val medicationMapper: MedicationMapper,
    private val reminderMapper: ReminderMapper,
    private val takenMedicationMapper: TakenMedicationMapper
) {

    @Transactional
    fun syncData(SyncDataRequestApiDTO: SyncDataRequestApiDTO): SyncDataResponseApiDTO {
        val updatedUsers = mutableListOf<UserApiDTO>()
        val updatedMedications = mutableListOf<MedicationApiDTO>()
        val updatedReminders = mutableListOf<ReminderApiDTO>()
        val updatedTakenMedications = mutableListOf<TakenMedicationApiDTO>()

        SyncDataRequestApiDTO.users.forEach { userDTO ->
            val user = userRepository.findById(userDTO.id!!).orElseGet { userMapper.toUser(userDTO) }
            user.syncedAt = LocalDateTime.now()
            val savedUser = userRepository.save(user)
            updatedUsers.add(userMapper.toUserDTO(savedUser))
        }

        SyncDataRequestApiDTO.auths.forEach { authDTO ->
            val user = userRepository.findById(authDTO.id!!).orElseThrow { IllegalArgumentException("User not found") }
            val auth = authMapper.toAuth(authDTO, user)
            auth.syncedAt = LocalDateTime.now()
            authRepository.save(auth)
        }

        SyncDataRequestApiDTO.medications.forEach { medDTO ->
            val user =
                userRepository.findById(medDTO.userId!!).orElseThrow { IllegalArgumentException("User not found") }
            val medication = medicationMapper.toMedication(medDTO, user)
            medication.syncedAt = LocalDateTime.now()
            val savedMedication = medicationRepository.save(medication)
            updatedMedications.add(medicationMapper.toMedicationDTO(savedMedication))
        }

        SyncDataRequestApiDTO.reminders.forEach { remDTO ->
            val medication = medicationRepository.findById(remDTO.medicationId!!)
                .orElseThrow { IllegalArgumentException("Medication not found") }
            val reminder = reminderMapper.toReminder(remDTO, medication)
            reminder.syncedAt = LocalDateTime.now()
            val savedReminder = reminderRepository.save(reminder)
            updatedReminders.add(reminderMapper.toReminderDTO(savedReminder))
        }

        SyncDataRequestApiDTO.takenMedications.forEach { takenDTO ->
            val reminder = reminderRepository.findById(takenDTO.reminderId!!)
                .orElseThrow { IllegalArgumentException("Reminder not found") }
            val takenMedication = takenMedicationMapper.toTakenMedication(takenDTO, reminder)
            takenMedication.syncedAt = LocalDateTime.now()
            val savedTakenMedication = takenMedicationRepository.save(takenMedication)
            updatedTakenMedications.add(takenMedicationMapper.toTakenMedicationDTO(savedTakenMedication))
        }

        return SyncDataResponseApiDTO()
            .users(updatedUsers)
            .auths(SyncDataRequestApiDTO.auths)
            .medications(updatedMedications)
            .reminders(updatedReminders)
            .takenMedications(updatedTakenMedications)
    }
}
