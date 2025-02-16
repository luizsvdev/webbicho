package br.com.webbicho.server.shared.dtos

import br.com.webbicho.server.shared.classes.SearchCriteria
import br.com.webbicho.server.shared.entities.WbEntity

data class ListDTO<T : WbEntity>(
	val search: SearchCriteria<T>,
)
