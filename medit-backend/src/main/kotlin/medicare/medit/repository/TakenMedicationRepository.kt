package medicare.medit.repository

import medicare.medit.model.TakenMedication
import org.springframework.data.jpa.repository.JpaRepository

interface TakenMedicationRepository : JpaRepository<TakenMedication, Long>
