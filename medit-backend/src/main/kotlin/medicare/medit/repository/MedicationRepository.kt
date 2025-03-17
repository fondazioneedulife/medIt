package medicare.medit.repository

import medicare.medit.model.Medication
import org.springframework.data.jpa.repository.JpaRepository

interface MedicationRepository : JpaRepository<Medication, Long>
