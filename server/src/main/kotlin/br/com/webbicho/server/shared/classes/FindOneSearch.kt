package br.com.webbicho.server.shared.classes

import br.com.webbicho.server.shared.entities.WbEntity

data class FindOneSearch<T : WbEntity>(
	val filterGroups: List<FilterGroup<T>>
)
