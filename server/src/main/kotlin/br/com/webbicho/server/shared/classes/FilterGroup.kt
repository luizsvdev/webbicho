package br.com.webbicho.server.shared.classes

import br.com.webbicho.server.shared.entities.WbEntity

data class FilterGroup<T : WbEntity>(
	val filters: List<Filter<T>>
)

