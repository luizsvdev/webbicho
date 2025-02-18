package br.com.webbicho.server.shared.dtos

import br.com.webbicho.server.shared.classes.FindOneSearch
import br.com.webbicho.server.shared.entities.WbEntity
import java.util.*

data class FindOneDTO<T : WbEntity>(
	val uuid: UUID?,
	val search: FindOneSearch<T>
)
