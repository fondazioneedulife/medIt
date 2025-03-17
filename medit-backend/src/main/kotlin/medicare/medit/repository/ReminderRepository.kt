package medicare.medit.repository

import medicare.medit.model.Reminder
import org.springframework.data.jpa.repository.JpaRepository

interface ReminderRepository : JpaRepository<Reminder, Long>
