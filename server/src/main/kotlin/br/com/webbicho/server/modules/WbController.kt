package br.com.webbicho.server.modules

import br.com.webbicho.server.shared.entities.WbEntity
import jakarta.persistence.MappedSuperclass

@MappedSuperclass
abstract class WbController<T : WbEntity, S : WbService<T>>(
	private val service: S
) {
	
	fun teste() {
	
	}
}
