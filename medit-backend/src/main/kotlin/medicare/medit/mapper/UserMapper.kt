package medicare.medit.mapper

import medicare.medit.dto.RoleEnumApiDTO
import medicare.medit.dto.UserApiDTO
import medicare.medit.model.RoleEnum
import medicare.medit.model.User
import org.springframework.stereotype.Component
import java.time.LocalDateTime
import java.time.OffsetDateTime
import java.time.ZoneOffset

@Component
class UserMapper {
    fun toUser(dto: UserApiDTO): User {
        return User(
            id = dto.id,
            email = dto.email,
            firstName = dto.firstName,
            lastName = dto.lastName,
            role = RoleEnum.valueOf(dto.role.name),
            createdAt = LocalDateTime.now(),
            updatedAt = LocalDateTime.now(),
            timezone = dto.timezone,
            language = dto.language,
            syncedAt = dto.syncedAt?.toLocalDateTime() ?: LocalDateTime.now()
        )
    }

    fun toUserDTO(user: User): UserApiDTO {
        return UserApiDTO()
            .id(user.id)
            .email(user.email)
            .firstName(user.firstName)
            .lastName(user.lastName)
            .role(RoleEnumApiDTO.valueOf(user.role.name))
            .createdAt(OffsetDateTime.of(user.createdAt, ZoneOffset.of(user.timezone)))
            .updatedAt(OffsetDateTime.of(user.updatedAt, ZoneOffset.of(user.timezone)))
            .timezone(user.timezone)
            .language(user.language)
            .syncedAt(user.syncedAt.atOffset(ZoneOffset.of(user.timezone)))
    }
}
