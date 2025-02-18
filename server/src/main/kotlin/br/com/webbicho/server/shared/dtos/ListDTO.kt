package br.com.webbicho.server.shared.dtos

import br.com.webbicho.server.shared.classes.ListSearch
import br.com.webbicho.server.shared.entities.WbEntity

data class ListDTO<T : WbEntity>(
	val search: ListSearch<T>,
)
