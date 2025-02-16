package br.com.webbicho.server.shared.classes

import br.com.webbicho.server.shared.entities.WbEntity

data class SearchCriteria<T : WbEntity>(
	val filterGroups: List<FilterGroup<T>>,
	val sort: List<SortCriteria<T>>,
	val pagination: Pagination
)
