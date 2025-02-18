package br.com.webbicho.server.modules

import br.com.webbicho.server.shared.classes.FilterGroup
import br.com.webbicho.server.shared.entities.WbEntity
import java.util.*
import kotlin.reflect.KProperty1

interface WbService<T : WbEntity> {
	fun findOne(
		entityUuid: UUID?,
		filters: List<FilterGroup<T>>? = null,
		fields: List<KProperty1<T, Any>>? = null,
	): T
	
	fun findAll(
		filters: List<FilterGroup<T>>? = null,
		fields: List<KProperty1<T, Any>>? = null,
	): Array<T>
	
	fun save(entity: T): T
	
	fun delete(uuid: String)
	
	fun update(uuid: String): T
}
