package br.com.webbicho.server.shared.classes

import br.com.webbicho.server.shared.entities.WbEntity
import br.com.webbicho.server.shared.enums.ECompareType
import kotlin.reflect.KProperty1

data class Filter<T : WbEntity>(
	val field: KProperty1<T, *>,
	val value: Any? = null,
	val compareType: ECompareType = ECompareType.EQUALS
)
