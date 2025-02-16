package br.com.webbicho.server.shared.classes

import br.com.webbicho.server.shared.entities.WbEntity
import br.com.webbicho.server.shared.enums.ESortOrder
import kotlin.reflect.KProperty1

data class SortCriteria<T : WbEntity>(
	val field: KProperty1<T, *>,
	val order: ESortOrder = ESortOrder.ASC
)
