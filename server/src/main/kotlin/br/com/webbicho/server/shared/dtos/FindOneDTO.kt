package br.com.webbicho.server.shared.dtos

import br.com.webbicho.server.shared.classes.SearchCriteria
import br.com.webbicho.server.shared.entities.WbEntity
import java.util.*

data class FindOneDTO<T : WbEntity>(
	val uuid: UUID?,
	val search: SearchCriteria<T>
)
