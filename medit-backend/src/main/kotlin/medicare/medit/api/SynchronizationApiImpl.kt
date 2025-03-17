package medicare.medit.api

import medicare.medit.dto.SyncDataRequestApiDTO
import medicare.medit.dto.SyncDataResponseApiDTO
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController
class SynchronizationApiImpl : SynchronizationApi {
    override fun syncDataDownload(): ResponseEntity<SyncDataResponseApiDTO> {
        return super.syncDataDownload()
    }

    override fun syncDataUpload(syncDataRequestApiDTO: SyncDataRequestApiDTO?): ResponseEntity<Void> {
        return super.syncDataUpload(syncDataRequestApiDTO)
    }
}
