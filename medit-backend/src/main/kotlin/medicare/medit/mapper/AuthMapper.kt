package medicare.medit.mapper

import medicare.medit.dto.AuthApiDTO
import medicare.medit.model.Auth
import medicare.medit.model.User
import org.springframework.stereotype.Component
import java.time.OffsetDateTime

@Component
class AuthMapper {
    fun toAuth(dto: AuthApiDTO, user: User): Auth {
        return Auth(
            userId = dto.id,
            user = user,
            password = dto.password,
            failedAttempts = dto.failedAttempts?.toInt() ?: 0,
            lastLogin = dto.lastLogin.toLocalDateTime(),
            syncedAt = dto.syncedAt.toLocalDateTime(),
        )
    }

    fun toAuthDTO(auth: Auth): AuthApiDTO {
        return AuthApiDTO()
            .id(auth.userId)
            .password(auth.password)
            .failedAttempts(auth.failedAttempts)
            .lastLogin(auth.lastLogin.atOffset(OffsetDateTime.now().offset))
            .syncedAt(auth.syncedAt.atOffset(OffsetDateTime.now().offset))
    }
}
