package br.com.webbicho.server.shared.classes

import org.hibernate.engine.spi.SharedSessionContractImplementor
import org.hibernate.generator.BeforeExecutionGenerator
import org.hibernate.generator.EventType
import java.util.*

class WbUUIDGenerator : BeforeExecutionGenerator {
	override fun getEventTypes(): EnumSet<EventType> {
		return EnumSet.of(EventType.INSERT)
	}
	
	override fun generate(
		session: SharedSessionContractImplementor?,
		owner: Any?,
		currentValue: Any?,
		eventType: EventType?
	): Any {
		val uuidField = owner?.javaClass?.getDeclaredField("uuid")
		uuidField?.isAccessible = true
		val existingId = uuidField?.get(owner) as? UUID
		return existingId ?: UUID.randomUUID()
	}
}
