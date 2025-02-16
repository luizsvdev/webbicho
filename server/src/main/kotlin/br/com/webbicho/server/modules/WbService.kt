package br.com.webbicho.server.modules

import br.com.webbicho.server.shared.classes.FilterGroup
import br.com.webbicho.server.shared.entities.WbEntity
import java.util.*

interface WbService<T : WbEntity> {
	fun findOne(
		entityUuid: UUID?,
		filters: List<FilterGroup<T>>? = null,
	): T
	
	fun findAll(
		filters: List<FilterGroup<T>>? = null,
	): Array<T>
	
	fun save(entity: T): T
	
	fun delete(uuid: String)
	
	fun update(uuid: String): T
	
	
}
